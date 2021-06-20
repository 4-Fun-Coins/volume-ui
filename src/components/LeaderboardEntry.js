import {
    Divider,
    Grid, makeStyles, Typography,
} from "@material-ui/core";
import React, {useEffect, useState} from "react";

const leaderboardEntryStyles = makeStyles((theme) => ({
    lbeText: {
        color: "#46adef",
        fontSize: 28,
        marginLeft: '0.2em'
    },
    lbeThisUserText: {
        color: "#8fdbfc",
        fontSize: 30,
        fontWeight: "bold",
        marginLeft: '0.2em'
    }
}));

const Leaderboard = ({number, name, fuelAdded, thisUser}) => {
    const classes = leaderboardEntryStyles();

    return (
        <Grid
            container item spacing={1}
        >
            <Grid container item xs={6}>
                <Typography className={thisUser ? classes.lbeThisUserText : classes.lbeText}>
                    {`${number}. ${name}`}
                </Typography>
            </Grid>

            <Grid container item xs={6}>
                <Typography className={thisUser ? classes.lbeThisUserText : classes.lbeText}>
                    {fuelAdded}
                </Typography>
            </Grid>
        </Grid>
    )
}

export default Leaderboard;