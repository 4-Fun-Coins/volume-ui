import Page from "../../components/Root/Page";
import {
    Button,
    Checkbox, CircularProgress,
    Collapse,
    Container,
    Grid,
    makeStyles,
    TextField
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {useWallet} from "use-wallet";
import React, {useEffect, useState} from "react";
import LinearProgress from "@material-ui/core/LinearProgress";
import Box from "@material-ui/core/Box";
import useVolume from "../../hooks/useVolume";
import {getDir, getFileContents} from "../../utils/ipfs-utils";
import {getDataForApplication} from "../../utils/volume-ino";
import {volumeINO, daiAddress} from "../../utils/config.js";
import {getDataForRefuel, waitForTransaction} from "../../utils/volume-core";
import {useSnackbar} from "notistack";
import {getDataForApprove} from "../../utils/erc20-utils";

const configs = require('../../utils/config');
const Big = require('big-js');

const inoStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
    },
    contentBackground: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    card: {
        borderRadius: 12,
        background: 'linear-gradient(to top, #0A0A0AB2, #1d0134aa) !important',
        borderBottom: `6px solid ${theme.palette.secondary.dark}`,
        marginTop: '6em',
    },
    title: {
        width: '100%',
        textAlign: 'center',
        padding: '1.2em',
        paddingBottom: 0,
        color: theme.palette.twinkle.main,
    },
    text: {
        padding: '2.5em',
        textAlign: 'center',
        color: theme.palette.text.paragraph,
        fontSize: 16,
    },
    formEntryHeading: {
        fontSize: 16,
        color: theme.palette.twinkle.main,
        textAlign: "center"
    },
    errorText: {
        color: "red",
        width: '100%',
        textAlign: "center"
    },
    textFieldRemainder: {
        width: '100%',
        textAlign: "right",
        color: theme.palette.rocket.main
    }
}));

export const ViewOnExplorerButton = ({txHash}) => {
    return (
        <Button onClick={() => window.open(configs.explorer + 'tx/' + txHash, '_blank')}>
            View Transaction
        </Button>
    )
}

