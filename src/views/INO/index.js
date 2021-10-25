import Page from "../../components/Root/Page";
import {
    Button,
    Container,
    Grid,
    makeStyles,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import React, {useState} from "react";
import {useSnackbar} from "notistack";
import {useHistory} from "react-router-dom";
import {ROUTES_NAMES} from "../../constants";
import FeaturedCollection, {CollectionCard} from "../../components/INO/FeaturedCollection";

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
    title: {
        width: '100%',
        textAlign: 'center',
        padding: '1.5em',
        paddingBottom: 0,
        color: theme.palette.twinkle.main,
    },
    applyText: {
        paddingTop: '2em',
        width: '100%',
        textAlign: "center",
        color: theme.palette.twinkle.main,
        '&:hover': {
            textDecoration: 'underline',
            cursor: 'pointer'
        },
    },
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

    const classes = inoStyles();

    const history = useHistory();

    // Collection
    const featuredCollection = {
        artistName: 'McJezus',
        artistSocial: 'https://twitter.com/',
        URI: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80',
        name: 'AstroPunks',
        description: 'The AstroPunks is a collection of 10,000 unique, automatically generated NFTs that was launched with the unveiling of the Volume LaunchPad'
    }

    const handleApply = (event) => {
        history.push(ROUTES_NAMES.INO_APPLICATION);
    }

    return (
        <Page
            className={classes.root}
            title={'Home'}
        >
            <Container className={classes.contentBackground} maxWidth={"lg"}>
                <Grid container item justifyContent={"center"} className={classes.card}>
                    <Grid container item xs={12} style={{width: '100%', height: '100%', backgroundColor: "transparent"}}
                          justifyContent={"center"}>

                        <FeaturedCollection
                            collection={featuredCollection}
                        />

                        {/* Other collections */}
                        <Typography variant={'h1'} className={classes.title}>
                            Other Collections
                        </Typography>

                        <CollectionCard
                            collection={featuredCollection}
                        />

                        <Typography variant={"h4"} className={classes.applyText} onClick={handleApply}>
                            Want to launch your own collection?
                            <br/>
                            Click here
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </Page>
    )
}

export default INO;