import {Grid, makeStyles, Avatar, Badge} from "@material-ui/core";
import {withStyles} from '@material-ui/core/styles';
import {useEffect, useState} from "react";
import {useWallet} from "use-wallet";
import {formatLongNumber, getOrdinalSuffix, getShorAddress} from "../../utils/Utilities";
import {getActiveMilestone, getAllContributorsForMilestone, getNickname} from "../../utils/volume-core";
import Skeleton from '@material-ui/lab/Skeleton';
import {useTheme} from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery'
import {BigTitleCard, cardStyles, StatsCard} from "../Cards";
import {FillBar} from "../Journey/JourneyLeaderBoard";
import {LeaderBoardColors} from "../../data/static/Colors";
import React from "react";

const UNKNOWN = '????';
const emojis = ['🥇', '🥈', '🥉', '💯', '🔥', '⭐️', '🤩', '👏', '👍', '🙌'];

const styles = makeStyles((theme) => ({
    leaderboardContainer: {
        marginTop: '7px',
        padding: '6px !important',
        cursor: 'default'
    },
    leaderboradEntry: {
        color: 'white',
        fontFamily: 'monospace',
        fontSize: '1rem',
        padding: '0.2em',
        [theme.breakpoints.between('xs', 'sm')]: {
            fontSize: '0.9rem',
        }
    },
    currentUserBg: {
        backgroundColor: 'green',
    }
}));

const LeaderboardHome = (props) => {
    const wallet = useWallet();
    const classes = styles();
    const cardClasses = cardStyles();


    const [activeMilestone, setActiveMilestone] = useState();
    const [currentAccount, setCurrentAccount] = useState({
        address: '?x????????????????????????????????????????',
        nickname: UNKNOWN,
        rank: UNKNOWN,
        fuelAdded: 0
    });
    const [participants, setParticipants] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        getActiveMilestone().then(result => {
            setActiveMilestone(result);
        }).catch(error => {
            console.warn(error.message);
        });
    }, [wallet]);

    useEffect(() => {

        if (activeMilestone)
            getAllContributorsForMilestone(activeMilestone.startBlock).then(result => {
                console.log(result.length);
                if (result.length < 10)
                    // fill leader board with empty entries (esthetics)
                    for (let i = result.length; i < 10; i++) {
                        result.push({
                            participant: "No Name",
                            nickname: "No Player Yet",
                            address: "0x0000...0000",
                            fuelAdded: 0,
                            rank: i + 1,
                        })
                    }
                setParticipants(result);
            }).catch(error => {
                console.warn(error.message);
            }).finally(() => setLoaded(true));
    }, [activeMilestone]);

    useEffect(() => {
        if (participants.length > 0) {
            let found = false;
            //if(wallet)
            for (let index = 0; index < participants.length; index++) {
                const participant = participants[index];
                if (participant.address === wallet.account) {
                    found = true;
                    setCurrentAccount({
                        address: participant.address,
                        nickname: participant.nickname,
                        rank: participant.rank,
                        fuelAdded: participant.fuelAdded
                    })
                    break;
                }
            }
            if (!found && wallet.account) {
                setCurrentAccount({
                    ...currentAccount,
                    fuelAdded: 0,
                    nickname: getNickname(wallet.account),
                    rank: UNKNOWN
                })
            }
        }
    }, [participants])

    const winners = [{rank: 1}, {rank: 2}, {rank: 3}, {rank: 4}, {rank: 5}, {rank: 6}, {rank: 7}, {rank: 8}, {rank: 9}, {rank: 10},]

    return (
        <Grid container item direction={"column"} justifyContent={"space-evenly"} alignItems="center" spacing={0}
              style={{padding: '16px !important'}}>
            <Grid container spacing={1} item xs={12} justifyContent={"flex-start"} alignItems="flex-start"
                  direction={"column"}>

                <BigTitleCard imoji={'🏆'} title={'Leaderboard'} card/>

                <Grid item container className={cardClasses.cardGrid} style={{padding: '0.8em',}}>
                    <StatsCard
                        statsTitles={['🎖️ My Rank', '⛽ My Fuel Added', '🗓️ Active Milestone', '💰 Jackpot Amount']}
                        statsValues={[
                            currentAccount.rank !== UNKNOWN ? getOrdinalSuffix(currentAccount.rank) : currentAccount.rank,
                            formatLongNumber(Number(currentAccount.fuelAdded) / 10 ** 18, 2) + ' blocks',
                            activeMilestone ? activeMilestone.name : UNKNOWN,
                            activeMilestone ? formatLongNumber(activeMilestone.amountInPot / 10 ** 18, 2) : UNKNOWN + ' $Vol'
                        ]}
                    />
                </Grid>

                <Grid item container className={cardClasses.cardGrid} style={{padding: '0.8em'}}>
                    <Grid item container xs={2} sm={2} md={1}>
                        <b>Rank</b>
                    </Grid>
                    <Grid item container xs={5} sm={5} md={6}>
                        <b>Player</b>
                    </Grid>
                    <Grid item container xs={5}>
                        <b>Fuel Added</b>
                    </Grid>
                </Grid>

                <Grid item container direction={"column"} justifyContent={"center"} alignItems="center"
                      className={`${classes.leaderboardContainer} ${cardClasses.cardGrid}`}>
                    {participants.length > 0 ?
                        participants.map((element, index) => {
                            return LeaderboardEntry({
                                ...element,
                                classes,
                                loaded,
                                isCurrentUser: element.address === wallet.account,
                                maxScore: participants[0].fuelAdded,
                                key: index
                            });
                        })
                        :
                        winners.map((element, index) => {
                            return LeaderboardEntry({
                                rank: element.rank,
                                classes,
                                isCurrentUser: element.address === wallet.account,
                                key: index
                            });
                        })}
                </Grid>
            </Grid>
        </Grid>
    )
}


