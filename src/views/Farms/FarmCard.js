import Box from "@material-ui/core/Box";
import {makeStyles, Typography} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import Grid from "@material-ui/core/Grid";
import {formatLongNumber} from "../../utils/Utilities";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import Dialog from "@material-ui/core/Dialog";
import useWallet from "use-wallet";
import {deposit, getRealContract, harvest, withdraw} from "../../utils/farm-core";
import {FarmABI} from "../../utils/farm-abi";
import {useSnackbar} from "notistack";
import {waitForTransaction} from "../../utils/volume-core";
import {ViewOnExplorerButton} from "../Refuel";
import useFarms from "../../hooks/useFarms";
import CircularProgress from "@material-ui/core/CircularProgress";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import Alert from "@material-ui/lab/Alert";
import {fromWei, toBN, toWei} from "web3-utils";
import {approve} from "../../utils/erc20-core";
import {erc20ABI} from "../../utils/erc20-abi";
import Skeleton from "@material-ui/lab/Skeleton";


const ecosystemConfigs = require('../../utils/DeploymentConfig');

const cardStyles = makeStyles((theme) => ({
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
        width: '400px',
        padding: 24
    },
}));

const FarmCard = ({farm, userInfo, ...rest}) => {
    const classes = cardStyles();

    return (
        <Box style={{color: "white", textAlign: 'center'}} className={classes.card}>
            <Box style={{textAlign: "center", width: '100%'}}>
                <img src={farm.stakedToken.icon} width={72} height={72}/>
            </Box>
            <Typography variant={"h3"} style={{width: '100%', marginBottom: 6}}>
                {farm.stakedToken.symbol}
            </Typography>

            <Grid container>
                <Grid item xs={12}>
                    <Chip
                        label={`X${farm.allocationPoints}`}
                        color="secondary"
                        variant="outlined"
                        style={{
                            fontSize: '1.3em',
                            border: '2.5px solid',
                        }}
                    />
                </Grid>
                <StatTextEntry
                    description={'Total Staked:'}
                    value={`${formatLongNumber(Number(farm.totalStaked) / 10 ** 18, 2)} ${farm.stakedToken.symbol}`}
                />
                <StatTextEntry
                    description={'APY:'}
                    value={`${formatLongNumber(Number(farm.apy) * 100, 2)} %`}
                />
                <VDiv/>
                <StatTextEntry
                    description={'In My Wallet:'}
                    value={`${userInfo && formatLongNumber(Number(userInfo.balance) / 10 ** 18, 2)} ${farm.stakedToken.symbol}`}
                    loading={!userInfo}
                />
                <StatTextEntry
                    description={'My Stake:'}
                    value={`${userInfo && formatLongNumber(Number(userInfo.staked) / 10 ** 18, 2)} ${farm.stakedToken.symbol}`}
                    loading={!userInfo}
                />
                <StatTextEntry
                    description={'My Stake ratio:'}
                    value={`${userInfo && formatLongNumber(Number(userInfo.shareRatio) * 100, 2) + ' %'}`}
                    loading={!userInfo}
                />
                <VDiv/>
                <StatTextEntry
                    description={'My Rewards:'}
                    value={`${userInfo && formatLongNumber(Number(userInfo.pending) / 10 ** 18, 2)} VOL`}
                    loading={!userInfo}
                />
                <StatTextEntry
                    description={'Weekly Estimate:'}
                    value={`${userInfo && formatLongNumber(Number(userInfo.weeklyRewards) / 10 ** 18, 2)} VOL`}
                    loading={!userInfo}
                />
                <VDiv/>
                <VDiv/>
                <ClaimComponent farm={farm} useInfo={userInfo}/>
                <WithdrawComponent farm={farm} userInfo={userInfo}/>
                <VDiv/>
                {userInfo && Number(userInfo.allowance) > Number(userInfo.balance) ?
                    <DepositComponent farm={farm} userInfo={userInfo}/> :
                    <ApproveComponent farm={farm} userInfo={userInfo}/>
                }
            </Grid>

        </Box>
    )
}

export default FarmCard;


const VDiv = () => <Grid item xs={12} style={{minHeight: 16}}/>

