import Page from "../../components/Page";
import {Container, Grid, Hidden, makeStyles, useMediaQuery, useTheme} from "@material-ui/core";
import {
    Timeline,
    TimelineConnector, TimelineContent,
    TimelineDot,
    TimelineItem,
    TimelineOppositeContent,
    TimelineSeparator
} from "@material-ui/lab";
import TimelineEntry from "../../components/TimelineEntry";
import PlanetIcon from "../../components/CustomIcons/PlanetIcon";
import React, {useEffect, useState} from "react";
import {getActiveMilestone, getAllMilestones, getCurrentBlock} from "../../utils/volume-core";
import LoadingScreen from "../../components/LoadingScreen";

const journeyStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
    },
    contentBackground: {
        paddingBottom: 10,
        paddingTop: 80,
        height: '100vh' // Remove this when content length exceeds 100vh
    },
    paper: {
        padding: '6px 16px',
        backgroundColor: "#1d0134",
        borderRadius: 12,
    },
    connector: {
        backgroundColor: "#2981e6"
    },
    icon: {
        height: 50,
        width: 50
    }
}));

const Journey = () => {
    const classes = journeyStyles();

    const [milestonesInit, setMilestonesInit] = useState(false);

    const [milestones, setMilestones] = useState(undefined);
    const [activeMilestone, setActiveMilestone] = useState(undefined);

    const mobile = useMediaQuery(useTheme().breakpoints.down('sm'));

    useEffect(() => {
        if (!milestones) {
            getAllMilestones().then(milestones => {
                setMilestones(milestones.slice(1, milestones.length));
            });
        }
    }, [milestones]);

    useEffect(() => {
        if (!activeMilestone) {
            // get current block
            getActiveMilestone().then((milestone) => {
                setActiveMilestone(milestone);
            });
        }
    }, [activeMilestone]);

    useEffect(() => {
        if (milestones !== undefined && activeMilestone !== undefined) {
            setMilestonesInit(true);
        }
    }, [milestones, activeMilestone]);

    return (
        <Page
            className={classes.root}
            title={'Home'}
        >
            <Container className={classes.contentBackground} maxWidth={"xl"}>
                <Grid container item xs={12} style={{display: "flex", width: '100%', height: '100%'}}>
                    {
                        !milestonesInit &&
                        <Grid container item justify={"center"} xs={12}>
                            <LoadingScreen transparent/>
                        </Grid>
                    }
                    {
                        milestonesInit &&
                        <Timeline align={mobile ? "right" : "alternate"}>
                            {
                                milestones.map((milestone) => {

                                    return (
                                        <TimelineItem key={milestone.name}>

                                            <TimelineOppositeContent>
                                                <TimelineEntry milestone={milestone}/>
                                            </TimelineOppositeContent>

                                            <TimelineSeparator>
                                                <TimelineDot
                                                    variant={milestone.name === activeMilestone.name ? "default" : "outlined"}
                                                    color={"secondary"}>
                                                    <PlanetIcon className={classes.icon}
                                                                filled={milestone.name === activeMilestone.name}/>
                                                </TimelineDot>
                                                <TimelineConnector className={classes.connector}/>
                                            </TimelineSeparator>

                                            <Hidden smDown>
                                                <TimelineContent>
                                                    {/*    Mars NFT & content here  */}
                                                </TimelineContent>
                                            </Hidden>

                                        </TimelineItem>
                                    )
                                })
                            }
                        </Timeline>
                    }
                </Grid>
            </Container>
        </Page>
    )
}

export default Journey;