const LeaderboardEntry = ({rank, address, nickname, classes, loaded, fuelAdded, isCurrentUser, maxScore, key}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.between('xs', 'sm'));

    const rr = (rank - 1) % 10;
    const StyledBadge = withStyles((theme) => ({
        badge: {
            top: '90%',
            left: '100%',
            backgroundColor: '#00ff00',
            color: 'black',
            padding: '16px',
            cursor: 'pointer'
        },
    }))(Badge);

    return (
        <React.Fragment key={key}>
            <Grid container item
                  className={`${classes.leaderboradEntry} ${isMobile && isCurrentUser && classes.currentUserBg}`}
                  alignItems="center">

                <Grid container item xs={2} sm={2} md={1} justifyContent={'center'}>
                    <Avatar variant="rounded" style={{backgroundColor: LeaderBoardColors[rank - 1]}}>{rank}</Avatar>
                </Grid>
                <Grid container item xs={5} sm={5} md={6} style={{paddingLeft: '3px'}}>

                    <Grid item xs={12}>
                        {isCurrentUser && !isMobile ?
                            <StyledBadge badgeContent={'You'}>
                                {address ? getShorAddress(address) : <Skeleton variant="text"/>}
                            </StyledBadge>
                            :
                            address ? getShorAddress(address) : <Skeleton variant="text"/>
                        }
                    </Grid>
                    <Grid item xs={12}>
                        {nickname ? `@${nickname}` : !loaded ? <Skeleton variant="text"/> : `@No Nickname`}
                    </Grid>
                </Grid>

                <Grid container item xs={5}>
                    {loaded ? formatLongNumber(Number(fuelAdded) / 10 ** 18, 2) + (isMobile ? '' : ' blocks') + ` ${emojis[rr]}` :
                        <Skeleton variant="text" width={'100%'}/>}
                </Grid>
                <Grid item xs={12}>
                    {loaded &&
                    <FillBar rank={rank - 1} percentage={100 * Number(fuelAdded) / Number(maxScore)} compact/>}
                </Grid>
            </Grid>
        </React.Fragment>
    )
}


export default LeaderboardHome;