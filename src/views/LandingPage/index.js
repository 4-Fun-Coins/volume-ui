import Page from "../../components/Page";
import {Container, Grid, makeStyles} from "@material-ui/core";
import About from "../../components/About";
import Footer from "../../components/Footer";
import Dash from "../../components/Dash";
import {useEffect, useState} from "react";

const landingStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
    },
    contentBackground: {
        backgroundColor: 'rgba(10, 10, 10, 0.6)',
        paddingBottom: 10,
        paddingTop: 80,
    },
}));

const LandingPage = () => {
    const classes = landingStyles();

    return (
        <Page
            className={classes.root}
            title={'Home'}
        >
            <Grid container item>
                <Container
                    maxWidth={false}
                    className={classes.contentBackground}
                >
                    <About/>
                </Container>

            </Grid>

            <Container
                maxWidth={false}
                className={classes.contentBackground}
            >
                <Footer/>
            </Container>
        </Page>
    )
}

export default LandingPage;