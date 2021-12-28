import Page from "../../components/Root/Page";
import {
    Button,
    Container,
    Grid,
    makeStyles,
} from "@material-ui/core";
import React, {useEffect, useState} from "react";
import {useSnackbar} from "notistack";
import {useParams} from "react-router-dom";
import FeaturedCollection from "../../components/INO/FeaturedCollection";
import useCollections from "../../hooks/useCollections";
import {useWallet} from "use-wallet";
import {SimpleDialog} from "../../components/INO/BuyDialog";
import Typography from "@material-ui/core/Typography";

const configs = require('../../utils/config');

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
        justifyContent: 'center',
    },
    card: {
        borderRadius: 12,
        background: 'linear-gradient(to top, #0A0A0AB2, #1d0134aa) !important',
        borderBottom: `6px solid ${theme.palette.secondary.dark}`,
        marginTop: '6em',
    },
    buyButton: {
        margin: '1em',
        color: 'white',
        borderRadius: '50px'
    },
    buttonText: {
        fontSize: 20,

    }
}));

export const ViewOnExplorerButton = ({txHash}) => {
    return (
        <Button onClick={() => window.open(configs.explorer + 'tx/' + txHash, '_blank')}>
            View Transaction
        </Button>
    )
}

const INO = () => {
    const {enqueueSnackbar} = useSnackbar();
    const {address} = useParams();
    const wallet = useWallet();

    const classes = inoStyles();
    const {getCollectionForAddress} = useCollections();
    const [initCollection, setInitCollection] = useState(false);
    const [collection, setCollection] = useState(undefined);

    const [open, setOpen] = React.useState(false);

    const handleClickBuy = () => {
        setOpen(true);
    };

    const handleCloseBuy = (value) => {
        setOpen(false);
    };

    useEffect(() => {
        if (!initCollection) {
            const coll = getCollectionForAddress(address);
            setCollection(coll);
            setInitCollection(true);
        }
    }, [initCollection]);

    return (
        <Page
            className={classes.root}
            title={'Home'}
        >
            <Container className={classes.contentBackground} maxWidth={"lg"}>
                <Grid container item justify={"center"} className={classes.card}>
                    <Grid container item xs={12} style={{width: '100%', height: '100%', backgroundColor: "transparent"}}
                          justify={"center"}>

                        {
                            initCollection &&
                            <FeaturedCollection
                                collection={collection}
                                clickable={false}
                            />
                        }


                        <Button
                            variant={"contained"}
                            color={"secondary"}
                            className={classes.buyButton}
                            onClick={handleClickBuy}
                            disabled={wallet.status !== "connected"}
                        >
                            {
                                initCollection &&
                                <Typography className={classes.buttonText}>
                                    {wallet.status === "connected" ? `Buy random NFT fom ${collection.name}` : "Connect wallet"}
                                </Typography>
                            }
                        </Button>
                    </Grid>
                </Grid>
                {
                    initCollection &&
                    <SimpleDialog
                        open={open}
                        onClose={handleCloseBuy}
                        collection={collection}
                    />
                }

            </Container>
        </Page>
    )
}

export default INO;