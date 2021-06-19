import {
    Box,
    Button,
    Container,
    Divider,
    Grid,
    makeStyles,
    Typography,
} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import LoadingScreen from "./LoadingScreen";
import {
    getTotalFuelAdded,
    getFuelAddedForAddress
} from "../utils/volume-core";
import {useWallet} from "use-wallet";

const Big = require('big-js');


const statsStyles = makeStyles((theme) => ({
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
    mainHeading: {
        color: "#ef3e26"
    },
    subtitle: {
        color: theme.palette.flame.main
    },
    globalStats: {
        color: theme.palette.text.text,
    },
    userStats: {
        color: theme.palette.text.subText
    }
}));

const Stats = () => {
    const classes = statsStyles();
    const wallet = useWallet();

    // Global stats
    const [loadingGlobalStats, setLoadingGlobalStats] = useState(false);
    const [initGlobalStats, setInitGlobalStats] = useState(false);
    const [globalBlocks, setGlobalBlocks] = useState(0);
    const [globalSeconds, setGlobalSeconds] = useState(new Big(0));
    const [globalError, setGlobalError] = useState(false);

    // User stats
    const [userAddress, setUserAddress] = useState('');
    const [loadingUserStats, setLoadingUserStats] = useState(false);
    const [initUserStats, setInitUserStats] = useState(false);
    const [userBlocks, setUserBlocks] = useState(0);
    const [userSeconds, setUserSeconds] = useState(new Big(0));
    const [userRPCError, setUserRPCError] = useState(false);

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
                setGlobalError(true);
                setLoadingGlobalStats(false);
            });
        }
    }, [loadingGlobalStats]);

    useEffect(() => {
        if (wallet.status === 'connected') {
            setLoadingUserStats(true);
            setUserRPCError(false);

            // Fetch the user stats here
            getFuelAddedForAddress(wallet.account).then((res) => {
                setUserBlocks(res);
                setUserSeconds(new Big(res).times(5).toString());
                // Set loading stats to false & initStats to true
                setLoadingUserStats(false);
                setInitUserStats(true);
            }).catch((err) => {
                setUserRPCError(true);
                setLoadingUserStats(false);
                setInitUserStats(true);
            });
        }
    }, [wallet.status]);

    return (
        <Container
            maxWidth={false}
        >
            <Grid container>

                <Grid container item justify={"center"}>
                    <Typography variant={"h1"} className={classes.mainHeading}>
                        Statistics
                    </Typography>
                </Grid>
            </Grid>

            <Grid container item justify={"center"} sm={12} direction={"row"}>
                <Button onClick={() => {
                    if (wallet.status === 'disconnected') {
                        wallet.connect();
                    } else {
                        // TODO - view profile here
                    }
                }}
                        variant={"outlined"}
                        color={"secondary"}
                        className={classes.submitButton}
                >
                    <Typography variant={"h4"}>
                        {wallet.status !== 'connected' ? 'Connect Wallet' : wallet.account}
                    </Typography>
                </Button>
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
                    <Grid container item sm={12} justify={"center"}>
                        <Box className={classes.subtitle}>
                            <Typography variant={"h3"}>
                                Global Stats
                            </Typography>
                        </Box>
                    </Grid>

                    {
                        initGlobalStats && !loadingGlobalStats && !globalError &&
                        <>
                            <Grid container item sm={6} justify={"center"}>
                                <Typography variant={"h3"} className={classes.globalStats}>
                                    Total fuel added (blocks):
                                </Typography>
                            </Grid>

                            <Grid container item sm={6} justify={"center"}>
                                <Typography variant={"h3"} className={classes.globalStats} sm={6}>
                                    {globalBlocks} blocks
                                </Typography>
                            </Grid>

                            <Grid container item sm={6} justify={"center"}>
                                <Typography variant={"h3"} className={classes.globalStats}>
                                    Est time added (seconds):
                                </Typography>
                            </Grid>

                            <Grid container item sm={6} justify={"center"}>
                                <Typography variant={"h3"} className={classes.globalStats} sm={6}>
                                    {globalSeconds} seconds
                                </Typography>
                            </Grid>
                        </>
                    }

                    {initGlobalStats && !loadingGlobalStats && globalError &&
                        <Grid container item sm={12} justify={"center"}>
                            <Typography variant={"body1"} color={"primary"}>
                                Unknown Error - RPC node could possible be down. Try refreshing the page soon.
                            </Typography>
                        </Grid>
                    }

                    {
                        loadingUserStats && !initUserStats &&
                        <Grid item>
                            <LoadingScreen transparent/>
                        </Grid>


                    }
                    {initUserStats &&
                    <>
                        <Grid item sm={12}>
                            <Divider light={true}/>
                        </Grid>

                        <Grid container item sm={12} justify={"center"}>
                            <Box className={classes.subtitle}>
                                <Typography variant={"h3"}>
                                    Personal Stats
                                </Typography>
                            </Box>
                        </Grid>

                        {/*User stats*/}
                        {
                            !userRPCError &&
                                <>


                                    <Grid container item sm={6} justify={"center"}>
                                        <Typography variant={"h3"} className={classes.userStats}>
                                            Your fuel added (blocks):
                                        </Typography>
                                    </Grid>

                                    <Grid container item sm={6} justify={"center"}>
                                        <Typography variant={"h3"} className={classes.userStats} sm={6}>
                                            {userBlocks} blocks
                                        </Typography>
                                    </Grid>

                                    <Grid container item sm={6} justify={"center"}>
                                        <Typography variant={"h3"} className={classes.userStats}>
                                            Est time added (seconds):
                                        </Typography>
                                    </Grid>

                                    <Grid container item sm={6} justify={"center"}>
                                        <Typography variant={"h3"} className={classes.userStats} sm={6}>
                                            {userSeconds} seconds
                                        </Typography>
                                    </Grid>
                                </>
                        }
                        {
                            userRPCError &&
                            <Grid container item sm={12} justify={"center"}>
                                <Typography variant={"body1"} color={"primary"}>
                                    Unknown Error - RPC node could possibly be down. Try refreshing the page soon.
                                </Typography>
                            </Grid>
                        }
                    </>
                    }
                </Grid>
            </Grid>


        </Container>
    )
}

export default Stats;