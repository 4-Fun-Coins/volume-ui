import {
    Divider,
    Grid, makeStyles, Typography,
} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import LeaderboardEntry from "./LeaderboardEntry";
import {getSortedLeaderboard} from "../utils/volume-core";
import {useWallet} from "use-wallet";
import {utils} from "web3";
import LoadingScreen from "./LoadingScreen";

const leaderboardStyles = makeStyles((theme) => ({
    lbWrapper: {
        borderStyle: "double",
        borderColor: "#522d82"
    },
    lbHeader: {
        color: "#2981e6",
        fontSize: 32,
    },
    lbSubHeader: {
        color: "#2981e6",
        fontSize: 32,
        marginLeft: '0.2em'
    },
}));

const Leaderboard = () => {
    const classes = leaderboardStyles();
    const wallet = useWallet();

    const [lbInit, setLbInit] = useState(false);
    const [leaderboard, setLeaderboard] = useState([]);

    const [userLbPosition, setUserLbPosition] = useState(undefined);

    useEffect(() => {
        if (!lbInit) {
            // Load leaderboard here
            getSortedLeaderboard().then((sortedLeaderboard) => {
                const tempArr = [];
                if (sortedLeaderboard.length < 10) {
                    for (let i = 0; i < 10 - sortedLeaderboard.length; i++) {
                        tempArr.push({
                            nickname: "no_player",
                            fuelAdded: '0'
                        });
                    }
                    setLeaderboard(sortedLeaderboard.concat(tempArr));
                } else {
                    // Only take first 10 and look for connected user address
                    let foundUser = false;
                    for (let i = 0; i < 10; i++) {
                        tempArr.push(sortedLeaderboard[i]);
                        if (wallet.status === 'connected' && sortedLeaderboard[i].user === wallet.address) {
                            foundUser = true;
                        }
                    }

                    // if we still did not find the user address, it might be somewhere else in the array
                    if (!foundUser) {
                        // Make sure it is in the array
                        if (wallet.status === 'connected' && sortedLeaderboard.find(entry => {
                            return entry.user === wallet.address
                        })) {
                            for (let i = 10; i < sortedLeaderboard.length; i++) {
                                if (sortedLeaderboard[i].user === wallet.address) {
                                    setUserLbPosition({
                                        nickname: sortedLeaderboard[i].nickname,
                                        user: sortedLeaderboard[i].user,
                                        fuelAdded: sortedLeaderboard[i].fuelAdded,
                                        number: i + 1
                                    });
                                }
                            }
                        }
                    }
                }
                setLbInit(true);
            });
        }
    }, [lbInit]);

    useEffect(() => {
        if (wallet.status === 'connected')
            setLbInit(false);
    }, [wallet.status]);

    return (
        <Grid container item direction={"column"} justify={"space-evenly"} className={classes.lbWrapper} spacing={1}>
            {
                !lbInit &&
                <LoadingScreen transparent/>
            }
            {
                lbInit &&
                <>
                    <Grid container item justify={"center"} spacing={1}>
                        <Typography className={classes.lbHeader}>
                            Leaderboard
                        </Typography>
                        <Grid item xs={12}>
                            <Divider light={true} variant={"fullWidth"}/>
                        </Grid>
                    </Grid>

                    <Grid container item direction={"row"} spacing={1}>
                        <Grid container item xs={6}>
                            <Typography className={classes.lbSubHeader}>
                                Player Name
                            </Typography>
                        </Grid>

                        <Grid container item xs={6}>
                            <Typography className={classes.lbSubHeader}>
                                Fuel Added
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Divider light={true} variant={"fullWidth"}/>
                        </Grid>
                    </Grid>
                </>
            }

            {lbInit &&
            leaderboard.map((entry, i) => {
                return (
                    <LeaderboardEntry
                        key={i}
                        number={i + 1}
                        name={entry.nickname ? entry.nickname : entry.user}
                        fuelAdded={utils.fromWei(entry.fuelAdded)}
                        thisUser={wallet.status === 'connected' ? wallet.account === entry.user : false}
                    />
                )
            })
            }

            {userLbPosition &&
            <>
                <LeaderboardEntry
                    key={"emptyUser"}
                    number={".."}
                    name={"..."}
                    fuelAdded={"..."}
                />
                <LeaderboardEntry
                    key={"thisUser"}
                    number={userLbPosition.number}
                    name={userLbPosition.nickname !== "" ? userLbPosition.nickname : userLbPosition.user}
                    fuelAdded={userLbPosition.fuelAdded}
                />
            </>
            }
        </Grid>
    )
}

export default Leaderboard;