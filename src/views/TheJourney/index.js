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
import {useEffect, useState} from "react";
import {getAllMilestones, getCurrentBlock} from "../../utils/volume-core";
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
        backgroundColor: 'rgba(10, 10, 10, 0.6)',
        // [theme.breakpoints.down('md')]: { // Uncomment this when content length exceeds 100vh on mobile
        //     display: 'flex',
        //     height: '100%',
        // },
        // [theme.breakpoints.up('md')]: {
        //     height: '100vh'
        // },

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
    const [currentBlock, setCurrentBlock] = useState(undefined);

    const mobile = useMediaQuery(useTheme().breakpoints.down('sm'));

    useEffect(() => {
        if (!milestones) {
            getAllMilestones().then(milestones => {
                setMilestones(milestones.slice(1, milestones.length));
            });
        }
    }, [milestones]);

    useEffect(() => {
        if (!currentBlock) {
            // get current block
            getCurrentBlock().then((block) => {
                setCurrentBlock(block.number);
            });
        }
    }, [currentBlock]);

    useEffect(() => {
        if (milestones !== undefined && currentBlock !== undefined) {
            setMilestonesInit(true);
        }
    }, [milestones, currentBlock]);

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
                                                <TimelineDot variant={currentBlock < milestone.endBlock ? "default" : "outlined"} color={"secondary"}>
                                                    <PlanetIcon className={classes.icon} filled={currentBlock < milestone.endBlock}/>
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