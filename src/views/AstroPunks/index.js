import {Container, makeStyles} from "@material-ui/core";
import React from "react";
import Page from "../../components/Root/Page";
import Grid from "@material-ui/core/Grid";
import {CountDown} from "../../components/Countdown";
import Zoom from "@material-ui/core/Zoom";
import Typography from "@material-ui/core/Typography";


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
                        <Typography variant={"h1"} color={"primary"}
                                    style={{marginTop: '2rem', marginBottom: 10, fontSize: '3em'}}>
                            Volume NFT market place
                        </Typography>
                        <p style={{fontSize: 20}}>
                            AstroPunks is a collection of 10000 unique algorithmically generated NFT arts,That will be the official first NFT collection
                             on Volume, 
                        </p>
                    </Grid>
                    <Grid item xs={12}>
                        <CountDown endDate={Date.now() + 1000 * 60 * 60 * 24 * 30 * 1.2} bgColor={'#000000aa'}
                                   style={{marginTop: 100}}/>
                    </Grid>
                </Grid>

            </Container>
        </Page>
    )
}

export default NFTMarketPlace;