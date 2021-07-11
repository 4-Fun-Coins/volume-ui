import {
    Divider,
    Grid, makeStyles, Typography,
} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {getFuelAddedForAddress, getTotalFuelAdded} from "../utils/volume-core";
import {useWallet} from "use-wallet";
import LoadingScreen from "./LoadingScreen";

const Big = require('big-js');

const statsStyles = makeStyles((theme) => ({
    statsWrapper: {
        borderStyle: "double",
        borderColor: "#522d82"
    },
    globalHeader: {
        color: "#2981e6",
        fontSize: 30
    },
    globalText: {
        color: "#46adef"
    }
}));

const Stats = () => {
    const classes = statsStyles();
    const wallet = useWallet();

    const [initGlobalStats, setInitGlobalStats] = useState(false);
    const [globalBlocks, setGlobalBlocks] = useState(new Big(0));
    const [globalSeconds, setGlobalSeconds] = useState(new Big(0));
    const [globalError, setGlobalError] = useState(false);

    const [initUserStats, setInitUserStats] = useState(false);
    const [userBlocks, setUserBlocks] = useState(new Big(0));
    const [userSeconds, setUserSeconds] = useState(new Big(0));
    const [userError, setUserError] = useState(false);

    useEffect(() => {
        if (!initGlobalStats) {
            // Fetch global stats
            getTotalFuelAdded().then((res) => {
                setGlobalBlocks(new Big(res));
                setGlobalSeconds(new Big(res).times(5).toFixed(0).toString());
                //
            }).catch((err) => {
                setGlobalError(true);
            }).finally(() => {
                setInitGlobalStats(true);
            });
        }
    }, [initGlobalStats]);

    useEffect(() => {
        if (wallet.status === 'connected') {
            // Fetch the user stats here
            getFuelAddedForAddress(wallet.account).then((res) => {
                setUserBlocks(new Big(res));
                setUserSeconds(new Big(res).times(5).toFixed(0).toString());
                // Set loading stats to false & initStats to true
            }).catch((err) => {
                setUserError(true);
            }).finally(() => {
                setInitUserStats(true);
            });
        }
    }, [wallet.status]);

    return (
        <Grid
            className={classes.statsWrapper}
            container item
            spacing={1}
            xs={12}
        >
            {
                !initGlobalStats &&
                <Grid container item justify={"center"}>
                    <LoadingScreen transparent/>
                </Grid>
            }
            {initGlobalStats &&
            <>
                <Grid container item xs={12} justify={"center"}>
                    {/*    Global stats    */}
                    <Typography className={classes.globalHeader}>
                        Global Stats
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Divider variant={"middle"} light={true}/>
                </Grid>

                <Grid container item xs={12} justify={"space-evenly"}>
                    <Grid item>
                        <Typography className={classes.globalText} style={{fontWeight: "bold"}}>
                            Total fuel added:
                        </Typography>
                    </Grid>

                    <Grid item>
                        <Typography className={classes.globalText}>
                            {globalError ? "Could not load stats" : `${globalBlocks.toFixed(2)} blocks`}
                        </Typography>
                    </Grid>
                </Grid>

                <Grid container item justify={"space-evenly"}>
                    <Grid item>
                        <Typography className={classes.globalText} style={{fontWeight: "bold"}}>
                            Total seconds added:
                        </Typography>
                    </Grid>

                    <Grid item>
                        <Typography className={classes.globalText}>
                            {globalError ? "Could not load stats" : `${globalSeconds} seconds`}
                        </Typography>
                    </Grid>
                </Grid>
            </>
            }

            {initUserStats &&
            <>
                <Grid container item xs={12} justify={"center"}>
                    {/*    User stats    */}
                    <Typography className={classes.globalHeader}>
                        Your Stats
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Divider variant={"middle"} light={true}/>
                </Grid>

                <Grid container item xs={12} justify={"space-evenly"}>
                    <Grid item>
                        <Typography className={classes.globalText} style={{fontWeight: "bold"}}>
                            Total fuel added:
                        </Typography>
                    </Grid>

                    <Grid item>
                        <Typography className={classes.globalText}>
                            {userError ? "Could not load stats" : `${userBlocks.toFixed(2)} blocks`}
                        </Typography>
                    </Grid>
                </Grid>

                <Grid container item justify={"space-evenly"}>
                    <Grid item>
                        <Typography className={classes.globalText} style={{fontWeight: "bold"}}>
                            Total seconds added:
                        </Typography>
                    </Grid>

                    <Grid item>
                        <Typography className={classes.globalText}>
                            {userError ? "Could not load stats" : `${userSeconds} seconds`}
                        </Typography>
                    </Grid>
                </Grid>
            </>
            }
        </Grid>
    )
}

export default Stats;