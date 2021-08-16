import { Grid, makeStyles, Divider, Avatar, Badge} from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import { useEffect, useState } from "react";
import {useWallet} from "use-wallet";
import { formatLongNumber, getOrdinalSuffix, getShorAddress } from "../utils/Utilities";
import { getActiveMilestone, getAllContributorsForMilestone, getNickname } from "../utils/volume-core";
import Skeleton from '@material-ui/lab/Skeleton';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery'

const UNKNOWN = '????';
const emojis = ['🥇','🥈','🥉','💯','🔥','⭐️','🤩','👏','👍','🙌'];

const styles = makeStyles((theme) => ({
    cardGrid : {
        border: '1px solid rgba(255, 255, 255, 0.12)',
        borderRadius: '10px',
        background: 'linear-gradient(to top, #0A0A0AB2, #000000B2) !important',
        marginTop: '5px',
        padding: '0.8em !important',
        fontFamily: 'monospace',
        color: '#A8A7A9',
    },
    cardGridTitle : {
        textAlign: 'center',
        width: '100%',
        color: '#e8c9ff',
        [theme.breakpoints.between('xs','sm')]: {
            fontSize: '1.1rem',
        }
    },
    cardGridroot: {

    },
    myrankSubText: {
        fontSize: '1.4rem',
        color: '#e8c9ff',
        [theme.breakpoints.between('xs','sm')]: {
            fontSize: '0.85rem',
        }
    },
    myRankValues : {
        fontSize: '2.2rem',
        [theme.breakpoints.between('xs','sm')]: {
            fontSize: '1.2rem',
            fontWeight: 'bold'
        }
    },
    leaderboardContainer: {
        marginTop: '7px',
        padding: '0px !important',
    },
    leaderboradEntry: {
        color: 'white',
        fontFamily: 'monospace',
        fontSize: '1rem',
        padding: '0.2em',
        [theme.breakpoints.between('xs','sm')]: {
            fontSize: '0.9rem',
        }
    },
    avatarGold: {
        backgroundColor: '#DAA520',
        color: 'white'
    },
    avatarSilver: {
        backgroundColor: '#00cec9',
        color: 'white'
    },
    avatarBronze: {
        backgroundColor: '#e17055',
        color: 'white'
    },
    avatarRest: {
        backgroundColor: '#69696966',
        color: 'white'
    },
    currentUserBg: {
        backgroundColor: 'green',
    }
}));

export const BigTitleCard = ({imoji , title, ...rest}) => {
    const classes = styles();
    return(
        <Grid item container className={classes.cardGrid} rest>
            <h1 className={classes.cardGridTitle}>
            {`${imoji}${imoji}${imoji}   ${title}   ${imoji}${imoji}${imoji}`}
            </h1>
        </Grid>
    )
}

export const StatsCard = ({statsTitles , statsValues }) => {
    const classes = styles();

    const StatItem = ({title , statValue}) => {
        return (
            <Grid item container xs={6}>

            <Grid item xs={12} class={classes.myrankSubText}>
                {title}
            </Grid>
            <Grid item xs={12} className={classes.myRankValues}>
                {statValue}
            </Grid>

        </Grid>
        )
    }

    const MyDivider = () => <Grid item xs={12}>
                                <Divider style={{height: '1px', backgroundColor: 'gray', margin: 10}}/>
                            </Grid>

    return (
        <Grid item container className={classes.cardGrid}>
            {statsTitles.map((title , index , array) => {
                const hasDivider = index !== 0 && (index+1)%2 === 0 && index !== array.length-1
                return(
                    <>
                        <StatItem title={statsTitles[index]} statValue={statsValues[index]} />
                        {hasDivider && <MyDivider />}
                    </>
                )
            })}
        </Grid>
    )
}


