import Page from "../../components/Page";
import {Container, Grid, makeStyles} from "@material-ui/core";
import Dash from "../../components/Dash";

const landingStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh'
    },
    contentBackground: {
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
            <Grid container item>
                <Container
                    maxWidth={false}
                    className={classes.contentBackground}
                >
                    <Dash/>
                </Container>
            </Grid>
        </Page>
    )
}

export default StatisticsPage;