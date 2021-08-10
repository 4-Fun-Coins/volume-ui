import { Grid, makeStyles, Typography, Divider, Avatar, Badge} from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import { MicNone } from "@material-ui/icons";
import { useEffect, useState } from "react";
import {useWallet} from "use-wallet";
import { formatLongNumber, getOrdinalSuffix, getShorAddress } from "../utils/Utilities";
import { getActiveMilestone, getAllContributorsForMilestone, getNickname } from "../utils/volume-core";
import Skeleton from '@material-ui/lab/Skeleton';


const UNKNOWN = '????';
const emojis = ['🥇','🥈','🥉','💯','🔥','⭐️','🤩','👏','👍','🙌'];

const styles = makeStyles((theme) => ({
    cardGrid : {
        border: '1px solid gray',
        borderRadius: '10px',
        background: 'linear-gradient(to top, #CAD4E1, #ffffff) !important',
        //backgroundColor: 'rgba(125,125,125,0.5)',
        //height: '72px',
        marginTop: '6px',
        padding: '1.2em !important',
        fontFamily: 'monospace'
    },
    cardGridTitle : {
        textAlign: 'center',
        width: '100%',
        [theme.breakpoints.between('xs','sm')]: {
            fontSize: '1.1rem',
        }
    },
    cardGridroot: {
        //borderLeft : 'double #522d82',
        //borderStyle: "double",
        //borderColor: "#522d82",
        [theme.breakpoints.between('xs','sm')]: {
            //borderLeft: 'unset',
        }
    },
    myrankSubText: {
        fontSize: '1.4rem',
        color: 'eeeeee',
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
        marginTop: 6,
        padding: '0px !important',
    },
    leaderboradEntry: {
        color: 'white',
        fontFamily: 'monospace',
        fontSize: '1rem',
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
    }
}));


const LeaderboardHome = (props) => {
    const wallet = useWallet();
    const classes = styles();


    const [activeMilestone, setActiveMilestone] = useState();
    const [currentAccount, setCurrentAccount] = useState({address : '?x????????????????????????????????????????', nickname: UNKNOWN , rank: UNKNOWN , fuelAdded: UNKNOWN});
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
        <Grid container item direction={"column"} justify={"space-evenly"} alignItems="center" spacing={1}>
        <Grid container spacing={1}  item xs={12} justify={"flex-start"} alignItems="flex-start" direction={"column"} className={classes.cardGridroot}>
            <Grid item container className={classes.cardGrid} >
                <h1 className={classes.cardGridTitle}>
                🏆🏆🏆   Leaderboard  🏆🏆🏆
                </h1>
            </Grid>
            <Grid item container className={classes.cardGrid}>

                <Grid item container xs={6}>

                    <Grid item xs={12} class={classes.myrankSubText}>
                    🎖️ My Rank
                    </Grid>
                    <Grid item xs={12} className={classes.myRankValues}>
                        {currentAccount.rank !== UNKNOWN ? getOrdinalSuffix(currentAccount.rank) : currentAccount.rank}
                    </Grid>

                </Grid>

                <Grid item xs={6}>

                    <Grid item xs={12} class={classes.myrankSubText}>
                    ⛽ My Fuel Added 
                    </Grid>
                    <Grid item xs={12} className={classes.myRankValues}>
                    {formatLongNumber(Number(currentAccount.fuelAdded)/10**18, 2)} blocks
                    </Grid>

                </Grid>
                <Grid item xs={12}>
                    <Divider style={{height: '1px', backgroundColor: 'gray', margin: 10}}/>
                </Grid>

                <Grid item container xs={6}>

                    <Grid item xs={12} class={classes.myrankSubText}>
                        🗓️ Active Milestone
                    </Grid>
                    <Grid item xs={12} className={classes.myRankValues}>
                        {activeMilestone ? activeMilestone.name : UNKNOWN}
                    </Grid>

                </Grid>

                <Grid item xs={6}>

                    <Grid item xs={12} class={classes.myrankSubText}>
                    💰 Jackpot Amount 
                    </Grid>
                    <Grid item xs={12} className={classes.myRankValues}>
                        {activeMilestone ? formatLongNumber(activeMilestone.amountInPot/10**18, 2) : UNKNOWN} $Vol
                    </Grid>

                </Grid>
            </Grid>

            <Grid item container className={classes.cardGrid}>
                <Grid item container xs={2} sm={2} md={1}>
                    Rank
                </Grid>
                <Grid item container xs={5} sm={5} md={6}>
                    Player
                </Grid>
                <Grid item container xs={5}>
                    Fuel Added
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
    const classesArr = [classes.avatarGold,classes.avatarSilver,classes.avatarBronze,classes.avatarRest,]
    const rr = (rank-1)%9;
    const avatarClass = rank-1 < 3 ? classesArr[rank-1] : classesArr[3]

    const StyledBadge = withStyles((theme) => ({
        badge: {
          top: '50%',
          right: '-14px',
          backgroundColor: '#00ff00',
          color: 'black',
          padding: '6px',
          cursor: 'pointer'
        },
      }))(Badge);

    return (
        <>
            {rank === 1 &&  <Divider style={{height: '1px', backgroundColor: '#444444', margin: 5 , width: '99%'}} />}
            <Grid container item className={classes.leaderboradEntry} alignItems="center">
                
                <Grid container item xs={2} sm={2} md={1} justifyContent={'center'}>                   
                    <Avatar variant="rounded" className={avatarClass}>{rank}</Avatar>
                </Grid>
                <Grid container item xs={5} sm={5} md={6} style={{paddingLeft: '3px'}}>
                    
                    <Grid item xs={12}>
                    {isCurrentUser ? 
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
                    {loaded ? emojis[rr] + formatLongNumber(Number(fuelAdded)/10**18, 2) +  ' blocks' : <Skeleton variant="text" width={'100%'}/>}
                </Grid>

            </Grid>
            <Divider style={{height: '1px', backgroundColor: '#444444', margin: 5 , width: '99%'}}/>
        </>
    )
}


export default LeaderboardHome;