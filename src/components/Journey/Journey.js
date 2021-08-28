import Box from "@material-ui/core/Box";
import React, {useEffect, useState} from "react";
import {useHistory, useLocation} from "react-router-dom";
import {Button, Container, Divider, Typography, useMediaQuery, useTheme} from "@material-ui/core";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {ROUTES_NAMES} from "../../constants";
import useVolume from "../../hooks/useVolume";
import Timeline from "@material-ui/lab/Timeline";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineDot from "@material-ui/lab/TimelineDot";
import TimelineContent from "@material-ui/lab/TimelineContent";
import Paper from "@material-ui/core/Paper";
import TimelineItem from "@material-ui/lab/TimelineItem";
import {timelineStyles} from "../Home/ProjectTimeLine";
import {cardStyles, StatsCard} from "../Cards";
import JourneyLeaderboard from "./JourneyLeaderBoard";
import {MilestonesDescriptions} from "../../data/static/MilestonesDescriptions";
import Tooltip from "@material-ui/core/Tooltip";
import Grid from "@material-ui/core/Grid";
import {PlanetColors} from "../../data/static/Colors";
import LoadingScreen from "../LoadingScreen";
import {useSnackbar} from 'notistack';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
    }
}));

function a11yProps(index) {
    return {
        id: `journey-tab-${index}`,
        'aria-controls': `journey-tabpanel-${index}`,
    };
}

const valid = ['past', 'active', 'future', 'all'];

const JourneyHome = ({...rest}) => {
    const location = useLocation();
    const history = useHistory();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.between('xs', 'sm'));
    const volumeEcosystem = useVolume();

    const classes = useStyles();

    const [milestones, setMilestones] = useState([]);
    const [isBusy, setIsBusy] = useState(true);
    const [activeTab, setActiveTab] = React.useState(0);

    const getQuery = () => {
        const query = new URLSearchParams(location.search).get('tab');
        if (!query) {
            handleChange(null, 3);
            return 'all'
        }
        return !!valid.filter((el, index, arr) => {
            return el === query.toString()
        }) ? query : 'all';
    }

    useEffect(() => {
        setActiveTab(valid.indexOf(getQuery()));
    }, [location])

    useEffect(() => {
        if (volumeEcosystem.milestones) {
            setIsBusy(true);
            const allMilestones = volumeEcosystem.milestones;
            const filters = activeTab === 3 ? valid : [valid[activeTab]];
            const filteredMilestones = allMilestones.filter(milestone => {
                return filters.filter(key => milestone.status === key).length > 0;
            });
            setMilestones(filteredMilestones);
            setIsBusy(false);
        }
    }, [activeTab, volumeEcosystem.milestones]);

    useEffect(() => {
        // TODO add user stats for milestone
    }, [volumeEcosystem.userStats]);

    const handleChange = (event, newValue) => {
        history.push(ROUTES_NAMES.JOURNEY + `?tab=${valid[newValue]}`);
    };

    return (
        <Container className={classes.root} {...rest} maxWidth={"lg"}>
            <Box
                style={{
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    background: "linear-gradient(to top, #0A0A0AB2, #000000B2)",
                    borderRadius: 30,
                    paddingRight: isMobile ? 15 : 50,
                    paddingLeft: isMobile ? 15 : 50,
                    textAlign: 'center',
                    color: 'white',
                }}>
                <Tabs
                    indicatorColor="secondary"
                    variant="scrollable"
                    value={activeTab}
                    onChange={handleChange}
                    aria-label="Journey tabs"
                    style={{display: 'flex', width: '100%'}}
                >
                    <Tab label="Past" {...a11yProps(0)} style={{flexGrow: 1}}/>
                    <Tab label="Active" {...a11yProps(1)} style={{flexGrow: 1}}/>
                    <Tab label="Future" {...a11yProps(2)} style={{flexGrow: 1}}/>
                    <Tab label="All" {...a11yProps(2)} style={{flexGrow: 1}}/>
                </Tabs>
            </Box>
            {volumeEcosystem.milestones && !isBusy ?
                <Timeline align={!isMobile ? "alternate" : "left"}
                          style={{padding: '0px', width: '100%', display: 'block', marginTop: '16px'}}>
                    {milestones.map((el, index) => <JourneyEntry milestone={el} isMobile={isMobile} key={index}/>)}
                </Timeline> :
                <LoadingScreen transparent/>
            }
        </Container>

    )
}

