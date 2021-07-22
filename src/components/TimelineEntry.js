import {CircularProgress, Divider, Grid, makeStyles, Paper} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {TimelineContent} from "@material-ui/lab";
import {useEffect, useState} from "react";
import {getAllContributorsForMilestone} from "../utils/volume-core";
import LoadingScreen from "./LoadingScreen";
const web3 = require('web3');
const Big = require('big.js');

const timelineStyles = makeStyles((theme) => ({
    paper: {
        padding: '6px 16px',
        backgroundColor: "#1d0134",
        borderRadius: 12,
    },
    heading: {
        color: theme.palette.twinkle.main,
        padding: '0.2em'
    },
    text: {
        color: theme.palette.text.paragraph,
        padding: '0.2em',
        textAlign: "center"
    }
}));

const TimelineEntry = ({milestone}) => {
    const classes = timelineStyles();
    let it = 0;

    const [topContributors, setTopContributors] = useState(undefined);

    useEffect(() => {
        // Get top contributors
        if (!topContributors) {
            getAllContributorsForMilestone(milestone.startBlock).then(participants => {
                if (participants.length > 3) {
                    setTopContributors(participants.slice(0,3));
                } else {
                    setTopContributors(participants);
                }
            });
        }
    }, [topContributors]);

    return (
        <TimelineContent>
            <Paper elevation={3} className={classes.paper}>
                <Grid container>
                    <Grid container item xs={12} justify={"center"}>
                        <Typography variant="h1" className={classes.heading}>
                            {milestone.name}
                        </Typography>
                    </Grid>

                    {/*Content*/}
                    <Grid container>
                        {
                            topContributors === undefined &&
                                <Grid container item justify={"center"} xs={12}>
                                    <LoadingScreen transparent/>
                                </Grid>

                        }
                        {
                            topContributors !== undefined &&
                            <Grid container item justify={"center"} xs={12}>
                                <Grid item xs={12}>
                                    <Typography variant={"h3"} className={classes.text}>
                                        Top contributors
                                    </Typography>
                                </Grid>

                                {
                                    topContributors.map(contributor => {
                                        it++;
                                        return (
                                            <Grid item xs={12} key={contributor.participant}>
                                                <Typography variant={"body1"} className={classes.text}>
                                                    {it}. {contributor.participant} - {new Big(contributor.fuelAdded).toFixed(4)} blocks
                                                </Typography>
                                            </Grid>
                                        )
                                    })
                                }
                            </Grid>
                        }


                        <Grid item xs={12}>
                            <Divider variant={"middle"} style={{margin: '1em'}}/>
                        </Grid>

                        <Grid container item xs={12}>
                            <Grid item xs={12}>
                                <Typography variant={"body1"} className={classes.text}>
                                    Total Fuel Added: {new Big(web3.utils.fromWei(milestone.totalFuelAdded)).toFixed(4)} blocks
                                </Typography>
                            </Grid>

                            <Grid item xs={12}>
                                <Typography variant={"body1"} className={classes.text}>
                                    Jackpot Value: {new Big(web3.utils.fromWei(milestone.amountInPot)).toFixed(4)} VOL
                                </Typography>
                            </Grid>
                        </Grid>

                    </Grid>
                </Grid>

            </Paper>
        </TimelineContent>
    )
}

export default TimelineEntry;