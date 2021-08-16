import Page from "../../components/Page";
import {Container, Grid, makeStyles} from "@material-ui/core";
import Footer from "../../components/Footer";
import Dash from "../../components/Dash";

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
    }
}));

const StatisticsPage = () => {
    const classes = landingStyles();


    return (
        <Page
            className={classes.root}
            title={'Dashboard'}
        >
            <Grid container item >
                <Container
                    maxWidth={false}
                    className={classes.contentBackground}
                >
                    <Dash/>
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

export default StatisticsPage;