const INOApplication = () => {

    const classes = inoStyles();
    const {enqueueSnackbar} = useSnackbar();

    const wallet = useWallet();
    const volume = useVolume();

    const [balance, setBalance] = useState(new Big(0));
    const [message, setMessage] = useState("");

    // User Handling
    const [enabled, setEnabled] = useState(false);
    const [checkingIpfs, setCheckingIpfs] = useState(false);
    const [busyApproving, setBusyApproving] = useState(false);
    const [busyApplying, setBusyApplying] = useState(false);
    const [buttonText, setButtonText] = useState("Submit Application");
    const [successfulApplication, setSuccessfulApplication] = useState(false);
    const descriptionLength = 150;

    // Error Handling
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    //  === Components
    // Collection Information
    const [name, setName] = useState('');
    const [symbol, setSymbol] = useState('');
    const [description, setDescription] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    // Artist Information
    const [artistName, setArtistName] = useState('');
    const [artistSocial, setArtistSocial] = useState('');

    // IPFS Ready
    const [ipfsReady, setIpfsReady] = useState(false);
    const [cid, setCID] = useState('');

    // Agreement
    const [agree, setAgree] = useState(false);

    useEffect(() => {
        let en = true;

        if (name.trim() === '')
            en = false;

        if (symbol.trim() === '')
            en = false;

        if (minPrice.toString().trim() === '')
            en = false;

        if (maxPrice.toString().trim() === '')
            en = false;

        if (!ipfsReady)
            en = false;

        if (cid.trim() === '')
            en = false;

        if (!agree)
            en = false;

        setEnabled(en);
    }, [name, symbol, minPrice, maxPrice, ipfsReady, agree, ipfsReady, cid]);

    useEffect(() => {
        let message = "Submit Application";

        if (checkingIpfs)
            message = 'Checking IPFS';

        if(busyApproving)
            message = 'Approving';

        if (busyApplying)
            message = 'Submitting Application';

        if(wallet.status !== 'connected')
            message = 'Please connect your wallet';

        if(successfulApplication)
            message = 'Successfully Applied!'

        setButtonText(message);
    }, [busyApproving, busyApplying, checkingIpfs, wallet.status, successfulApplication]);

    const beforeSubmit = () => {
        let controller = new AbortController();
        let signal = controller.signal;

        setTimeout(() => {
            controller.abort()
        }, 20000);

        setCheckingIpfs(true);

        getDir(cid, signal).then(async (res) => {
            setError(false);

            const totalSupply = res.length;

            let perkLevels = [];

            for(let i = 0; i < totalSupply; i++) {
                const contents = await getFileContents(res[i].path);
                const json = JSON.parse(contents);
                perkLevels.push(parseInt(json.properties.perkLevel.description));
            }

            submit(totalSupply, perkLevels);

        }).catch((err) => {
            setError(true);
            console.log(err);
            setErrorMessage('IPFS request timed out - please try again');
        }).finally(() => {
            setCheckingIpfs(false);
        });
    }

    const submit = (totalSupply, perkLevels) => {
        // Approve
        setBusyApproving(true);
        const approveTxParams = {
            to: daiAddress,
            from: wallet.account,
            data: getDataForApprove(daiAddress, volumeINO, 20),
            chainId: configs.chainId,
        }

        wallet.ethereum.request({
            method: 'eth_sendTransaction',
            params: [approveTxParams]
        }).then(async (txHash) => {
            enqueueSnackbar(`Approval successful ${txHash.toString().substr(0, 10)}`, {
                variant: "success",
                action: <ViewOnExplorerButton txHash={txHash}/>,
                autoHideDuration: 3000
            });

            await waitForTransaction(txHash);

            setBusyApplying(true);

            // Submit transaction
            const applicationTxParams = {
                to: volumeINO,
                from: wallet.account,
                data: getDataForApplication(name, symbol, description, `ipfs://${cid}/`, minPrice, maxPrice, totalSupply, perkLevels, artistName, artistSocial),
                chainId: configs.chainId,
            }

            wallet.ethereum.request({
                method: 'eth_sendTransaction',
                params: [applicationTxParams]
            }).then(async (txHash) => {
                enqueueSnackbar(`Application submitted ${txHash.toString().substr(0, 10)}`, {
                    variant: "success",
                    action: <ViewOnExplorerButton txHash={txHash}/>,
                    autoHideDuration: 3000
                });

                await waitForTransaction(txHash);
                setSuccessfulApplication(true);
            }).catch((err) => {
                if(err.code === 4001)
                    //denied
                    console.log(err);
            }).finally(() => {
                setBusyApplying(false);
            });
        }).catch((err) => {
            if (err.code === 4001)
                //denied
                console.log(err);
        }).finally(() => {
            setBusyApproving(false);
        });
    }

    return (
        <Page
            className={classes.root}
            title={'Home'}
        >
            <Container className={classes.contentBackground} maxWidth={"md"}>
                <Grid container item className={classes.card}>
                    {busyApplying && <Box sx={{width: '100%'}}>
                        <LinearProgress color={"secondary"}/>
                    </Box>}
                    <Grid container item xs={12}
                          style={{width: '100%', height: '100%', backgroundColor: "transparent"}}
                          justify={"center"}
                    >
                        <Typography variant={'h1'} className={classes.title}>
                            INO Application
                        </Typography>

                        <Typography className={classes.text}>
                            Below you can apply to have your artwork launched through the Volume Initial
                            NFT Offering. It will have a special level perk embedded into it, so it can integrate
                            with the rest of the Volume ecosystem.
                            <br/>
                            <br/>
                            Please be aware that all purchases will be made in VOL and you will receive VOL as the
                            NFTs are purchased.
                        </Typography>

                        <FormGroup title={'Collection Information'}>
                            <FormEntry heading={'Collection Name'} placeholder={'My Volume Collection'} text
                                       handleChange={setName}/>
                            <FormEntry heading={'Collection Symbol'} placeholder={'MVC'} text handleChange={setSymbol}/>
                            <FormEntry heading={'Collection Description'}
                                       placeholder={'A short description of the collection'}
                                       text multiline maxLength={descriptionLength} handleChange={setDescription}/>
                            <FormEntry heading={'Collection Minimum Price (VOL)'} placeholder={'100'} text number
                                       handleChange={setMinPrice}/>
                            <FormEntry heading={'Collection Maximum Price (VOL)'} placeholder={'1000'} text number
                                       handleChange={setMaxPrice}/>
                        </FormGroup>

                        <FormGroup title={'Artist Information'}>
                            <FormEntry heading={'Artist Name'} placeholder={'BestNFTCr34t0r'} text
                                       handleChange={setArtistName}/>
                            <FormEntry heading={'Artist Social Link'}
                                       placeholder={'https://twitter.com/4FC_Volume OR link tree'}
                                       text handleChange={setArtistSocial}
                            />
                        </FormGroup>

                        <FormGroup title={'IPFS Ready'}>
                            <FormEntry
                                heading={
                                    <Typography>
                                        I have already deployed my collection to IPFS according to the {'\ '}
                                        <a href={configs.resourceLink + '/blob/master/nft-deployment.md'}
                                           target={"_blank"} style={{color: "white"}}>JSON structure outlined here</a>
                                    </Typography>
                                }
                                handleChange={setIpfsReady}
                                checkBox
                            />
                            <FormEntry
                                heading={"Folder CID Hash"}
                                placeholder={'QmdbaSQbGU6Wo9i5LyWWVLuU8g6WrYpWh2K4Li4QuuE8Fr'}
                                enabled={!ipfsReady}
                                text
                                handleChange={setCID}
                            />
                        </FormGroup>

                        <FormGroup title={'Submission Agreement'}>
                            <FormEntry
                                heading={'I acknowledge that there is an application fee of 20 USD payable in DAI. I agree that I have at least 20 DAI and that the amount will be deducted from my wallet ' +
                                'when I submit the application. I acknowledge that my application may be declined because it contains (but not limited to) explicit pornography, content that ' +
                                'promotes racism, content that promotes violence and/or hatred towards any specific race/group.'}
                                handleChange={setAgree}
                                checkBox
                            />
                        </FormGroup>

                        <Button color={"secondary"} variant={"contained"}
                                onClick={beforeSubmit}
                                disabled={!enabled || busyApproving || busyApplying || checkingIpfs || wallet.status !== 'connected' || successfulApplication}
                                style={{
                                    margin: '1.5em 0em 0.5em 0em',
                                    borderRadius: '1.2em',
                                    width: '50%',
                                    fontSize: '1.2em',
                                    color: 'white'
                                }}>
                            {busyApplying || checkingIpfs &&
                            <CircularProgress variant={"indeterminate"} color={"secondary"}
                                              style={{marginRight: '0.5em'}}/>}
                            {buttonText}
                        </Button>
                        {
                            error &&
                            <Typography className={classes.errorText}>
                                {errorMessage}
                            </Typography>
                        }

                    </Grid>
                </Grid>
            </Container>
        </Page>
    )
}