export const JourneyEntry = ({isMobile, milestone, ...rest}) => {
    const {enqueueSnackbar} = useSnackbar();

    const colors = {
        'active': 'greenYellow',
        'future': 'cyan',
        'past': 'orange',
    }
    const classes = timelineStyles();
    const cardClasses = cardStyles();

    const goToPage = () => {
        enqueueSnackbar('Not implemented yet ', {variant: "info"})
    }

    return (
        <TimelineItem className={classes.timelineItem} {...rest}>
            {!isMobile &&
            <TimelineOppositeContent
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: "center"
                }}>
                <Typography variant="h1" color="textSecondary"
                            style={{color: 'white', display: 'block', textTransform: 'capitalize'}}>
                    {MilestonesDescriptions[milestone.name.toLowerCase()].startPlanet} to {milestone.name}
                </Typography>

                <RocketJourney startTime={milestone.startTime} endTime={milestone.endTime} milestone={milestone}
                               isMobile={isMobile}/>
                <Typography variant="subtitle1" color="textSecondary"
                            style={{color: 'white', display: 'block', textTransform: 'capitalize'}}>
                    {milestone.status !== 'future' ? 'Started On' : 'Start Estimated On'}: {new Date(milestone.startTime * 1000).toLocaleString()}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary"
                            style={{color: 'white', display: 'block', textTransform: 'capitalize'}}>
                    Estimated End
                    On: {new Date(milestone.endTime * 1000) == 'Invalid Date' ? 'UNKNOWN' : new Date(milestone.endTime * 1000).toLocaleString()}
                </Typography>

            </TimelineOppositeContent>}

            <TimelineSeparator>
                <TimelineConnector/>
                <TimelineDot style={{padding: 5, backgroundColor: !isMobile ? 'transparent' : 'gray'}}>
                    {/* put icon here */!isMobile &&
                    <img src={`/planets/${milestone.name.toLowerCase()}.svg`} width={'40'} height={'40'} alt={'logo'}
                    />}
                </TimelineDot>
                <TimelineConnector/>
            </TimelineSeparator>

            <TimelineContent style={{paddingRight: isMobile ? '0px' : ''}}>
                <Paper elevation={3} className={cardClasses.cardGrid}
                       style={{
                           padding: '16px',
                           textAlign: "center",
                           borderBottom: `8px solid ${PlanetColors[milestone.name.toLowerCase()]}`,
                           width: '100%',
                           alignItems: 'center',
                           display: 'flex',
                           flexDirection: 'column'
                       }}>
                    <Typography
                        variant={"subtitle2"}
                        style={{
                            fontFamily: "monospace",
                            color: colors[milestone.status],
                            fontWeight: 600,
                            textTransform: 'capitalize'
                        }}
                    >
                        {milestone.status}
                    </Typography>
                    <Typography variant="h1" component="h1" style={{marginBottom: '8px'}}>
                        {milestone.name}
                    </Typography>

                    <RocketJourney startTime={milestone.startTime} endTime={milestone.endTime} milestone={milestone}
                                   isMobile={isMobile}/>


                    {milestone.status !== 'future' ?
                        <>
                            <JourneyLeaderboard
                                participants={milestone.participants}
                                maxScore={milestone.participants.length > 0 ? milestone.participants[0].fuelAdded : 100}/>
                            <Grid container style={{textAlign: "left"}}>
                                <Grid item xs={12} style={{textAlign: 'center'}}>
                                    <Typography variant="h1" component="h1"
                                                style={{marginBottom: '8px', width: '100%'}}>
                                        Milestone Stats
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}><Divider/></Grid>
                                <Grid item container xs={12}>
                                    <StatsCard statsTitles={['Total Fuel Added', '$Vol In Jackpot']}
                                               statsValues={['365B', '175M']}/>
                                </Grid>
                                <Grid item xs={12}><Divider/></Grid>
                            </Grid>
                            <Button
                                /* TODO: implement path */
                                onClick={goToPage}
                                variant={"contained"}
                                color={"secondary"}
                                style={{
                                    marginTop: '16px',
                                    color: 'white',
                                    borderRadius: '50px'
                                }}>
                                Go to Milestone Page
                            </Button>
                        </> :
                        <Typography variant="h1" component="h1" style={{marginBottom: '8px', width: '100%'}}>
                            Estimated to start on {new Date(milestone.startTime * 1000).toLocaleDateString()}
                        </Typography>}
                </Paper>
            </TimelineContent>

        </TimelineItem>
    )
}


