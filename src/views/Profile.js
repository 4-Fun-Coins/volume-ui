import Page from "../components/Page";
import {
    Button, ButtonBase, CircularProgress,
    Container,
    Divider,
    Grid, IconButton,
    makeStyles,
    TextField,
    Typography,
    useMediaQuery,
    useTheme
} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import Blockies from "react-blockies";
import {useWallet} from "use-wallet";
import {
    checkNickname,
    estimateGasForClaim,
    getAllMilestonesAndFuelForAddress,
    getDataForClaimNickname,
    getNickname
} from "../utils/volume-core";
import {Edit2, Search} from "react-feather";
import {CheckSharp, LocalGasStation} from "@material-ui/icons";
import {volumeAddress} from "../utils/config";
import {useSnackbar} from "notistack";

const Big = require('big-js');

const styles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
    },
    contentBackground: {
        paddingBottom: 10,
        paddingTop: 80,
        backgroundColor: 'rgba(10, 10, 10, 0.6)',
        // [theme.breakpoints.down('lg')]: { // Implement this when we have > 6 milestones
        //     display: 'flex',
        //     flexDirection: 'column',
        //     height: '100%'
        // },
        // [theme.breakpoints.up('lg')]: {
        //     height: '100vh'
        // }
        height: '100vh'
    },
    paper: {
        padding: '6px 16px',
        backgroundColor: "#1d0134",
        borderRadius: 12,
    },
    header: {
        paddingBottom: '0.5em',
        color: theme.palette.twinkle.main
    },
    subHeader: {
        paddingBottom: '0.5em',
        color: theme.palette.text.paragraph
    },
    mainDivider: {
        height: "0.2em",
        backgroundColor: "#46adef"
    },
    profileWrapper: {
        marginTop: '2em',
        borderRadius: 8,
        backgroundColor: 'rgba(71,68,83,0.9)'
    },
    nickname: {
        fontSize: 30,
        fontWeight: "bold",
        color: theme.palette.text.paragraph,
        textOverflow: 'hidden'
    },
    address: {
        fontSize: 18,
        color: theme.palette.text.paragraph,
        overflow: "hidden",
        textOverflow: "ellipsis"
    },
    connectButton: {
        margin: '1em',
        fontSize: 20,
        color: '#1d0134',
        backgroundColor: theme.palette.twinkle.main,
        '&:hover': {
            backgroundColor: theme.palette.twinkle.dark
        },
    },
    subText: {
        fontSize: 12,
        marginTop: "0.1em"
    },
    nicknameButton: {
        height: '1.5em',
        width: '1.5em',
        color: '#1d0134',
        backgroundColor: theme.palette.twinkle.main,
        '&:hover': {
            backgroundColor: theme.palette.twinkle.dark
        },
    },
    statsWrapper: {
        backgroundColor: "transparent",
        borderRadius: 10,
        borderColor: '#8d8d8d',
        borderWidth: '1px',
        borderStyle: "solid",
        marginBottom: '1em'
    },
    fuelIcon: {
        height: '2em',
        width: '2em',
        color: theme.palette.twinkle.main
    },
    statsHeading: {
        fontSize: 26,
        color: theme.palette.twinkle.main
    },
    statsText: {
        fontSize: 18,
        color: theme.palette.text.paragraph,
        margin: '0.5em',
        textAlign: "left",
        textTransform: "capitalize"
    },
    statsDivider: {
        height: '0.05em',
        backgroundColor: theme.palette.twinkle.main
    },
    comingText: {
        fontSize: 18,
        color: theme.palette.flame.main,
        margin: '0.5em',
        textAlign: "left"
    }
}));

