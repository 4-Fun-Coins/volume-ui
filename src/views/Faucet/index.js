import Page from "../../components/Root/Page";
import {Button, Card, Container, Grid, Hidden, makeStyles} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import Typography from "@material-ui/core/Typography";
import Big from "big-js";
import {getBalanceForAddress, claimTestVol, canClaimTestVol, waitForTransaction} from "../../utils/volume-core";
import {useWallet} from "use-wallet";
import {volumeFaucet} from "../../utils/config";
import Alert from "@material-ui/lab/Alert";
import {useSnackbar} from "notistack";
import {ViewOnExplorerButton} from "../Refuel";
import Box from "@material-ui/core/Box";
import LinearProgress from "@material-ui/core/LinearProgress";

const faucetStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
    },
    contentBackground: {
        height: '100vh'
    },
    cardWrapper: {
        paddingTop: '10em',
    },
    card: {
        backgroundColor: "#1d0134",
        borderRadius: 12,
        paddingBottom: 16,
    },
    title: {
        padding: '1.2em',
        paddingBottom: 0,
        color: theme.palette.twinkle.main,
        textAlign: "center"
    },
    text: {
        padding: '2.5em',
        textAlign: "center",
        color: theme.palette.text.paragraph,
        fontSize: 16,
    },
    balanceText: {
        fontSize: 16,
        color: theme.palette.twinkle.main,
        textAlign: "center",
    },
    rocketBackground: {
        backgroundImage: 'url(/planet_red.svg)',
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "auto",
    },
    rocket: {
        height: '600',
        width: '600'
    }
}));

const FaucetPage = () => {
    const {enqueueSnackbar} = useSnackbar();

    const classes = faucetStyles();
    const wallet = useWallet();
    const [balance, setBalance] = useState(new Big(0));
    const [test, setTest] = useState(false);
    const [canClaim, setCanClaim] = useState(false);
    const [busy, setBusy] = useState(false);

    useEffect(() => {
        if (wallet.status === 'connected') {
            // fetch balance
            getBalanceForAddress(wallet.account).then((res) => {
                if (res)
                    setBalance(new Big(res));
            });
            canClaimTestVol(wallet.account).then(res => setCanClaim(res));
        }
    }, [wallet.status, busy]);

    useEffect(() => {
        if (wallet.status === 'connected' && volumeFaucet)
            setTest(true);
        else
            setTest(false);
    }, [wallet.status]);

    /*
        TODO: Make a handler for transactions that can be observed by components (maybe even save transactions history to browser storage)
     */
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
            title={'Home'}
        >
            <Container
                maxWidth={false}
                className={classes.contentBackground}
            >
                <Grid container item xs={12} className={classes.cardWrapper}>
                    <Grid container item justifyContent={"center"}>
                        <Card className={classes.card}>
                            {busy && <Box sx={{width: '100%'}}>
                                <LinearProgress color={"secondary"}/>
                            </Box>}
                            <Grid container style={{display: "flex", width: '100%', height: '100%'}}>
                                <Grid container item xs={12} md={6} justifyContent={"center"} alignItems={"flex-start"}
                                      style={{backgroundColor: "transparent"}}>
                                    <Grid container item xs={12} justify={"center"}>
                                        <Typography variant={'h1'} className={classes.title}>
                                            Volume Faucet
                                        </Typography>
                                        <Typography className={classes.text}>
                                            Below you can claim 10,000 VOL every 24 hours for the sake of testing.
                                        </Typography>

                                        <Typography className={classes.balanceText}>
                                            Your Balance: {balance.toFixed(2)}
                                        </Typography>
                                        {!canClaim && wallet.status === 'connected' &&
                                        <Alert severity={"error"} style={{marginTop: 6}}>
                                            You can only Claim once a day.
                                        </Alert>}
                                        <Button color={"secondary"} variant={"contained"} onClick={claim}
                                                disabled={!test || !canClaim || busy}
                                                style={{margin: '1em', borderRadius: '20px', width: '80%'}}>
                                            {test ? 'Claim' : 'Connect to TestNet'}
                                        </Button>
                                    </Grid>
                                </Grid>

                                <Hidden smDown>
                                    <Grid container item xs={6} className={classes.rocketBackground}>
                                        <img src={'./rocket_tilted.svg'} alt={'rocket'} className={classes.rocket}/>
                                    </Grid>
                                </Hidden>
                            </Grid>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </Page>
    )
}

export default FaucetPage;