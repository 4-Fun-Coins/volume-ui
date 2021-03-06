import Page from "../../components/Page";
import {Container, makeStyles} from "@material-ui/core";
import About from "../../components/About";
import Footer from "../../components/Footer";
import NewSpace from "../../components/NewSpace";
import Dash from "../../components/Dash";

const landingStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%'
    },
    universeBackground: {
        position: "fixed",
        zIndex: -1,
        filter: 'blur(3px)'
    },
    contentBackground: {
        backgroundColor: 'rgba(10, 10, 10, 0.6)',
        paddingBottom: 10,
        paddingTop: 80,
    },
    footerBackground: {
        backgroundColor: 'rgba(10, 10, 10, 0.3)',
        paddingBottom: 10,
        width: '100%'
    }
}));

const LandingPage = () => {
    const classes = landingStyles();

    return (
        <Page
            className={classes.root}
            title={'Home'}
        >
            <div className={classes.universeBackground}>
                <NewSpace />
            </div>

            <Container
                maxWidth={false}
                className={classes.contentBackground}
            >
                <About/>
            </Container>

            <Container
                maxWidth={false}
                className={classes.contentBackground}
            >
                <Dash/>
            </Container>

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