const ApproveComponent = ({farm, userInfo}) => {
    const wallet = useWallet();
    const {enqueueSnackbar} = useSnackbar();
    const [busy, setBusy] = useState(false);
    const {updateUserInfos} = useFarms();

    const approveFarm = async () => {
        if (!wallet || !wallet.account) return;
        setBusy(true);
        await handleTransactionPromise(
            {
                transactionPromise: approve(
                    await getRealContract(farm.stakedToken.address, wallet.ethereum, erc20ABI),
                    ecosystemConfigs.farmAddress,
                    new toBN(2).pow(toBN(256)).sub(toBN('1')), // max uint 256 (2**256)-1 to account for the zero offset
                    wallet
                ),
                successMessage: 'Success!',
                enqueueSnackbar
            }
        )
        setBusy(false)
        updateUserInfos();
    }

    return (
        <CardButton title={'Approve'} onClick={approveFarm} busy={busy} disabled={busy}/>
    )

}


const DepositComponent = ({farm, userInfo}) => {
    const wallet = useWallet();
    const {enqueueSnackbar} = useSnackbar();
    const {updateUserInfos} = useFarms();


    const [value, setValue] = useState("0");
    const [useMax, setUseMax] = useState(false);
    const [busy, setBusy] = useState(false);
    const [open, setOpen] = useState(false);
    const [inError, setInError] = useState('');


    useEffect(() => {
        if (!userInfo) return;
        if (!useMax && Number(value) * 10 ** 18 > Number(userInfo.balance)) {
            setInError('Exceeded Balance');
        } else
            setInError('');
    }, [value, useMax])

    const handleDeposit = async () => {
        setBusy(true)
        await handleTransactionPromise(
            {
                transactionPromise: deposit(
                    await getRealContract(ecosystemConfigs.farmAddress, wallet.ethereum, FarmABI),
                    farm.pid,
                    useMax ? userInfo.balance : toWei(value),
                    wallet
                ),
                successMessage: 'Success!',
                enqueueSnackbar
            }
        )
        setBusy(false)
        setOpen(false)
        updateUserInfos()
    }

    return (
        <Grid item xs={12}>
            <CardButton
                title={'Deposit'}
                disabled={!(userInfo && Number(userInfo.balance) > 0) || busy}
                onClick={() => setOpen(true)}
            />
            {userInfo &&
            <AmountDialog
                title={'Deposit'}
                value={value}
                inError={inError}
                maxAmount={userInfo.balance}
                setUseMax={setUseMax}
                setValue={setValue}
                busy={busy}
                handleAction={handleDeposit}
                open={open}
                setOpen={setOpen}
            />
            }
        </Grid>
    )
}

const WithdrawComponent = ({farm, userInfo}) => {
    const wallet = useWallet();
    const {enqueueSnackbar} = useSnackbar();
    const {updateUserInfos} = useFarms();


    const [value, setValue] = useState("0");
    const [useMax, setUseMax] = useState(false);
    const [busy, setBusy] = useState(false);
    const [open, setOpen] = useState(false);
    const [inError, setInError] = useState('');


    useEffect(() => {
        if (!userInfo) return;
        if (!useMax && Number(value) * 10 ** 18 > Number(userInfo.staked)) {
            setInError('Exceeded Staked Amount');
        } else
            setInError('');
    }, [value, useMax])

    const handleWithdraw = async () => {
        setBusy(true)
        await handleTransactionPromise(
            {
                transactionPromise: withdraw(
                    await getRealContract(ecosystemConfigs.farmAddress, wallet.ethereum, FarmABI),
                    farm.pid,
                    useMax ? userInfo.staked : toWei(value),
                    wallet
                ),
                successMessage: 'Success!',
                enqueueSnackbar
            }
        )
        setBusy(false)
        setOpen(false)
        updateUserInfos()
    }

    return (
        <Grid item xs={6} style={{paddingLeft: 6}}>
            <CardButton
                title={'Withdraw'}
                disabled={!(userInfo && Number(userInfo.staked) > 0) || busy}
                onClick={() => setOpen(true)}
            />
            {userInfo &&
            <AmountDialog
                title={'Withdraw'}
                value={value}
                inError={inError}
                maxAmount={userInfo.staked}
                setUseMax={setUseMax}
                setValue={setValue}
                busy={busy}
                handleAction={handleWithdraw}
                open={open}
                setOpen={setOpen}
            />}
        </Grid>
    )
}

const ClaimComponent = ({farm, useInfo}) => {
    const wallet = useWallet();
    const {updateUserInfos} = useFarms();
    const [busy, setBusy] = useState(false);
    const {enqueueSnackbar} = useSnackbar();

    const handleHarvest = async () => {
        setBusy(true);

        await handleTransactionPromise(
            {
                transactionPromise: harvest(
                    await getRealContract(ecosystemConfigs.farmAddress, wallet.ethereum, FarmABI),
                    farm.pid,
                    wallet
                ),
                successMessage: 'Success! Your $VOL will show in your balance shortly',
                enqueueSnackbar
            }
        )
        setBusy(false)
        updateUserInfos();
    };

    return (
        <Grid item xs={6} style={{paddingRight: 6}}>
            <CardButton
                title={'Harvest'}
                disabled={!(useInfo && Number(useInfo.pending) > 0) || busy}
                busy={busy}
                onClick={handleHarvest}
            />
        </Grid>
    )
}

