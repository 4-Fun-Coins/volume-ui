import {Card, Container, makeStyles, useMediaQuery, useTheme} from "@material-ui/core";
import React from "react";
import Page from "../../components/Root/Page";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {PlanetColors} from "../../data/static/Colors";


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
    },
    contentBackground: {
        paddingTop: 72,
        paddingBottom: 10,
        color: '#eaeaea',
        textAlign: 'center',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    card: {
        borderRadius: 12,
        background: 'linear-gradient(to top, #0A0A0AB2, #1d0134aa) !important',
        padding: 16
    },
    textContainer: {
        display: 'flex',
        flexDirection: "column",
        alignItems: "center",
        padding: "16px!important",
    },
    paragraph: {
        fontSize: 20,
        textAlign: "justify",
        maxWidth: 450,
        letterSpacing: 1,
        marginBottom: '16px',
    },
    titleText: {
        marginTop: '12px',
        marginBottom: 10,
        fontSize: '3em',
    }
}));


const AstroPunks = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.between('xs', 'sm'));
    const classes = useStyles();

    return (
        <Page
            className={classes.root}
            title={'NFT Market'}
        >
            <Container
                maxWidth={'xl'}
                className={classes.contentBackground}
            >
                <Grid container style={{marginBottom: 50, marginTop: 50}}>
                    <Grid component={Card} item container xs={12} justifyContent={"center"} alignItems={"center"}
                          className={classes.card}
                          style={{
                              borderBottom: `2px solid ${PlanetColors.mars}`
                          }}>
                        <Grid item xs={isMobile ? 12 : 7} className={classes.textContainer}>
                            <Typography variant={"h1"} style={{color: PlanetColors.mars}} className={classes.titleText}>
                                AstroPunks
                            </Typography>
                            {isMobile && <img src={'punks/Astropunks_1.png'} width={256} height={256} style={{
                                imageRendering: 'pixelated', marginBottom: 12
                            }} alt={'astroPunks sample'}/>}
                            <p className={classes.paragraph}>
                                The AstroPunks is a collection of 10000 unique, algorithmically generated NFTs that will
                                be the first official NFT collection on Volume. Each of these highly anticipated NFTs
                                will have an embedded "Perk Level" that
                                will grant special perks and discounts on all the future Volume Products.
                            </p>
                        </Grid>
                        {!isMobile && <Grid item xs={5}>
                            <img src={'punks/Astropunks_1.png'} width={256} height={256} style={{
                                imageRendering: 'pixelated',
                            }}/>
                        </Grid>}
                    </Grid>
                </Grid>
                <Grid container style={{marginBottom: 50, marginTop: 50}}>

                    <Grid component={Card} item container xs={12} justifyContent={"center"} alignItems={"center"}
                          className={classes.card}
                          style={{
                              borderBottom: `2px solid ${PlanetColors.jupiter}`
                          }}>
                        {!isMobile && <Grid item xs={5}>
                            <img src={'punks/Astropunks_2.png'} width={256} height={256} style={{
                                imageRendering: 'pixelated',
                            }}/>
                        </Grid>}
                        <Grid item xs={isMobile ? 12 : 7} className={classes.textContainer}>
                            <Typography variant={"h1"} className={classes.titleText}
                                        style={{color: PlanetColors.jupiter}}>
                                Fair Distribution
                            </Typography>
                            {isMobile && <img src={'punks/Astropunks_2.png'} width={256} height={256} style={{
                                imageRendering: 'pixelated', marginBottom: 12
                            }}/>}
                            <p className={classes.paragraph}>
                                AstroPunks will be featured on the much anticipated INO platform that will offer fair
                                distribution of NFT collections.<br/><br/>
                                No more unfair NFT launches and private sales. The AstroPunks will be available to the
                                public for a fraction of its actual value.
                                Every purchase will use ChainLink's Verified Randomness to assign a random NFT to the
                                buyer. The INO scales the price to be fair to early buyers that have a lower chance to score a Mythic or
                                Unique NFT.<br/><br/>
                                The INO contract will ensure a fair distribution - robust against any manipulation.
                            </p>
                        </Grid>
                    </Grid>
                </Grid>

                <Grid container style={{marginBottom: 50, marginTop: 50}}>

                    <Grid component={Card} item container xs={12} justifyContent={"center"} alignItems={"center"}
                          className={classes.card}
                          style={{
                              borderBottom: `2px solid ${PlanetColors.uranus}`
                          }}>
                        <Grid item xs={isMobile ? 12 : 7} className={classes.textContainer}>
                            <Typography variant={"h1"} className={classes.titleText}
                                        style={{color: PlanetColors.uranus}}>
                                Perk Levels ?!
                            </Typography>
                            {isMobile && <img src={'punks/Astropunks_3.png'} width={256} height={256} style={{
                                imageRendering: 'pixelated', marginBottom: 12
                            }}/>}
                            <p className={classes.paragraph}>
                                &emsp;In the beginning there were only NFTs... but then the Volume team said "Let there be
                                perks!"<br/><br/>
                                &emsp;Perk levels is a value embedded into the AstroPunks and into future NFTs that will be
                                launched through the Volume INO.<br/><br/>
                                &emsp;These perks will grant the holder of the NFT special perks on all Volume products -
                                from discounts for lottery tickets to special abilities in the future games.
                                <br/><br/>
                            </p>
                        </Grid>
                        {!isMobile && <Grid item xs={5}>
                            <img src={'punks/Astropunks_3.png'} width={256} height={256} style={{
                                imageRendering: 'pixelated',
                            }}/>
                        </Grid>}
                    </Grid>
                </Grid>

            </Container>
        </Page>
    )
}

export default AstroPunks;