const FormGroup = ({
                       title, children,
                       enabled
                   }) => {
    return (
        <Grid container item xs={12} style={{marginTop: '3em'}}>
            <Collapse in={!enabled} style={{width: '100%'}}>
                <Typography style={{marginBottom: '0.5em', textAlign: "center"}} variant={"h2"} color={"secondary"}>
                    {title}
                </Typography>
                {children}
            </Collapse>
        </Grid>
    );
}

const FormEntry = ({
                       heading, placeholder, value, enabled, // Component information
                       handleChange, // Handlers
                       text, file, checkBox, info, // Component types
                       number, multiline, maxLength, // Component options
                       ...rest
                   }) => {

    const classes = inoStyles();

    const [length, setLength] = useState(0);

    return (
        <Collapse in={!enabled} style={{width: '100%'}}>
            <Grid container item xs={8} justify={"center"} alignItems={"center"} direction={"column"}
                  style={{margin: 'auto'}}>
                <Typography className={classes.formEntryHeading}>
                    {heading}
                </Typography>

                {
                    text &&
                    <>
                        <TextField
                            variant={"outlined"}
                            inputProps={{maxLength: maxLength}}
                            multiline={multiline}
                            type={number ? 'number' : 'text'}
                            color={"secondary"}
                            style={{borderRadius: '20px', width: '100%', marginBottom: maxLength ? '0.1em' : '2em'}}
                            placeholder={'eg. ' + placeholder}
                            value={value}
                            onChange={(event) => {
                                setLength(event.target.value.length);
                                handleChange(event.target.value)
                            }}
                        />
                        {
                            maxLength &&
                            <Typography className={classes.textFieldRemainder} style={{marginBottom: '1.9em'}}>
                                {`(${maxLength - length}/${maxLength})`}
                            </Typography>
                        }
                    </>

                }

                {
                    checkBox &&
                    <Checkbox
                        style={{marginBottom: '1em'}}
                        onChange={(event, checked) => {
                            handleChange(checked);
                        }}
                    />
                }

                {
                    info &&
                    <Typography className={classes.formEntryHeading}>
                        {value}
                    </Typography>
                }
            </Grid>
        </Collapse>
    );
}

export default INOApplication;