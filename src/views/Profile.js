import Page from "../components/Page";
import {Container, makeStyles} from "@material-ui/core";


const styles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
    },
    contentBackground: {
        paddingBottom: 10,
        paddingTop: 80,
        backgroundColor: 'rgba(10, 10, 10, 0.6)',
        [theme.breakpoints.down('md')]: {
            display: 'flex',
            height: '100%',
        },
        [theme.breakpoints.up('md')]: {
            height: '100vh'
        }
    },
    paper: {
        padding: '6px 16px',
        backgroundColor: "#1d0134",
        borderRadius: 12,
    },
}));

const Profile = () => {
    const classes = styles();

    return (
        <Page
            className={classes.root}
            title={'User Profile'}
        >
            <Container className={classes.contentBackground} maxWidth={"xl"}>
                <h1 style={{color: 'white'}}>Profile Here</h1>
            </Container>
        </Page>
    )
}

export default Profile;