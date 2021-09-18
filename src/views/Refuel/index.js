import Page from "../../components/Root/Page";
import {Button, Card, Container, Grid, Hidden, makeStyles, TextField} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {useWallet} from "use-wallet";
import React, {useEffect, useState} from "react";
import {
    estimateGasForRefuel,
    getBalanceForAddress, getDataForRefuel, waitForTransaction,
} from "../../utils/volume-core";
import {useSnackbar} from "notistack";
import LinearProgress from "@material-ui/core/LinearProgress";
import Box from "@material-ui/core/Box";

const configs = require('../../utils/config');
const {volumeAddress} = require('../../utils/config.js');
const Big = require('big-js');

const landingStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
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
    },
    text: {
        padding: '2.5em',
        textAlign: "left",
        color: theme.palette.text.paragraph,
        fontSize: 16,
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

export const ViewOnExplorerButton = ({txHash}) => {
    return (
        <Button onClick={() => window.open(configs.explorer + 'tx/' + txHash, '_blank')}>
            View Transaction
        </Button>
    )

}

const Refuel = () => {
    const {enqueueSnackbar} = useSnackbar();

    const classes = landingStyles();

    const wallet = useWallet();

    const [balance, setBalance] = useState(new Big(0));
    const [amount, setAmount] = useState("");
    const [message, setMessage] = useState("");
    const [enabled, setEnabled] = useState(false);
    const [busy, setBusy] = useState(false);
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
        setBusy(true)
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
                        enqueueSnackbar(`Transaction submitted ${txHash.toString().substr(0, 10)}`, {
                            variant: "success",
                            action: <ViewOnExplorerButton txHash={txHash}/>,
                            autoHideDuration: 3000
                        })
                        waitForTransaction(txHash).then(receipt => {
                            if (receipt.status) {
                                // transaction mined and did not revert
                                enqueueSnackbar(
                                    "Fuel supplied Successfully! All Crew members Thank you",
                                    {
                                        variant: "success",
                                        autoHideDuration: 4000,
                                        action: <ViewOnExplorerButton txHash={txHash}/>,
                                    }
                                )
                            } else {
                                // transaction mined and did revert
                                enqueueSnackbar(
                                    "Transaction Reverted 😢",
                                    {
                                        variant: "error",
                                        autoHideDuration: 3000,
                                        action: <ViewOnExplorerButton txHash={txHash}/>
                                    })
                            }
                            setAmount("");
                        }).finally(() => setBusy(false))
                    }).catch((err) => {
                        enqueueSnackbar(err.message, {variant: "error", autoHideDuration: 3000});
                        setBusy(false);
                    });
                }).catch(() => {
                    enqueueSnackbar("Error Happened during gas estimation", {variant: "error", autoHideDuration: 3000});
                    setBusy(false);
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

        if (regex.test(event.target.value)) {
            setAmount(event.target.value);
        }
    }

    return (
        <Page
            className={classes.root}
            title={'Home'}
        >
            <Container className={classes.contentBackground} maxWidth={"md"}>
                <Grid container item xs={12} className={classes.cardWrapper}>
                    <Grid container item justifyContent={"center"}>
                        <Card className={classes.card}>
                            {busy && <Box sx={{width: '100%'}}>
                                <LinearProgress color={"secondary"}/>
                            </Box>}
                            <Grid container style={{display: "flex", width: '100%', height: '100%'}}>
                                <Grid container item xs={12} md={6} justifyContent={"center"} alignItems={"flex-start"}
                                      style={{backgroundColor: "transparent"}}>
                                    <Grid item xs={12}>
                                        <Typography variant={'h1'} className={classes.title}>
                                            Direct Refuel
                                        </Typography>
                                        <Typography className={classes.text}>
                                            Direct refueling burns the total amount submitted for fuel. Please do not
                                            send
                                            an amount that you do not want to burn as it <b>CAN NOT BE RECOVERED</b>.
                                        </Typography>
                                    </Grid>

                                    <Grid container item xs={10} justifyContent={"space-between"}>
                                        <Typography className={classes.balanceText}>
                                            Amount
                                        </Typography>

                                        <Typography className={classes.balanceText}>
                                            Balance: {balance.toFixed(2)}
                                        </Typography>

                                        <TextField fullWidth variant={"outlined"} color={"secondary"}
                                                   onChange={handleChange} value={amount}
                                                   style={{borderRadius: '20px'}}/>

                                        <Button fullWidth color={"secondary"} variant={"contained"} onClick={refuel}
                                                disabled={!enabled || busy}
                                                style={{marginTop: '1em', margingBottom: '1em', borderRadius: '20px'}}>
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