const LeaderboardHome = (props) => {
    const wallet = useWallet();
    const classes = styles();


    const [activeMilestone, setActiveMilestone] = useState();
    const [currentAccount, setCurrentAccount] = useState({
        address : '?x????????????????????????????????????????',
        nickname: UNKNOWN ,
        rank: UNKNOWN ,
        fuelAdded: 0
    });
    const [participants, setParticipants] = useState([]);
    const [loaded , setLoaded] = useState(false);

    useEffect(() => {
        getActiveMilestone().then(result => {
            setActiveMilestone(result);
        }).catch(error => {
            console.warn(error.message);
        });
    },[wallet]);

    useEffect(() => {

        if(activeMilestone)
            getAllContributorsForMilestone(activeMilestone.startBlock).then(result => {
                setParticipants(result);
            }).catch(error => {
                console.warn(error.message);
            }).finally(() => setLoaded(true));
    },[activeMilestone]);

    useEffect(() => {
        if(participants.length > 0) {
            let found = false;
            //if(wallet)
            for(let index = 0 ; index < participants.length ; index++){
                const participant = participants[index];
                if(participant.address === wallet.account){
                    found = true;
                    setCurrentAccount({
                        address : participant.address,
                        nickname: participant.nickname,
                        rank: participant.rank,
                        fuelAdded: participant.fuelAdded 
                    })
                    break;
                }
            }
            if(!found && wallet.account){
                setCurrentAccount({
                    ...currentAccount,
                    fuelAdded: 0,
                    nickname: getNickname(wallet.account),
                    rank: UNKNOWN
                })
            }
        }
    }, [participants])

    const winners = [{rank: 1} ,{rank: 2} ,{rank: 3} , {rank: 4} ,{rank: 5} ,{rank: 6} ,{rank: 7} ,{rank: 8} ,{rank: 9} ,{rank: 10} ,]

    return (
        <Grid container item direction={"column"} justifyContent={"space-evenly"} alignItems="center" spacing={0} style={{padding: '16px !important'}}>
        <Grid container spacing={1}  item xs={12} justifyContent={"flex-start"} alignItems="flex-start" direction={"column"} className={classes.cardGridroot}>

            <BigTitleCard imoji={'🏆'} title={'Leaderboard'}/>

            <StatsCard 
                statsTitles={['🎖️ My Rank','⛽ My Fuel Added','🗓️ Active Milestone','💰 Jackpot Amount']}
                statsValues={[
                    currentAccount.rank !== UNKNOWN ? getOrdinalSuffix(currentAccount.rank) : currentAccount.rank,
                    formatLongNumber(Number(currentAccount.fuelAdded)/10**18, 2) + ' blocks',
                    activeMilestone ? activeMilestone.name : UNKNOWN,
                    activeMilestone ? formatLongNumber(activeMilestone.amountInPot/10**18, 2) : UNKNOWN + ' $Vol'
                ]}
            />

            <Grid item container className={classes.cardGrid}>
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

            <Grid item container direction={"column"} justify={"center"} alignItems="center" className={classes.leaderboardContainer}>
                {participants.length > 0 ? 
                participants.slice(0,10).map(element =>{
                        return LeaderboardEntry({...element, classes , loaded , isCurrentUser: element.address === wallet.account});
                })
                :
                winners.map(element =>{
                    return LeaderboardEntry({rank: element.rank , classes , isCurrentUser: element.address === wallet.account});
                })}
            </Grid>
        </Grid>
        </Grid>
    )
}


const LeaderboardEntry = ({rank, address,nickname, classes , loaded , fuelAdded , isCurrentUser}) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.between('xs','sm'));

    const classesArr = [classes.avatarGold,classes.avatarSilver,classes.avatarBronze,classes.avatarRest,]
    const rr = (rank-1)%10;
    const avatarClass = rank-1 < 3 ? classesArr[rank-1] : classesArr[3]

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
        <>
            {rank === 1 &&  <Divider style={{height: '1px', backgroundColor: '#444444', margin: 0 , width: '99%'}} />}
            <Grid container item className={[classes.leaderboradEntry, isMobile && isCurrentUser && classes.currentUserBg]} alignItems="center">
                
                <Grid container item xs={2} sm={2} md={1} justifyContent={'center'}>                   
                    <Avatar variant="rounded" className={avatarClass}>{rank}</Avatar>
                </Grid>
                <Grid container item xs={5} sm={5} md={6} style={{paddingLeft: '3px'}}>
                    
                    <Grid item xs={12}>
                    {isCurrentUser && !isMobile  ? 
                    <StyledBadge badgeContent={'You'} >
                        {address ? getShorAddress(address) : <Skeleton variant="text" />}
                    </StyledBadge>
                    :
                    address ? getShorAddress(address) : <Skeleton variant="text" />
                    }
                    </Grid>
                    <Grid item xs={12}>
                        {nickname ? `@${nickname}` : !loaded ? <Skeleton variant="text" /> : `@No Nickname`}
                    </Grid>
                </Grid>

                <Grid container item xs={5}>
                    {loaded ? formatLongNumber(Number(fuelAdded)/10**18, 2) +  (isMobile ? '' : ' blocks') + ` ${emojis[rr]}`: <Skeleton variant="text" width={'100%'}/>}
                </Grid>

            </Grid>
            <Divider style={{height: '1px', backgroundColor: '#444444', margin: 0 , width: '99%'}}/>
        </>
    )
}


export default LeaderboardHome;