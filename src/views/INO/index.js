import Page from "../../components/Root/Page";
import {
    Button,
    Container,
    Grid,
    makeStyles,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import React, {useEffect, useState} from "react";
import {useSnackbar} from "notistack";
import {useHistory} from "react-router-dom";
import {ROUTES_NAMES} from "../../constants";
import FeaturedCollection, {CollectionCard} from "../../components/INO/FeaturedCollection";
import {getCollections} from "../../utils/volume-factory";
import LoadingScreen from "../../components/LoadingScreen";
import {getNumberOfRandomImagesFromCollection} from "../../utils/ipfs-utils";

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
    const featuredCollection1 = {
        artistName: 'McJezus',
        artistSocial: 'https://twitter.com/',
        URI: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80',
        name: 'AstroPunks',
        description: 'The AstroPunks is a collection of 10,000 unique, automatically generated NFTs that was launched with the unveiling of the Volume LaunchPad'
    }

    const [otherCollections, setOtherCollections] = useState(undefined);
    const [featuredCollection, setFeaturedCollection] = useState(undefined);

    useEffect(() => {
        if(!otherCollections) {
            getCollections().then((res) => {
                if(res && res.length > 0) {
                    setOtherCollections(res.slice(1,res.length-1));
                    setFeaturedCollection(res[0]);
                }
            });
        }
    }, [otherCollections]);

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

                        {
                            featuredCollection &&
                            <FeaturedCollection
                                collection={featuredCollection}
                            />
                        }

                        {/* Other collections */}
                        <Typography variant={'h2'} className={classes.title}>
                            Other Collections
                        </Typography>

                        {
                            otherCollections &&
                                otherCollections.map(async (collection) => {
                                    const randomImage = await getNumberOfRandomImagesFromCollection(collection, 1);
                                    return (
                                        <CollectionCard
                                            collection={collection}
                                            uri={randomImage.url}
                                            key={randomImage.cid}
                                        />
                                    )
                                })
                        }


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