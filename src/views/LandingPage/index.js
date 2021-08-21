import Page from "../../components/Page";
import {Container, Grid, makeStyles} from "@material-ui/core";
import Hero from "../../components/Home/Hero";
import Features from "../../components/Home/Features";
import TokenDistribution from "../../components/Home/TokenDistribition";
import ProjectTimeline from "../../components/Home/ProjectTimeLine";

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
            <Grid container item>
                <Container
                    maxWidth={false}
                    className={classes.contentBackground}
                >
                    <Hero/>
                    <Features/>
                </Container>

            </Grid>

            <Grid container item>
                <Container
                    maxWidth={false}
                    className={classes.contentBackground}
                >
                    <TokenDistribution/>
                </Container>

            </Grid>

            <Grid container item>
                <Container
                    maxWidth={false}
                    className={classes.contentBackground}
                >
                    {/* add project timeline here */}
                    <ProjectTimeline/>
                </Container>

            </Grid>
        </Page>
    )
}

export default LandingPage;