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
import {useState} from "react";

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
        [theme.breakpoints.down('md')]: {
            display: 'flex',
            height: '100%',
        },
        [theme.breakpoints.up('md')]: {
            height: '100vh'
        }
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

    const [mars, setMars] = useState(false);
    const [jupiter, setJupiter] = useState(false);
    const [saturn, setSaturn] = useState(false);
    const [uranus, setUranus] = useState(false);
    const [neptune, setNeptune] = useState(false);
    const [pluto, setPluto] = useState(false);

    const mobile = useMediaQuery(useTheme().breakpoints.down('sm'));

    return (
        <Page
            className={classes.root}
            title={'Home'}
        >
            <Container className={classes.contentBackground} maxWidth={"xl"}>
                <Grid container item xs={12} style={{display: "flex", width: '100%', height: '100%'}}>
                    <Timeline align={mobile ? "right" : "alternate"}>
                        {/*     Mars    */}
                        <TimelineItem>

                            <TimelineOppositeContent>
                                <TimelineEntry heading={"Mars"}
                                               text={"No diamonds here"}/>
                            </TimelineOppositeContent>

                            <TimelineSeparator>
                                <TimelineDot variant={mars ? "default" : "outlined"} color={"secondary"}>
                                    <PlanetIcon className={classes.icon} filled={mars}/>
                                </TimelineDot>
                                <TimelineConnector className={classes.connector}/>
                            </TimelineSeparator>

                            <Hidden smDown>
                                <TimelineContent>
                                    {/*    Mars NFT & content here  */}
                                </TimelineContent>
                            </Hidden>

                        </TimelineItem>

                        {/*     Jupiter    */}
                        <TimelineItem>

                            <TimelineOppositeContent>
                                <TimelineEntry heading={"Jupiter"}
                                               text={"Some text about Jupiter to fill the gaping void in my soul..."}/>
                            </TimelineOppositeContent>

                            <TimelineSeparator>
                                <TimelineDot variant={jupiter ? "default" : "outlined"} color={"secondary"}>
                                    <PlanetIcon className={classes.icon} filled={jupiter}/>
                                </TimelineDot>
                                <TimelineConnector className={classes.connector}/>
                            </TimelineSeparator>

                            <Hidden smDown>
                                <TimelineContent>
                                    {/*    Jupiter NFT & content here  */}
                                </TimelineContent>
                            </Hidden>

                        </TimelineItem>

                        {/*     Saturn    */}
                        <TimelineItem>

                            <TimelineOppositeContent>
                                <TimelineEntry heading={"Saturn"}
                                               text={"I know you can see me little one."}/>
                            </TimelineOppositeContent>

                            <TimelineSeparator>
                                <TimelineDot variant={saturn ? "default" : "outlined"} color={"secondary"}>
                                    <PlanetIcon className={classes.icon} filled={saturn}/>
                                </TimelineDot>
                                <TimelineConnector className={classes.connector}/>
                            </TimelineSeparator>

                            <Hidden smDown>
                                <TimelineContent>
                                    {/*    Saturn NFT & content here  */}
                                </TimelineContent>
                            </Hidden>

                        </TimelineItem>

                        {/*     Uranus    */}
                        <TimelineItem>

                            <TimelineOppositeContent>
                                <TimelineEntry heading={"Uranus"}
                                               text={"There is an anus pun here somewhere..."}/>
                            </TimelineOppositeContent>

                            <TimelineSeparator>
                                <TimelineDot variant={uranus ? "default" : "outlined"} color={"secondary"}>
                                    <PlanetIcon className={classes.icon} filled={uranus}/>
                                </TimelineDot>
                                <TimelineConnector className={classes.connector}/>
                            </TimelineSeparator>

                            <Hidden smDown>
                                <TimelineContent>
                                    {/*    Uranus NFT & content here  */}
                                </TimelineContent>
                            </Hidden>

                        </TimelineItem>

                        {/*     Neptune    */}
                        <TimelineItem>

                            <TimelineOppositeContent>
                                <TimelineEntry heading={"Neptune"}
                                               text={"I'm the smallest gas giant, but I can bring the biggest house down!"}/>
                            </TimelineOppositeContent>

                            <TimelineSeparator>
                                <TimelineDot variant={neptune ? "default" : "outlined"} color={"secondary"}>
                                    <PlanetIcon className={classes.icon} filled={neptune}/>
                                </TimelineDot>
                                <TimelineConnector className={classes.connector}/>
                            </TimelineSeparator>

                            <Hidden smDown>
                                <TimelineContent>
                                    {/*    Neptune NFT & content here  */}
                                </TimelineContent>
                            </Hidden>

                        </TimelineItem>

                        {/*     Pluto    */}
                        <TimelineItem>

                            <TimelineOppositeContent>
                                <TimelineEntry heading={"Pluto"}
                                               text={"They say size doesn't matter and I'm here to prove it baby"}/>
                            </TimelineOppositeContent>

                            <TimelineSeparator>
                                <TimelineDot variant={pluto ? "default" : "outlined"} color={"secondary"}>
                                    <PlanetIcon className={classes.icon} filled={pluto}/>
                                </TimelineDot>
                            </TimelineSeparator>

                            <Hidden smDown>
                                <TimelineContent>
                                    {/*    Pluto NFT & content here  */}
                                </TimelineContent>
                            </Hidden>

                        </TimelineItem>

                    </Timeline>
                </Grid>
            </Container>
        </Page>
    )
}

export default Journey;