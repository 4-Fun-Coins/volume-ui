import {makeStyles} from "@material-ui/core";
import Box from "@material-ui/core/Box";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import {formatLongNumber} from "../../utils/Utilities";
import React, {useEffect, useState} from "react";
import {LeaderBoardColors} from "../../data/static/Colors";
import {getWinnersAndAmounts} from "../../utils/volume-core";
import Tooltip from "@material-ui/core/Tooltip";
import Fade from "@material-ui/core/Fade";

const styles = makeStyles((theme) => ({
    Leaderboard: {
        padding: '0px',
        marginTop: theme.spacing(2),
        width: '100%',
        textAlign: 'center',
        fontFamily: 'roboto',
        cursor: "default",
        [theme.breakpoints.between('xs', 'sm')]: {
            padding: '0px',
        }
    },
    leaderWrap: {
        display: 'flex',
    },
    leader: {
        padding: '6px',
        //marginBottom: '8px',
        animationName: '$revealLeaders',
        animationDuration: '.5s',
        animationFillMode: 'both',
        animationTimingFunction: 'ease-in-out',
        color: 'white'
    },
    leaderAva: {
        padding: '8px',
        marginRight: '16px',
        position: 'relative',
        '::after': {
            content: "",
            left: 0,
            bottom: 0,
            display: 'block',
            height: '6px',
            position: 'absolute',
            border: '0px transparent solid',
            borderLeftWidth: '20px',
            borderRightWidth: '20px',
            borderBottomWidth: '6px',
            borderBottomColor: '#fff',
            transition: 'border-bottom-color .2s ease-in-out',
        }
    },

    leaderScore: {
        display: 'flex',
        alignItems: 'center',
        opacity: 0.6,
        fontFamily: 'unset'
    },
    svg: {
        display: 'block',
        marginRight: ' 4px',
        width: '20px',
        height: '20px',
        padding: '2px',
        textAlign: 'center',
        color: 'white',
        fontSize: '0.9em'
    },
    leaderScoreTitle: {
        lineHeight: 1,
    },
    username: {
        marginBottom: '4px',
        letterSpacing: '1.5px'
    },
    leaderBar: {
        marginTop: '8px',
        animationName: '$barLoad',
        animationDuration: '3s',
        animationFillMode: 'both',
        animationTimingFunction: 'cubic-bezier(0.6, 0.2, 0.1, 1)',
        transformOrigin: 'left',
    },
    bar: {
        height: '4px',
        borderRadius: '2px',
    },

    '@keyframes revealLeaders': {
        from: {
            transform: 'translateX(-600px)',
            opacity: 0,
        },
        to: {
            transform: 'none',
            opacity: 1,
        }
    },

    '@keyframes barLoad': {
        from: {
            transform: 'scaleX(0)',
        },
        to: {
            transform: 'scaleX(1)',
        }
    }
}));

