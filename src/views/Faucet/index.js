import Page from "../../components/Root/Page";
import {Button, Card, Container, Grid, Hidden, makeStyles} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import Typography from "@material-ui/core/Typography";
import Big from "big-js";
import {getBalanceForAddress, claimTestVol} from "../../utils/volume-core";
import {useWallet} from "use-wallet";
import {bscTestnetId} from "../../utils/config";

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
    const classes = faucetStyles();
    const wallet = useWallet();
    const [balance, setBalance] = useState(new Big(0));
    const [test, setTest] = useState(false);

    useEffect(() => {
        if (wallet.status === 'connected') {
            // fetch balance
            getBalanceForAddress(wallet.account).then((res) => {
                if (res)
                    setBalance(new Big(res));
            });
        }
    }, [wallet.status]);

    useEffect(() => {
        if(wallet.status === 'connected' && wallet.chainId === bscTestnetId)
            setTest(true);
        else
            setTest(false);
    }, [wallet.status, wallet.chainId]);

    const claim = async () => {
        const hash = await claimTestVol(wallet);
        console.log(hash);
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
                                            Balance: {balance.toFixed(2)}
                                        </Typography>

                                        <Button color={"secondary"} variant={"contained"} onClick={claim}
                                                disabled={!test}
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