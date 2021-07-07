import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import {
    Button,
    CircularProgress,
    ClickAwayListener,
    Divider,
    Grid,
    Portal,
    TextField,
    Typography
} from "@material-ui/core";
import Blockies from 'react-blockies';
import {useWallet} from "use-wallet";
import {checkNickname, getNickname} from "../utils/volume-core";

const useStyles = makeStyles((theme) => ({
    profileImageWrapper: {
        margin: '1em'
    },
    profileWrapper: {
        margin: "0.2em"
    },
    nftHeading: {
        padding: "0.5em",
        color: theme.palette.flame.main
    },
    mainDivider: {
        height: "0.2em",
        backgroundColor: "#46adef"
    },
    subDivider: {
        height: "0.1em",
        backgroundColor: "#46adef"
    },
    nickname: {
        fontSize: 30,
        color: theme.palette.flame.main
    },
    subText: {
        fontSize: 12,
        marginTop: "0.1em"
    }
}));

function ProfileDialog({open, setOpen}) {
    const classes = useStyles();
    const wallet = useWallet();

    const [nicknameInit, setNicknameInit] = useState(false);
    const [nickname, setNickname] = useState("");
    const [currentNickname, setCurrentNickname] = useState("");

    const [busy, setBusy] = useState(false);
    const [available, setAvailable] = useState(false);
    const [didCheck, setDidCheck] = useState(false);

    const handleClick = async () => {
        if (!didCheck && nickname !== "" && !busy && !available) {
            // Check availability
            setBusy(true);

            // Do check
            setAvailable(await checkNickname(nickname));
            setDidCheck(true);

            setBusy(false);
        } else if (nickname !== "" && didCheck && !busy && available){
            setBusy(true);

            // Claim nickname
            setCurrentNickname(nickname);

            // Clear
            setDidCheck(false);
            setNickname("");
            setAvailable(false);
            setBusy(false);
        } else {
            // Open up change
            setCurrentNickname("");
        }
    }

    useEffect(() => {
        if (!nicknameInit) {
            getNickname(wallet.account).then((nick) => {
                setCurrentNickname(nick);
                setNicknameInit(true);
            });
        }
    }, [nicknameInit]);

    return (
        <Dialog open={open} fullWidth>
            <Grid container>
                <Grid container item xs={12} className={classes.profileWrapper} alignItems={"center"} justify={"space-between"}>
                    <Grid item xs={1} className={classes.profileImageWrapper}>
                        <Blockies
                            scale={6}
                            seed={wallet.status === 'connected' ? wallet.account : ""}
                        />
                    </Grid>

                    <Grid container item xs={6}>
                        {
                            currentNickname === ""
                                ?
                                <>
                                    <TextField
                                        color={"secondary"}
                                        variant={"standard"}
                                        label={"Username"}
                                        value={nickname}
                                        fullWidth
                                        onChange={(event) => {
                                            setNickname(event.target.value);
                                            setDidCheck(false);
                                            setAvailable(false);
                                        }}
                                    />
                                    {
                                        didCheck &&
                                        <Typography className={classes.subText} style={{color: available ? "green" : "red"}}>
                                            {available ? "Available" : "Unavailable"}
                                        </Typography>
                                    }

                                </>
                                :
                                <Typography className={classes.nickname}>
                                    {currentNickname}
                                </Typography>
                        }
                    </Grid>

                    <Grid container item xs={3}>
                        <Button color={"secondary"} fullWidth onClick={handleClick}>
                            {busy &&
                                <CircularProgress color={"secondary"} variant={"indeterminate"}/>
                            }

                            {!busy &&
                                <Typography style={{fontSize: 20}}>
                                    {
                                        currentNickname === "" ? didCheck && available ? "Claim" : "Check" : "Change"
                                    }
                                </Typography>
                            }
                        </Button>
                    </Grid>
                </Grid>

                <Grid item xs={12}>
                    <Divider light className={classes.mainDivider} variant={"fullWidth"}/>
                </Grid>

                <Grid container item xs={12}>
                    <Grid container item xs={12}>
                        <Typography className={classes.nftHeading}>
                            NFTs coming soon!
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Dialog>
    );
}

export default ProfileDialog;
