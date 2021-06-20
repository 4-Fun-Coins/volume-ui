import {
    Divider,
    Grid, makeStyles, Typography,
} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import LeaderboardEntry from "./LeaderboardEntry";

const leaderboardStyles = makeStyles((theme) => ({
    lbWrapper: {
        borderStyle: "double",
        borderColor: "#522d82"
    },
    lbHeader: {
        color: "#2981e6",
        fontSize: 32,
    },
    lbSubHeader: {
        color: "#2981e6",
        fontSize: 32,
        marginLeft: '0.2em'
    },
}));

const Leaderboard = () => {
    const classes = leaderboardStyles();

    const [lbInit, setLbInit] = useState(false);
    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
        if (!lbInit) {
            // Load leaderboard here

            const tempData = [];
            // Dummy data
            for (let i = 0; i < 10; i++) {
                tempData.push({
                    thisUser: false,
                    name: 'Test' + i,
                    fuel: i
                });
            }

            tempData[5].thisUser = true;

            setLeaderboard(tempData);
            setLbInit(true);
        }
    }, [lbInit]);

    return (
            <Grid container item direction={"column"} justify={"space-evenly"} className={classes.lbWrapper} spacing={1}>
                <Grid container item justify={"center"} spacing={1}>
                    <Typography className={classes.lbHeader}>
                        Leaderboard
                    </Typography>
                    <Grid item xs={12}>
                        <Divider light={true} variant={"fullWidth"}/>
                    </Grid>
                </Grid>

                <Grid container item direction={"row"} spacing={1}>
                    <Grid container item xs={6}>
                        <Typography className={classes.lbSubHeader}>
                            Player Name
                        </Typography>
                    </Grid>

                    <Grid container item xs={6} >
                        <Typography className={classes.lbSubHeader}>
                            Fuel Added
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider light={true} variant={"fullWidth"}/>
                    </Grid>
                </Grid>

                {lbInit &&
                    leaderboard.map((entry, i) => {
                        return (
                            <LeaderboardEntry key={i} number={i + 1} name={entry.name} fuelAdded={entry.fuel} thisUser={entry.thisUser}/>
                        )
                    })
                }
            </Grid>
    )
}

export default Leaderboard;