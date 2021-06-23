import {
    Grid, makeStyles, Typography,
} from "@material-ui/core";
import React from "react";

const leaderboardEntryStyles = makeStyles((theme) => ({
    lbeText: {
        color: "#46adef",
        fontSize: 28,
        marginLeft: '0.2em',
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis"
    },
    lbeThisUserText: {
        color: "#8fdbfc",
        fontSize: 30,
        fontWeight: "bold",
        marginLeft: '0.2em',
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis"
    },
}));

const Leaderboard = ({number, name, fuelAdded, thisUser = false}) => {
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