const StatTextEntry = ({description, value,loading}) => {
    return (
        <>
            <Grid item xs={6} style={{textAlign: "left"}}>
                {description}
            </Grid>
            <Grid item xs={6} style={{textAlign: "right"}}>
                <b>{loading ? <Skeleton animation="wave"/>
                    : value}</b>
            </Grid>
        </>
    )
}

const CardButton = ({title, disabled, busy, onClick}) => {
    const wallet = useWallet();

    const handleConnect = () => {
        if (wallet)
            wallet.connect();
    }

    return <Button
        disabled={wallet && wallet.status === "connected" && disabled} // ignore disabled when not connected to wallet
        variant={"contained"}
        fullWidth
        color={"secondary"}
        style={{color: 'black', borderRadius: '2px'}}
        onClick={wallet && wallet.status === "connected" ? onClick : handleConnect}
    >
        {busy && <CircularProgress style={{height: 24, width: 24, marginRight: 6}}/>}
        {wallet && wallet.status === "connected" ? title : 'Connect Wallet'}
    </Button>
}

const AmountDialog = ({title, inError, value, setValue, setUseMax, maxAmount, setOpen, open, handleAction, busy}) => {

    return (
        <Dialog
            fullWidth={true}
            maxWidth={'sm'}
            open={open}
            onClose={() => setOpen(false)}
        >
            <DialogTitle>
                <Typography variant={"h4"}>
                    {title}
                </Typography>
            </DialogTitle>

            <DialogContent dividers>
                <Alert severity={"info"} style={{
                    marginTop: 6,
                    marginBottom: 24
                }}>{`Current Balance: ${formatLongNumber(Number(maxAmount) / 10 ** 18, 2)}`}</Alert>
                <FormControl error={inError} fullWidth
                             color={"secondary"}/*className={clsx(classes.margin, classes.textField)}*/
                             variant="outlined">
                    <InputLabel>Amount</InputLabel>
                    <OutlinedInput

                        type={'number'}
                        fullWidth
                        value={value}
                        onChange={(event) => {
                            setValue(Number(event.target.value) || Number(event.target.value) === 0 ? event.target.value : value);
                            setUseMax(false)
                        }}
                        endAdornment={<InputAdornment position="end">
                            <Button
                                onClick={() => {
                                    setValue('' + (Number(maxAmount) / 10 ** 18))
                                    setUseMax(true)
                                }}
                            >
                                Use Max
                            </Button>
                        </InputAdornment>}
                        labelWidth={64}
                    />

                </FormControl>
                {inError && <Alert severity={"error"} style={{marginTop: 6, marginBottom: 6}}>{inError}</Alert>}
                <Grid container spacing={2} style={{marginTop: 6}}>
                    <Grid item xs={6}>
                        <Button
                            variant={"contained"}
                            fullWidth color={"secondary"}
                            disabled={busy || inError}
                            onClick={handleAction}
                        >
                            {busy && <CircularProgress style={{height: 24, width: 24, marginRight: 6}}/>}
                            {title}
                        </Button>
                    </Grid>
                    <Grid item xs={6}>
                        <Button
                            variant={"contained"}
                            fullWidth
                            disabled={busy}
                            onClick={() => setOpen(false)}
                        >
                            Cancel
                        </Button>
                    </Grid>
                </Grid>


            </DialogContent>
        </Dialog>
    )
}

// functions
const handleTransactionPromise = async ({transactionPromise, successMessage, enqueueSnackbar}) => {
    let tx;
    try {
        tx = await transactionPromise;
        const receipt = await waitForTransaction(tx)
        if (receipt.status) {
            // transaction mined and did not revert
            enqueueSnackbar(
                successMessage,
                {
                    variant: "success",
                    autoHideDuration: 4000,
                    action: <ViewOnExplorerButton txHash={tx}/>,
                }
            )
        } else {
            // transaction mined and did revert
            enqueueSnackbar(
                "Transaction Reverted 😢",
                {
                    variant: "error",
                    autoHideDuration: 3000,
                    action: <ViewOnExplorerButton txHash={tx}/>
                })
        }
    } catch (error) {
        enqueueSnackbar(
            error.message,
            {
                variant: "error",
                autoHideDuration: 3000,
                action: <ViewOnExplorerButton txHash={tx}/>
            })
    }
}