const JourneyLeaderboard = ({milestone, maxScore}) => {

    const classes = styles();
    const [winnings, setWinnings] = useState();
    useEffect(() => {
        // TODO change 1000
        setWinnings(getWinnersAndAmounts(milestone.participants, milestone.amountInPot, 1000))
    }, []);

    return (
        <Box className={classes.Leaderboard}>
            <Typography variant={'h2'} style={{marginBottom: 16}}>
                Top Contributors
            </Typography>
            <Box>
                {milestone.participants ? (
                    milestone.participants.slice(0, 3).map((participant, i) => (
                        <Box
                            key={i}
                            style={{
                                animationDelay: i * 0.2 + 's'
                            }}
                            className={classes.leader}
                        >
                            <Box className={classes.leaderWrap}>
                                {i < 3 ? (
                                    <Box
                                        style={{
                                            backgroundColor: LeaderBoardColors[i]
                                        }}
                                        className={classes.leaderAva}
                                    >
                                        <svg
                                            fill="#fff"
                                            xmlns="http://www.w3.org/2000/svg"
                                            height={24}
                                            width={24}
                                            viewBox="0 0 32 32"
                                        >
                                            <path
                                                d="M 16 3 C 14.354991 3 13 4.3549901 13 6 C 13 7.125993 13.63434 8.112309 14.5625 8.625 L 11.625 14.5 L 7.03125 11.21875 C 7.6313215 10.668557 8 9.8696776 8 9 C 8 7.3549904 6.6450096 6 5 6 C 3.3549904 6 2 7.3549904 2 9 C 2 10.346851 2.9241199 11.470238 4.15625 11.84375 L 6 22 L 6 26 L 6 27 L 7 27 L 25 27 L 26 27 L 26 26 L 26 22 L 27.84375 11.84375 C 29.07588 11.470238 30 10.346852 30 9 C 30 7.3549901 28.645009 6 27 6 C 25.354991 6 24 7.3549901 24 9 C 24 9.8696781 24.368679 10.668557 24.96875 11.21875 L 20.375 14.5 L 17.4375 8.625 C 18.36566 8.112309 19 7.125993 19 6 C 19 4.3549901 17.645009 3 16 3 z M 16 5 C 16.564129 5 17 5.4358709 17 6 C 17 6.5641291 16.564129 7 16 7 C 15.435871 7 15 6.5641291 15 6 C 15 5.4358709 15.435871 5 16 5 z M 5 8 C 5.5641294 8 6 8.4358706 6 9 C 6 9.5641286 5.5641291 10 5 10 C 4.4358709 10 4 9.5641286 4 9 C 4 8.4358706 4.4358706 8 5 8 z M 27 8 C 27.564129 8 28 8.4358709 28 9 C 28 9.5641283 27.564128 10 27 10 C 26.435872 10 26 9.5641283 26 9 C 26 8.4358709 26.435871 8 27 8 z M 16 10.25 L 19.09375 16.4375 L 20.59375 16.8125 L 25.59375 13.25 L 24.1875 21 L 7.8125 21 L 6.40625 13.25 L 11.40625 16.8125 L 12.90625 16.4375 L 16 10.25 z M 8 23 L 24 23 L 24 25 L 8 25 L 8 23 z"/>
                                        </svg>
                                    </Box>
                                ) : null}
                                <Box style={{textAlign: "left", flexGrow: 1}}>
                                    <Box className={classes.username}>{i + 1 + '. ' + participant.nickname}</Box>
                                    <Box className={classes.leaderScore}>
                                        <Avatar className={classes.svg}
                                                style={{backgroundColor: LeaderBoardColors[i]}}>B</Avatar>
                                        <Box
                                            className={classes.leaderScoreTitle}>{formatLongNumber(participant.fuelAdded / 10 ** 18) + ' Fuel Block'}</Box>
                                    </Box>
                                </Box>
                                <Box style={{textAlign: "left"}}>
                                    <Box className={classes.username}>P. Pot Share</Box>


                                    <Box className={classes.leaderScore}>
                                        <Tooltip
                                            title={"This is The Volume amount to be won if this Crew Member keeps this spot on the Leaderboard"}
                                            TransitionComponent={Fade} arrow
                                        >
                                            <Box
                                                className={classes.leaderScoreTitle}>{(winnings ? formatLongNumber(winnings[participant.address], 2) : ' ???') + ' $VOL'}</Box>
                                        </Tooltip>
                                    </Box>
                                </Box>
                            </Box>
                            <FillBar rank={i} percentage={(participant.fuelAdded / maxScore) * 100}/>
                        </Box>
                    ))
                ) : (
                    <Box>Loading</Box>
                )}
            </Box>
        </Box>
    )
}

export const FillBar = ({rank, percentage, compact}) => {
    const classes = styles();

    return (
        <Box style={{animationDelay: 0.4 + rank * 0.2 + 's', width: '100%', marginBottom: compact ? 4 : 10}}
             className={classes.leaderBar}>
            <Box
                style={{
                    backgroundColor: LeaderBoardColors[rank],
                    width: `${percentage}%`
                }}
                className={classes.bar}
            />
        </Box>
    )
}

export default JourneyLeaderboard;