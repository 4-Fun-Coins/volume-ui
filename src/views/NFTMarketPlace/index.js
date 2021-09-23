import {Container, makeStyles} from "@material-ui/core";
import React from "react";
import Page from "../../components/Root/Page";
import Grid from "@material-ui/core/Grid";
import {CountDown} from "../../components/Countdown";
import Typography from "@material-ui/core/Typography";
import {themeColors} from "../../data/static/Colors";


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
        minHeight: '100vh'
    },
}));


const NFTMarketPlace = () => {
    const classes = useStyles();

    return (
        <Page
            className={classes.root}
            title={'NFT Market'}
        >
            <Container
                maxWidth={false}
                className={classes.contentBackground}
            >
                <Grid container>
                    <Grid item xs={12}>
                        <Typography variant={"h1"} color={"twinkle.main"}
                                    style={{
                                        marginTop: '2rem',
                                        marginBottom: 10,
                                        fontSize: '3em',
                                        color: themeColors.twinkle.main
                                    }}>
                            Volume NFT marketplace
                        </Typography>
                        <p style={{fontSize: 20}}>
                            The future of NFT trading is coming soon to Volume. Trade NFTs like never before!
                        </p>
                    </Grid>
                    <Grid item xs={12}>
                        <CountDown endDate={Date.now() + 1000 * 60 * 60 * 24 * 30 * 1.2} bgColor={'#000000aa'}
                                   unitColor={themeColors.text.paragraph}
                                   style={{marginTop: 100}}/>
                    </Grid>
                </Grid>

            </Container>
        </Page>
    )
}

export default NFTMarketPlace;