export const RocketJourney = ({startTime, endTime, milestone, isMobile}) => {
    const classes = makeStyles(theme => ({
        container: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(1),
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            maxWidth: '320px'
        },
    }))();

    const [elapsedTime, setElapsedTime] = useState(0);
    const [totalTime, setTotalTime] = useState(0);

    const getValidEndTime = (endTimeArg) => {
        if (new Date(endTimeArg) == 'Invalid Date')
            return new Date(startTime * 1000).setMonth(new Date(startTime * 1000).getMonth() + 2) / 1000;
        else
            return endTimeArg;
    }

    useEffect(() => {
        setTotalTime(getValidEndTime(endTime) - startTime);
        setElapsedTime((Date.now() / 1000) - startTime);
    }, [startTime, endTime])

    return (
        <Box className={classes.container}>
            {(elapsedTime && totalTime) &&
            <>
                <Tooltip title={'Milestone started on ' + new Date(startTime * 1000).toLocaleDateString()} arrow>
                    <img src={`/planets/${MilestonesDescriptions[milestone.name.toLowerCase()].startPlanet}.svg`}
                         width={'48'} height={'48'} alt={'logo'} style={{zIndex: 3}}/>
                </Tooltip>
                <Box style={{flexGrow: 1}}>
                    <ArrowItem color={'greenyellow'}/>
                </Box>
                <Tooltip
                    title={`Destination:  ${milestone.name}. Estimated arrival on: ${new Date(getValidEndTime() * 1000).toLocaleDateString()}`}>
                    <img src={`/planets/${milestone.name.toLowerCase()}.svg`} width={'48'} height={'48'} alt={'logo'}
                         style={{zIndex: 3}}/>
                </Tooltip>
            </>}
        </Box>
    )
}


const ArrowItem = ({color, ...rest}) => {
    const classes = makeStyles((theme) => ({
        arrowAnim: {

            height: '10px',
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center',
        },

        arrow: {
            width: '10px',
            height: '10px',
            border: '5px solid',
            transform: 'rotate(135deg)',
        },

        arrowSliding: {
            position: 'absolute',
            zIndex: 0,
            '-webkit-animation': '$slide 2s linear infinite',
            animation: '$slide 2s linear infinite',
            opacity: 0,
        },

        delay1: {
            '-webkit-animation-delay': '0.5s',
            animationDelay: '0.5s',
        },
        delay2: {
            '-webkit-animation-delay': '1s',
            animationDelay: '1s',
        },
        delay3: {
            '-webkit-animation-delay': '1.5s',
            animationDelay: '1.5s',
        },

        '@keyframes slide': {
            '0%': {opacity: 0, transform: 'translateX(-1000%)'},
            '16.66%': {opacity: 1, transform: 'translateX(-666%)'},
            '33.33%': {opacity: 1, transform: 'translateX(-333%)'},
            '50%: ': {opacity: 1, transform: 'translateX(0%)'},
            '66.66%': {opacity: 1, transform: 'translateX(333%)'},
            '83.33%': {opacity: 1, transform: 'translateX(666%)'},
            '100%': {opacity: 0, transform: 'translateX(1000%)'},
        }

    }))();

    const Arrow = () => <div
        className={classes.arrow}
        style={{borderColor: `${color} transparent transparent ${color}`}}/>

    return (
        <div className={classes.arrowAnim} {...rest}>
            <div className={classes.arrowSliding}>
                <Arrow/>
            </div>
            <div className={`${classes.arrowSliding} ${classes.delay1}`}>
                <Arrow/>
            </div>
            <div className={`${classes.arrowSliding} ${classes.delay2}`}>
                <Arrow/>
            </div>
            <div className={`${classes.arrowSliding} ${classes.delay3}`}>
                <Arrow/>
            </div>
        </div>
    )
}
export default JourneyHome;