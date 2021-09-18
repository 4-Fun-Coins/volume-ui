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
        description: 'Launch of the Volume rocket! The volume website will be live and all contracts deployed. There will also be an ICO to raise funds for the project. All funds raised will be used in their entirety to provide liquidity, and none of it will go to the team.',
        time: 'September 15th',
        path: 'rocket',
        color: '#4558DC'
    },
    {
        title: 'NFT marketplace',
        description: 'The Volume NFT marketplace will be live. Volume NFT holders can sell their NFTs on the marketplace for any BEP20 token they want. The marketplace will also have auction sales available to Volume users who may wish to use that.',
        time: 'September 30th',
        path: 'shoe-shop',
        color: '#FA5049'
    },
    {
        title: 'INCO and AstroPunks',
        description: 'AstroPunks NFT collection will be available for public purchase. The Volume Initial NFT Collection Offering (INCO) platform will be launched. NFT artists can apply to launch their NFT collection to the public in a fair, decentralized way.',
        time: 'October 15th',
        path: 'box',
        color: '#FFCCAC'
    },
    {
        title: 'Lottery',
        description: 'The Volume space lottery will be live for all our users to enjoy. The lottery will use perks from the Volume NFT collections to grant users special discounts on tickets. It will also burn a portion of the ticket prices as fuel for the rocket.',
        time: 'November 1st',
        path: 'lottery',
        color: '#FEE475'
    },
    {
        title: 'Community Games',
        description: 'Launch of Community games on the volume ecosystem. Third-party teams can plugin and create their games on top of the Volume ecosystem using the deployed API contract.',
        time: 'Q1 2022',
        path: 'game-console',
        color: '#08D5CC'
    },
    {
        title: 'The Sky is the Limit',
        description: 'After all the core products are live, the community can decide what is next for Volume and what features we should add. Think big because the sky is the limit!',
        time: 'After Q1 2022',
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