const Profile = () => {
    const classes = styles();
    const wallet = useWallet();
    const snackbar = useSnackbar();

    const mobile = useMediaQuery(useTheme().breakpoints.down('lg'));

    const [profileInit, setProfileInit] = useState(false);
    const [currentNickname, setCurrentNickname] = useState(undefined);
    const [newNickname, setNewNickname] = useState("");
    const [editNickname, setEditNickname] = useState(false);

    const [didCheck, setDidCheck] = useState(false);
    const [available, setAvailable] = useState(false);
    const [busy, setBusy] = useState(false);

    // Stats
    const [milestonesInit, setMilestonesInit] = useState(false);
    const [milestones, setMilestones] = useState([]);
    const [totalFuelAdded, setTotalFuelAdded] = useState(new Big(0));

    useEffect(() => {
        if (wallet.status === 'connected' && !milestonesInit) {
            getAllMilestonesAndFuelForAddress(wallet.account).then((milestones) => {
                let total = new Big(0);
                for (let i = 0; i < milestones.length; i++) {
                    total = total.plus(milestones[i].fuelAdded);
                }
                setTotalFuelAdded(total.toFixed(4));
                setMilestones(milestones);
            });
            setMilestonesInit(true);
        }
    }, [milestonesInit, wallet.status]);

    useEffect(() => {
        if (wallet.status === 'connected' && !currentNickname) {
            getNickname(wallet.account).then((nick) => {
                setCurrentNickname(nick);
                if (currentNickname === "")
                    setEditNickname(true);
            });
        }
    }, [wallet.status, currentNickname]);

    useEffect(() => {
        if (currentNickname !== undefined && wallet.status === 'connected' && milestonesInit) {
            setProfileInit(true);
        }
    }, [currentNickname, wallet.status, milestonesInit]);

    const handleClick = async () => {
        // TODO - display nice box to show tx hash
        if (editNickname && !didCheck && newNickname !== "" && !busy && !available) {
            console.log("Checking availability");
            // Check availability
            setBusy(true);

            // Do check
            setAvailable(await checkNickname(newNickname));
            setDidCheck(true);

            setBusy(false);
        } else if (newNickname !== "" && editNickname && didCheck && !busy && available) {
            setBusy(true);

            estimateGasForClaim(wallet.account, newNickname).then((estGas) => {
                console.log(estGas);
                // Claim nickname
                const transactionParams = {
                    nonce: '0x00',
                    gas: estGas.toString(),
                    to: volumeAddress,
                    from: wallet.account,
                    data: getDataForClaimNickname(newNickname),
                    chainId: 42
                }

                console.log('here');

                wallet.ethereum.request({
                    method: 'eth_sendTransaction',
                    params: [transactionParams]
                }).then((txHash) => {
                    console.log(txHash);
                    snackbar.enqueueSnackbar(`Nickname set successfully. See transaction here`, {autoHideDuration: 3000});
                    setCurrentNickname(newNickname);

                    // Clear
                    setNewNickname("");
                }).catch((err) => {
                    if (err.code === 4001) {
                        // user rejected tx
                        setNewNickname("");
                    }
                }).finally(() => {
                    setEditNickname(false);
                    setBusy(false);
                    setDidCheck(false);
                    setAvailable(false);
                });
            });
        } else {
            // Open up change
            setEditNickname(true);
        }
    }

    return (
        <Page
            className={classes.root}
            title={'User Profile'}
        >
            <Container className={classes.contentBackground} maxWidth={"xl"}>
                <Grid container item justify={"center"} alignItems={"flex-start"} xs={12}>
                    <Grid container item xs={10}>
                        <Typography variant={"h1"} className={classes.header}>
                            Your Profile
                        </Typography>
                    </Grid>

                    <Grid item xs={10}>
                        <Typography variant={"h3"} className={classes.subHeader}>
                            See your stats and claimable NFTs here
                        </Typography>
                    </Grid>

                    <Grid item xs={10}>
                        <Divider light className={classes.mainDivider} variant={"fullWidth"}/>
                    </Grid>

                    <Grid container item xs={12} sm={10} lg={8} className={classes.profileWrapper}>
                        {

                            profileInit &&
                            <Grid container item xs={10} justify={"center"}>
                                <Grid container item xs={10} md={2} style={{padding: '1em'}}>
                                    <Blockies
                                        scale={10}
                                        seed={wallet.status === 'connected' ? wallet.account : ""}
                                    />
                                </Grid>

                                <Grid container item xs={10} md={8} lg={8} style={{padding: '1em'}} alignItems={"flex-start"}>
                                    <Grid container item xs={10} sm={8} md={6} alignItems={"center"}>
                                        {
                                            editNickname
                                                ?
                                                <>
                                                    <TextField
                                                        color={"secondary"}
                                                        variant={"standard"}
                                                        label={"Nickname"}
                                                        style={{paddingBottom: '0.5em'}}
                                                        value={newNickname}
                                                        fullWidth
                                                        onChange={(event) => {
                                                            setNewNickname(event.target.value);
                                                            setDidCheck(false);
                                                            setAvailable(false);
                                                        }}
                                                    />
                                                    {
                                                        didCheck &&
                                                        <Typography className={classes.subText}
                                                                    style={{color: available ? "green" : "red"}}>
                                                            {available ? "Available" : "Unavailable"}
                                                        </Typography>
                                                    }
                                                </>
                                                :
                                                <Typography className={classes.nickname}>
                                                    {currentNickname}
                                                </Typography>
                                        }
                                    </Grid>
                                    <Grid container item xs={2}>
                                        {
                                            !busy &&
                                            <IconButton className={classes.nicknameButton} style={{borderRadius: 10}}
                                                        onClick={handleClick}>
                                                {!editNickname ? <Edit2/> : didCheck ? available ? <CheckSharp/> : <Search/> : <Search/>}
                                            </IconButton>
                                        }

                                        {
                                            busy &&
                                            <ButtonBase>
                                                <CircularProgress color={"secondary"}/>
                                            </ButtonBase>
                                        }

                                    </Grid>

                                    <Grid container item>
                                        <Typography className={classes.address}>
                                            {wallet.account}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </Grid>
                        }
                        {
                            !profileInit &&
                            <Grid container item justify={"center"}>
                                <Button className={classes.connectButton} onClick={() => {
                                    if (wallet.status !== 'connected')
                                        wallet.connect();
                                }}>
                                    Connect
                                </Button>
                            </Grid>
                        }

                        <Grid container justify={"center"}>
                            <Grid container item xs={10} className={classes.statsWrapper}>
                                <Grid container item xs={12} alignItems={"center"} justify={"center"}>
                                    <LocalGasStation className={classes.fuelIcon}/>
                                    <Typography className={classes.statsHeading}>
                                        Fuel added
                                    </Typography>
                                </Grid>

                                {
                                    profileInit &&
                                        <>
                                            <StatEntry
                                                milestone={'Total'}
                                                amount={totalFuelAdded.toString()}
                                                mobile={mobile}
                                            />

                                            <Grid item xs={12}>
                                                <Divider className={classes.statsDivider} variant={"middle"}/>
                                            </Grid>

                                            {
                                                milestones.map((milestone) => {
                                                    return (
                                                        <StatEntry
                                                            key={milestone.name}
                                                            mobile={mobile}
                                                            milestone={milestone.name}
                                                            amount={new Big(milestone.fuelAdded).toFixed(4).toString()}
                                                        />
                                                    )
                                                })
                                            }
                                        </>
                                }
                            </Grid>
                        </Grid>

                        <Grid container justify={"center"}>
                            <Grid container item xs={10}>
                                <Grid container item xs={12}>
                                    <Typography variant={"h1"} className={classes.header}>
                                        Your NFTs
                                    </Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography variant={"h3"} className={classes.subHeader}>
                                        Below are the Volume NFTs that you earned during each milestone trip
                                    </Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Divider light className={classes.mainDivider} variant={"fullWidth"}/>
                                </Grid>

                                <Grid container item style={{margin: '1em'}}>
                                    <Typography className={classes.comingText}>
                                        Coming soon!
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </Page>
    )
}

const StatEntry = ({milestone, amount, mobile}) => {
    const classes = styles();


    return (
        <Grid container item xs={12} justify={"center"}>
            <Grid container item xs={6} md={3} justify={"flex-start"} style={{marginLeft: mobile ? '0' : '10em'}}>
                <Typography className={classes.statsText}>
                    {milestone}
                </Typography>
            </Grid>

            <Grid item xs={6} md={3}>
                <Typography className={classes.statsText}>
                    {amount} blocks
                </Typography>
            </Grid>
        </Grid>
    )
}

export default Profile;