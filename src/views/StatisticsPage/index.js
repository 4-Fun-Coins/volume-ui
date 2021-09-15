import Page from "../../components/Root/Page";
import {Container, makeStyles} from "@material-ui/core";
import Dash from "../../components/Dashboard/Dash";

const styles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
    },
    contentBackground: {
        paddingBottom: 10,
        paddingTop: 80,
    }
}));

const StatisticsPage = () => {
    const classes = styles();


    return (
        <Page
            className={classes.root}
            title={'Dashboard'}
        >
            <Container
                maxWidth={'lg'}
                className={classes.contentBackground}
            >
                <Dash/>
            </Container>
        </Page>
    )
}

export default StatisticsPage;