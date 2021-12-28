import * as React from 'react';
import {
    Button, CircularProgress,
    Dialog,
    Grid, makeStyles, Slider, TextField,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {useEffect, useState} from "react";
import {getDataForBuyNftForAddress, getQuoteForAddress} from "../../utils/volume-factory";
import LoadingScreen from "../LoadingScreen";
import useVolume from "../../hooks/useVolume";
import {volumeFactory} from "../../utils/config.js";
import {approve, waitForTransaction} from "../../utils/volume-core";
import configs from "../../utils/config";
import {ViewOnExplorerButton} from "../../views/Refuel";
import useWallet from "use-wallet";
import {useSnackbar} from "notistack";
const Big = require('big-js');

const Web3 = require('web3');
let web3 = new Web3();
const {fromWei} = web3.utils;

const dialogStyles = makeStyles((theme) => ({
    heading: {
        padding: '1em',
        color: theme.palette.twinkle.main,
        fontSize: 26
    },
    info: {
        padding: '0.5em',
        color: theme.palette.flame.main,
        fontSize: 16
    },
    text: {
        padding: '0.5em',
        color: theme.palette.star.main,
        fontSize: 16
    },
    slippageButton: {
        color: "white",
        background: `linear-gradient(to left, #1d0134, #f18b2c)`
    }
}));

export function SimpleDialog({onClose, open, collection}) {
    const classes = dialogStyles();

    const {enqueueSnackbar} = useSnackbar();
    const {userStats, refreshUserStats, refreshMilestones, refreshEcosystemStats} = useVolume();
    const wallet = useWallet();

    const [userMaxPrice, setUserMaxPrice] = useState(0);
    const [quoteInit, setQuoteInit] = useState(false);
    const [quote, setQuote] = useState(0);
    const [slippage, setSlippage] = useState(1);

    // Purchase control
    const [canBuy, setCanBuy] = useState(false);
    const [busy, setBusy] = useState(false);

    // Approval
    const [approved, setApproved] = useState(false);
    const [busyApproving, setBusyApproving] = useState(false);

    const handleApprove = () => {
        setBusyApproving(true);
        approve(wallet, volumeFactory, '115792089237316195423570985008687907853269984665640564039457584007913129639935').then(() => {
            setBusyApproving(false);
            refreshUserStats();
        });
    }

    const handleClose = () => {
        onClose();
    };

    const directChangeSlippage = (amount) => {
        setSlippage(amount);
    }

    const handleChangeSlippage = (event) => {
        const regex = /^[0-9]*\.?[0-9]*$/;

        if (regex.test(event.target.value)) {
            setSlippage(event.target.value);
        }
    }

    const handleConfirm = () => {
        setBusy(true);

        const transactionParams = {
            to: volumeFactory,
            from: wallet.account,
            data: getDataForBuyNftForAddress(collection.nftAddress, quote, slippage),
            chainId: configs.chainId,
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
                        "Thank you for your NFT purchase!",
                        {
                            variant: "success",
                            autoHideDuration: 4000,
                            action: <ViewOnExplorerButton txHash={txHash}/>,
                        }
                    );
                    refreshMilestones();
                    refreshEcosystemStats();
                    refreshUserStats();
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
            }).finally(() => setBusy(false))
        }).catch((err) => {
            enqueueSnackbar(err.message, {variant: "error", autoHideDuration: 3000});
            setBusy(false);
        });
    }

    useEffect(() => {
        if(!quoteInit) {
            getQuoteForAddress(collection.nftAddress).then((res) => {
                setQuote(res);
                setQuoteInit(true);
            });
        }
    }, [quoteInit]);

    useEffect(() => {
        setUserMaxPrice(fromWei(quote.toString()) * (1+slippage/100));
    }, [slippage, quote]);

    useEffect(() => {
        if (userStats.volumeBalance && new Big(userStats.volumeBalance).gte(userMaxPrice)) {
            setCanBuy(true);
        } else {
            setCanBuy(false);
        }
    }, [userMaxPrice]);

    useEffect(() => {
        console.log(userStats);
        if(userStats.factoryAllowance && new Big(userStats.factoryAllowance).gte(userMaxPrice)) {
            setApproved(true);
        }
    }, [userStats]);

    return (
        <Dialog onClose={handleClose} open={open}>

            <Typography className={classes.heading}>
                {collection.name}
            </Typography>

            {
                userStats &&
                    <Info
                        info={'Your balance'}
                        value={`${userStats.volumeBalance} VOL`}
                    />
            }

            {
                !quoteInit &&
                <LoadingScreen transparent/>
            }
            {
                quoteInit &&
                <Info
                    info={'Price'}
                    value={`${fromWei(quote)} VOL`}
                />
            }

            {
                quoteInit &&
                <Info
                    info={'Max Price'}
                    value={`${userMaxPrice} VOL`}
                />
            }

            <TextField
                placeholder={'Slippage %'} variant={"outlined"}
                style={{margin: '2em', width: '80%'}} color={"secondary"}
                onChange={handleChangeSlippage} value={slippage}/>

            <Grid container justify={"space-evenly"}>
                <SlippageButton value={1} text={"1%"} clickHandler={directChangeSlippage}/>
                <SlippageButton value={5} text={"5%"} clickHandler={directChangeSlippage}/>
                <SlippageButton value={10} text={"10%"} clickHandler={directChangeSlippage}/>
            </Grid>

            {
                !approved &&
                <Button variant={"contained"} color={"secondary"} style={{color: "white", margin: '2em', marginBottom: 0}} onClick={handleApprove}>
                    {
                        busyApproving &&
                        <CircularProgress style={{padding: '0.5em'}}/>
                    }
                    Approve
                </Button>
            }

            <Button disabled={!canBuy && busy} variant={"contained"} color={"secondary"} style={{color: "white", margin: '2em', marginTop: '1em'}} onClick={handleConfirm}>
                {
                    busy &&
                        <CircularProgress style={{padding: '0.5em'}}/>
                }
                Confirm
            </Button>

        </Dialog>
    );
}

const Info = ({info, value}) => {
    const classes = dialogStyles();

    return (
        <Grid container justify={"space-evenly"}>
            <Typography className={classes.info}>
                {`${info}:`}
            </Typography>

            <Typography className={classes.text}>
                {value}
            </Typography>
        </Grid>
    )
}

const SlippageButton = ({text, value, clickHandler}) => {
    const classes = dialogStyles();

    return (
        <Button variant={"contained"} className={classes.slippageButton} color={"secondary"} style={{marginBottom: '1em'}} onClick={() => clickHandler(value)}>
            {text}
        </Button>
    )
}
