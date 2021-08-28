import Page from "../../components/Root/Page";
import {Container, makeStyles} from "@material-ui/core";
import Hero from "../../components/Home/Hero";
import Features from "../../components/Home/Features";
import TokenDistribution from "../../components/Home/TokenDistribition";
import ProjectTimeline from "../../components/Home/ProjectTimeLine";
import React from "react";

const landingStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
    },
    contentBackground: {
        paddingBottom: 10,
    },
}));

const LandingPage = () => {
    const classes = landingStyles();

    return (
        <Page
            className={classes.root}
            title={'Home'}
        >
            <Container
                maxWidth={false}
                className={classes.contentBackground}
            >
                <Hero/>
                <Features/>
                <TokenDistribution/>
                <ProjectTimeline/>

            </Container>
        </Page>
    )
}

export default LandingPage;