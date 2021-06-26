import Page from "../../components/Page";
import {Button, Card, Container, Grid, Hidden, makeStyles, TextField} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {useWallet} from "use-wallet";
import {useEffect, useState} from "react";
import {
    estimateGasForRefuel,
    getBalanceForAddress, getDataForRefuel,
} from "../../utils/volume-core";
const {volumeAddress} = require('../../utils/config.js');
const Big = require('big-js');

const landingStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
    },
    contentBackground: {
        backgroundColor: 'rgba(10, 10, 10, 0.6)',
        paddingBottom: 10,
        paddingTop: 80,
        height: '100vh'
    },
    cardWrapper: {
        paddingTop: '10em',
        width: '100%',
    },
    card: {
        width: '60%',
        height: '50vh',
        backgroundColor: "#1d0134",
        borderRadius: 12,
    },
    text: {
        padding: '1em',
        textAlign: "center",
        color: theme.palette.twinkle.main,
        fontSize: 20,
    },
    balanceText: {
        fontSize: 16,
        color: theme.palette.twinkle.main
    },
    rocketBackground: {
        backgroundImage: 'url(/planet_blue.svg)',
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundSize: "auto",
    },
    rocket: {
        height: '600',
        width: '600'
    }
}));

const Refuel = () => {
    const classes = landingStyles();

    const wallet = useWallet();

    const [balance, setBalance] = useState(new Big(0));
    const [amount, setAmount] = useState("");
    const [message, setMessage] = useState("");
    const [enabled, setEnabled] = useState(false);

    const fetchBalance = () => {
        if (wallet.status === 'connected') {
            // fetch balance
            getBalanceForAddress(wallet.account).then((res) => {
                if (res)
                    setBalance(new Big(res));
            });
        }
    }

    const refuel = async () => {
        // Calculate expected gas
        if (wallet.status === 'connected') {
            // Get balance for user
            const currentBalance = new Big(await getBalanceForAddress(wallet.account));

            if (currentBalance.gte(amount)) { // if amount is < balance
                estimateGasForRefuel(wallet.account, amount).then((estGas) => {
                    const transactionParams = {
                        nonce: '0x00',
                        gas: estGas.toString(),
                        to: volumeAddress,
                        from: wallet.account,
                        data: getDataForRefuel(amount),
                        chainId: 42
                    }

                    wallet.ethereum.request({
                        method: 'eth_sendTransaction',
                        params: [transactionParams]
                    }).then((txHash) => {
                        console.log(txHash);
                    }).catch((err) => {
                        console.log(err);
                    });
                });
            } else {
                setBalance(currentBalance);
            }
        }
    }

    useEffect(() => {
        fetchBalance();
    }, [wallet.status]);

    useEffect(() => {
        if (amount.toString() === '' || amount === '.' || new Big(amount).eq(0)) {
            // empty
            setMessage("Enter an amount");
            setEnabled(false);
        } else if (new Big(amount).lte(balance)) {
            // insufficient
            setMessage("Refuel");
            setEnabled(true);
        } else {
            setMessage("Insufficient balance");
            setEnabled(false);
        }
    }, [amount, balance]);

    const handleChange = (event) => {
        const regex = /^[0-9]*\.?[0-9]*$/;

        if (regex.test(event.target.value)){
            setAmount(event.target.value);
        }
    }

    return (
        <Page
            className={classes.root}
            title={'Home'}
        >
            <Container className={classes.contentBackground} maxWidth={"xl"}>
                <Grid container item xs={12} className={classes.cardWrapper}>
                    <Grid container item justify={"center"}>
                        <Card className={classes.card}>
                            <Grid container style={{display: "flex", width: '100%', height: '100%'}}>
                                <Grid container item xs={12} md={6} justify={"center"} alignItems={"flex-start"} style={{backgroundColor: "transparent"}}>
                                    <Grid item xs={12}>
                                        <Typography className={classes.text}>
                                            Direct refueling burns the total amount submitted for fuel. Please do not send
                                            an amount that you do not want to burn as it can not be recovered.
                                        </Typography>
                                    </Grid>

                                    <Grid container item xs={10} justify={"space-between"}>
                                        <Typography className={classes.balanceText}>
                                            Amount
                                        </Typography>

                                        <Typography className={classes.balanceText}>
                                            Balance: {balance.toFixed(2)}
                                        </Typography>

                                        <TextField fullWidth variant={"outlined"} color={"secondary"} onChange={handleChange} value={amount}/>

                                        <Button fullWidth color={"secondary"} variant={"contained"} onClick={refuel} disabled={!enabled} style={{marginTop: '1em'}}>
                                            {message}
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

export default Refuel;