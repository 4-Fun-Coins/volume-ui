import {
    Container,
    Grid,
    makeStyles,
    Typography,
    useMediaQuery,
    useTheme
} from "@material-ui/core";
import {cardStyles} from "../Cards";
import TimelineItem from "@material-ui/lab/TimelineItem";
import TimelineSeparator from "@material-ui/lab/TimelineSeparator";
import TimelineDot from "@material-ui/lab/TimelineDot";
import TimelineConnector from "@material-ui/lab/TimelineConnector";
import TimelineContent from "@material-ui/lab/TimelineContent";
import Timeline from "@material-ui/lab/Timeline";
import TimelineOppositeContent from "@material-ui/lab/TimelineOppositeContent";
import Paper from "@material-ui/core/Paper";
import React from "react";

export const timelineStyles = makeStyles((theme) => ({
    root: {
        padding: '8px',
    },
    BigTitles: {
        color: theme.palette.twinkle.main,
        padding: '8px',
        width: '100%',
        textAlign: 'center',
        fontSize: '4em',
        marginBottom: '0.8em',
        [theme.breakpoints.between('xs', 'sm')]: {
            fontSize: '2.5rem',
        }
    },
    BigBody: {
        //color : theme.palette.text.paragraph,
        marginTop: '12px',
        textAlign: 'justify',
        lineHeight: '1.4em',
        fontSize: '1.5em',
        fontWeight: 350,
        color: '#d5d5d5',
        letterSpacing: '1px',
        [theme.breakpoints.between('xs', 'sm')]: {
            fontWeight: 350,
            fontSize: '1.25rem',
            letterSpacing: '1px',
        }
    },
    timelineItem: {
        '&::before': {
            flex: 0,
            content: "",
            [theme.breakpoints.between('xs', 'sm')]: {
                display: 'none',
            }
        }
    }
}));

const TimelineData = [
    {
        title: 'Launch',
        description: 'Launch of the Volume ecosystem, the volume website will be live and all contracts deployed, there will also be an ICO to raise funds for the projects , all funds rose will be used in their entirety to provide liquidity and none of it will go to the team ',
        time: 'September 15th',
        path: 'rocket',
        color: '#4558DC'
    },
    {
        title: 'NFT marketplace',
        description: 'The Volume NFT market place will be live, volume users can sell their NFTs on it for any BEP20 token they want, The market place will also have auction sales available to Volume users',
        time: 'September 30th',
        path: 'shoe-shop',
        color: '#FA5049'
    },
    {
        title: 'NFT INCO and AstroPunks',
        description: 'AstroPunks NFT collection will be available for public purchase, The Volume original INCO or Initial NFT collection offering platform will be launched and NFT teams can apply to use it ,to sell their NFT collection to the public in a fair decentralized way',
        time: 'October 15th',
        path: 'box',
        color: '#FFCCAC'
    },
    {
        title: 'Lottery',
        description: 'The Volume Space lottery will be live for all our users to enjoy, the lotery will use perks from the Volume NFT collections to grant users special discounts on tickets, it will also burn a portion of the ticket prices as fuel for the ecosystem',
        time: 'November 1st',
        path: 'lottery',
        color: '#FEE475'
    },
    {
        title: 'Community Games',
        description: 'Launch of Community games on the volume ecosystem, third party teams can plug and create their own games on top of the Volume ecosystem',
        time: 'Q1 2022',
        path: 'game-console',
        color: '#08D5CC'
    },
    {
        title: 'Sky is the limit',
        description: 'After all the Core products are live, The community can decide what is next for Volume and what feature should we bring to it, Think big because the sky is the limit',
        time: 'after Q1 2022',
        path: 'infinity',
        color: '#6ABFF6'
    },
];


const ProjectTimeline = ({reverse, ...rest}) => {
    const classes = timelineStyles();
    const cardClasses = cardStyles();

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.between('xs', 'sm'));

    return (
        <Container maxWidth={'lg'} className={classes.root} rest>
            <Grid container direction={"column"}>

                <Grid item>
                    <Typography variant={'h1'} className={classes.BigTitles}>
                        Volume project roadmap
                    </Typography>
                </Grid>

                <Grid item>
                    <Timeline align={!isMobile ? "alternate" : "left"} style={{padding: '0px'}}>
                        {TimelineData.map((element, index) => TimelineEntry({
                            isMobile,
                            classes,
                            cardClasses,
                            data: element,
                            key: index,
                            index
                        }))}
                    </Timeline>
                </Grid>
            </Grid>
            <div style={{margin: '6em'}}/>
        </Container>
    )
}

export default ProjectTimeline;

const TimelineEntry = ({isMobile, classes, cardClasses, data, index, ...rest}) => {

    return (
        <TimelineItem className={classes.timelineItem} {...rest}>
            {!isMobile && <TimelineOppositeContent style={{display: 'flex'}}>
                <Typography variant="h1" color="textSecondary" style={{margin: 'auto', color: data.color}}>
                    {data.title}
                </Typography>
            </TimelineOppositeContent>}
            <TimelineSeparator>
                <TimelineConnector/>
                <TimelineDot style={{padding: 10, backgroundColor: data.color}}>
                    {/* put icon here */!isMobile &&
                    <img src={`/icons/${data.path}.svg`} width={'40'} height={'40'} alt={'logo'}
                    />}
                </TimelineDot>
                <TimelineConnector/>
            </TimelineSeparator>
            <TimelineContent style={{paddingRight: isMobile ? '0px' : ''}}>
                <Paper elevation={3} className={cardClasses.cardGrid}
                       style={{padding: '16px', textAlign: "center", borderBottom: `8px solid ${data.color}`}}>
                    <Typography variant={"subtitle2"} style={{fontFamily: "monospace", color: data.color}}>
                        {data.time}
                    </Typography>
                    <Typography variant="h1" component="h1" style={{marginBottom: '8px'}}>
                        {data.title}
                    </Typography>
                    <Typography style={{textAlign: 'justify'}}>{data.description}</Typography>
                </Paper>
            </TimelineContent>
        </TimelineItem>
    );
}