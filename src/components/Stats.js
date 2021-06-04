import {
    Box,
    Button,
    Container,
    Divider,
    Grid,
    makeStyles,
    TextField,
    Typography,
} from "@material-ui/core";
import {useEffect, useState} from "react";
import {Search} from "@material-ui/icons";
import LoadingScreen from "./LoadingScreen";
import {
    getTotalFuelAdded,
    getFuelAddedForAddress
} from "../utils/volume-core";
const Big = require('big-js');

const statsStyles = makeStyles((theme) => ({
    universeBackground: {
        backgroundColor: theme.palette.background.default,
        paddingBottom: 80,
        paddingTop: 80,
        height: '100vh',
        overflow: "hidden",
    },
    walletField: {
        width: '50%',
        marginTop: "2em",
    },
    submitButton: {
        marginTop: "2.2em",
        height: '100',
        marginLeft: "0.5em"
    },
    statsWrapper: {
        marginTop: "2em",
        borderWidth: "1px",
        borderColor: "gray",
        borderStyle: "solid",
        padding: "1em"
    },
    subtitle: {
        color: theme.palette.star.main
    }
}));

const Stats = () => {
    const classes = statsStyles();

    // Global stats
    const [loadingGlobalStats, setLoadingGlobalStats] = useState(false);
    const [initGlobalStats, setInitGlobalStats] = useState(false);
    const [globalBlocks, setGlobalBlocks] = useState(0);
    const [globalSeconds, setGlobalSeconds] = useState(new Big(0));

    // User stats
    const [userAddress, setUserAddress] = useState('');
    const [loadingUserStats, setLoadingUserStats] = useState(false);
    const [initUserStats, setInitUserStats] = useState(false);
    const [userBlocks, setUserBlocks] = useState(0);
    const [userSeconds, setUserSeconds] = useState(new Big(0));

    useEffect(() => {
        if (!initGlobalStats) {
            setLoadingGlobalStats(true);
            // Fetch global stats
            getTotalFuelAdded().then((res) => {
                setGlobalBlocks(res);
                setGlobalSeconds(new Big(res).times(5).toString());
                //
                setLoadingGlobalStats(false);
                setInitGlobalStats(true);
            }).catch((err) => {
                // TODO - handle error

                setLoadingGlobalStats(false);
            });
        }
    }, [loadingGlobalStats]);

    return (
        <Container
            className={classes.universeBackground}
            maxWidth={false}
        >
            <Grid container>

                <Grid container item justify={"center"}>
                    <Typography variant={"h1"} style={{color: "white"}}>
                        STATISTICS
                    </Typography>
                </Grid>
            </Grid>

            <Grid container item justify={"center"} sm={12} direction={"row"}>
                <TextField
                    className={classes.walletField}
                    label={"Wallet Address"}
                    variant={"outlined"}
                    color={"secondary"}
                    onChange={(event) => {
                        setUserAddress(event.target.value);
                    }}
                />

                <Button
                    variant={"outlined"}
                    color={"secondary"}
                    startIcon={<Search style={{marginLeft: '0.5em'}}/>}
                    className={classes.submitButton}
                    onClick={async () => {
                        setLoadingUserStats(true);

                        // Fetch the user stats here
                        getFuelAddedForAddress(userAddress).then((res) => {
                            setUserBlocks(res);
                            setUserSeconds(new Big(res).times(5).toString());
                            // Set loading stats to false & initStats to true
                            setLoadingUserStats(false);
                            setInitUserStats(true);
                        }).catch((err) => {
                            // TODO - Show error to user
                            // If false - user input invalid address
                            // If not - possible rpc node error
                            setLoadingUserStats(false);
                        });
                    }}
                />
            </Grid>

            <Grid container item justify={"center"}>
                <Grid container item className={classes.statsWrapper} sm={6} spacing={2} justify={"center"}>
                    {/*Global stats*/}
                    {
                        loadingGlobalStats && !initGlobalStats &&
                        <Grid item>
                            <LoadingScreen transparent/>
                        </Grid>
                    }
                    {initGlobalStats && !loadingGlobalStats &&
                    <>
                        <Grid container item sm={12} justify={"center"}>
                            <Box className={classes.subtitle}>
                                <Typography variant={"h3"}>
                                    Global Stats
                                </Typography>
                            </Box>
                        </Grid>

                        <Grid container item sm={6} justify={"center"}>
                            <Typography variant={"h3"} color={"secondary"}>
                                Total fuel added (blocks):
                            </Typography>
                        </Grid>

                        <Grid container item sm={6} justify={"center"}>
                            <Typography variant={"h3"} color={"primary"} sm={6}>
                                {globalBlocks} blocks
                            </Typography>
                        </Grid>

                        <Grid container item sm={6} justify={"center"}>
                            <Typography variant={"h3"} color={"secondary"}>
                                Est time added (seconds):
                            </Typography>
                        </Grid>

                        <Grid container item sm={6} justify={"center"}>
                            <Typography variant={"h3"} color={"primary"} sm={6}>
                                {globalSeconds} seconds
                            </Typography>
                        </Grid>
                    </>
                    }

                    {
                        loadingUserStats && !initUserStats &&
                        <Grid item>
                            <LoadingScreen transparent/>
                        </Grid>


                    }
                    {initUserStats && !loadingUserStats &&
                    <>
                        <Grid item sm={12}>
                            <Divider light={true}/>
                        </Grid>

                        {/*User stats*/}
                        <Grid container item sm={12} justify={"center"}>
                            <Box className={classes.subtitle}>
                                <Typography variant={"h3"}>
                                    Personal Stats
                                </Typography>
                            </Box>
                        </Grid>

                        <Grid container item sm={6} justify={"center"}>
                            <Typography variant={"h3"} color={"secondary"}>
                                Your fuel added (blocks):
                            </Typography>
                        </Grid>

                        <Grid container item sm={6} justify={"center"}>
                            <Typography variant={"h3"} color={"primary"} sm={6}>
                                {userBlocks} blocks
                            </Typography>
                        </Grid>

                        <Grid container item sm={6} justify={"center"}>
                            <Typography variant={"h3"} color={"secondary"}>
                                Est time added (seconds):
                            </Typography>
                        </Grid>

                        <Grid container item sm={6} justify={"center"}>
                            <Typography variant={"h3"} color={"primary"} sm={6}>
                                {userSeconds} seconds
                            </Typography>
                        </Grid>
                    </>
                    }


                </Grid>
            </Grid>


        </Container>
    )
}

export default Stats;