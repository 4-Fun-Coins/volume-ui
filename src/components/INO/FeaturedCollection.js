import {Card, Grid, makeStyles, useMediaQuery, useTheme} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import React, {useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import {ROUTES_NAMES} from "../../constants";
import {getFileContents, getImageURL, getNumberOfRandomImagesFromCollection} from "../../utils/ipfs-utils";
import LoadingScreen from "../LoadingScreen";

const featuredStyles = makeStyles((theme) => ({
    featuredCollectionName: {
        textAlign: 'center',
        fontWeight: "bolder",
        fontSize: 40,
        textDecoration: "underline",
        width: '100%',
        padding: '0.5em',
        color: theme.palette.twinkle.main,
    },
    featuredCollectionDescription: {
        fontSize: 30,
        width: '100%',
        textAlign: "center",
        color: theme.palette.text.paragraph,
        marginBottom: '1em',
        padding: '0.5em'
    },
    featuredArtistText: {
        textAlign: "center",
        color: theme.palette.text.primary,
        [theme.breakpoints.between('xs', 'sm')]: {
            textAlign: "center"
        }
    },
    featuredArtistFocusText: {
        textAlign: "center",
        padding: '0.5em',
        color: theme.palette.flame.main,
        [theme.breakpoints.between('xs', 'sm')]: {
            textAlign: "center"
        }
    },
    collectionCard: {
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        marginTop: '1em',
        marginBottom: '1em',
        marginLeft: 'auto',
        marginRight: 'auto',
        height: '320px',
        width: '180px',
    },
    hoverCard: {
        height: '100%',
        width: '100%',
        '&:hover': {
            backgroundColor: `rgba(0,0,0,0.5)`,
            cursor: 'pointer'
        }
    },
    cardText: {
        width: '100%',
        padding: '1em',
        textAlign: "center",
        fontSize: 26,
        color: theme.palette.text.paragraph
    },
    cardSubText: {
        textAlign: "center",
        fontSize: 16,
        color: theme.palette.text.secondary
    }
}));

const FeaturedCollection = ({collection}) => {
    const classes = featuredStyles();

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.between('xs', 'sm'));

    const [urlsSet, setUrlsSet] = useState(false);
    const [refs, setRefs] = useState(undefined);

    useEffect(() => {
        if(!urlsSet) {
            getNumberOfRandomImagesFromCollection(collection, 4).then((randomImages) => {
                setRefs(randomImages);
                setUrlsSet(true);
            });
        }
    }, [urlsSet]);

    return (
        <>
            <Typography className={classes.featuredCollectionName}>
                {collection.name}
            </Typography>

            <Typography className={classes.featuredCollectionDescription}>
                {collection.description}
            </Typography>

            <Grid container item xs={12} justifyContent={"space-evenly"} style={{marginBottom: '1em'}}>
                <Typography className={classes.featuredArtistText} variant={"h4"}>
                    Collection by:
                    <Typography className={classes.featuredArtistFocusText} variant={"h4"}>
                        {collection.artistName}
                    </Typography>
                </Typography>

                <Typography className={classes.featuredArtistText} variant={"h4"}>
                    Socials:
                    <a href={collection.artistSocial} style={{color: "white"}}>
                        <Typography className={classes.featuredArtistFocusText} variant={"h4"}>
                            {collection.artistSocial}
                        </Typography>
                    </a>
                </Typography>
            </Grid>

            {/*Carousel*/}
            {
                !urlsSet &&
                    <Grid container item xs={12} justifyContent={"center"}>
                        <LoadingScreen transparent/>
                    </Grid>
            }
            {
                urlsSet &&
                <Grid container item xs={12} justifyContent={"space-around"}>
                    {
                        refs.map((ref) => {
                            return (
                                <CollectionCard
                                    collection={collection}
                                    uri={ref.url}
                                    key={ref.cid}
                                />
                            );
                        })
                    }
                </Grid>
            }
        </>
    );
}

const CollectionCard = ({collection, uri}) => {
    const classes = featuredStyles();
    const history = useHistory();

    const [hovering, setHovering] = useState(false);

    const handleClick = (collectionName) => {
        console.log('Clicked',collectionName);
        history.push(ROUTES_NAMES.INO_COLLECTION.replace(":name", collectionName));
    }

    return (

        <Card
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
            onClick={() => handleClick(collection.name)}
            className={classes.collectionCard}
            style={{
                backgroundImage: `url(${uri})`,
            }}
        >
            {hovering &&
                <Grid container className={classes.hoverCard} direction={"column"} justifyContent={"center"}>
                    <Typography className={classes.cardText}>
                        {collection.name}
                    </Typography>
                    <Typography className={classes.cardSubText}>
                        Click to see more
                    </Typography>
                </Grid>
            }
        </Card>
    )
}

export default FeaturedCollection;
export {CollectionCard}