import Page from "../../components/Root/Page";
import {Button, Container, Grid, Card, makeStyles} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import Typography from "@material-ui/core/Typography";
import {claimTestVol, canClaimTestVol, waitForTransaction} from "../../utils/volume-core";
import {useWallet} from "use-wallet";
import {volumeFaucet} from "../../utils/config";
import Alert from "@material-ui/lab/Alert";
import {useSnackbar} from "notistack";
import {ViewOnExplorerButton} from "../Refuel";
import LinearProgress from "@material-ui/core/LinearProgress";
import {useTheme} from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {formatLongNumber} from "../../utils/Utilities";
import useVolume from "../../hooks/useVolume";

const faucetStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
    },
    contentBackground: {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    card: {
        borderRadius: 12,
        background: 'linear-gradient(to top, #0A0A0AB2, #1d0134aa) !important',
        borderBottom: `6px solid ${theme.palette.secondary.dark}`,
    },
    title: {
        padding: '1.2em',
        paddingBottom: 0,
        color: theme.palette.twinkle.main,
        textAlign: "center"
    },
    text: {
        padding: '1em',
        textAlign: "center",
        color: theme.palette.text.paragraph,
        fontSize: 16,
    },
    balanceText: {
        fontSize: 16,
        color: theme.palette.twinkle.main,
        textAlign: "center",
        width: '100%'
    },
    rocketBackground: {
        backgroundImage: 'url(/planet_red.svg)',
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "auto",
    }
}));

const FaucetPage = () => {
    const {enqueueSnackbar} = useSnackbar();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.between('xs', 'sm'));
    const volume = useVolume();
    const classes = faucetStyles();

    const wallet = useWallet();
    const [test, setTest] = useState(false);
    const [canClaim, setCanClaim] = useState(false);
    const [busy, setBusy] = useState(false);

    useEffect(() => {
        if (wallet.status === 'connected') {
            canClaimTestVol(wallet.account).then(res => {
                setCanClaim(res);
            });
        }
    }, [wallet.status, busy]);

    useEffect(() => {
        if (wallet.status === 'connected' && volumeFaucet)
            setTest(true);
        else
            setTest(false);
    }, [wallet.status]);

    const claim = async () => {
        setBusy(true);
        let failed = false;
        const hash = await claimTestVol(wallet).catch(error => {
            enqueueSnackbar(error.message, {variant: "error", autoHideDuration: 3000});
            failed = true;
        });
        if (!failed) {
            const receipt = await waitForTransaction(hash)
                .catch(error => console.log("Error" + error))
                .finally(() => setBusy(false));

            if (receipt.status) {
                // transaction mined and did not revert
                enqueueSnackbar(
                    "Success! Test $Vol should show in your wallet shortly!",
                    {
                        variant: "success",
                        autoHideDuration: 4000,
                        action: <ViewOnExplorerButton txHash={hash}/>,
                    }
                )
                volume.refreshUserStats();
            } else {
                // transaction mined and did revert
                enqueueSnackbar(
                    "Transaction Reverted 😢",
                    {
                        variant: "error",
                        autoHideDuration: 3000,
                        action: <ViewOnExplorerButton txHash={hash}/>
                    })
            }
        } else setBusy(false);
    }

    return (
        <Page
            className={classes.root}
            title={'Faucet'}
        >
            <Container
                maxWidth={"md"}
                className={classes.contentBackground}
            >
                <Grid container component={Card} className={`${classes.card}`}>

                    {busy && <Grid item xs={12} sx={{width: '100%'}}>
                        <LinearProgress color={"secondary"} style={{borderRadius: '12px 12px 0px 0px', height: 6}}/>
                    </Grid>}
                    <Grid container item xs={12} md={6} justifyContent={"center"} alignItems={"center"}
                          style={{backgroundColor: "transparent"}}>
                        <Grid container item xs={12} justify={"center"}>

                            <Typography variant={'h1'} className={classes.title}>
                                Volume Faucet
                            </Typography>

                            <Typography className={classes.text}>
                                Below you can claim 10,000 VOL every 24 hours for the sake of testing.
                            </Typography>

                            <Typography className={classes.balanceText}>
                                Your Balance: {formatLongNumber(Number(volume.userStats.volumeBalance))}
                            </Typography>
                            <Grid item xs={12}>
                                {!canClaim && wallet.status === 'connected' && !busy &&
                                <Alert severity={"error"} style={{margin: "16px"}}>
                                    You can only Claim once a day.
                                </Alert>}
                            </Grid>
                            <Button color={"secondary"} variant={"contained"} onClick={claim}
                                    disabled={!test || !canClaim || busy}
                                    style={{
                                        margin: '2em',
                                        borderRadius: '1.5em',
                                        width: '100%',
                                        fontSize: '1.5em',
                                        color: 'white'
                                    }}>
                                {test ? 'Claim' : 'Connect to TestNet'}
                            </Button>
                        </Grid>
                    </Grid>

                    {!isMobile && <Grid item xs={6}>
                        <img src={'./rocket_tilted.svg'} alt={'rocket'} className={classes.rocketBackground}
                             width={400} height={400}/>
                    </Grid>}
                </Grid>
            </Container>
        </Page>
    )
}

export default FaucetPage;