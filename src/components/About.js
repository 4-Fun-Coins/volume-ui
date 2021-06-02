import {Container, makeStyles, Typography} from "@material-ui/core";
import GlobalStyles from "./GlobalStyles";

const aboutStyles = makeStyles((theme) => ({
    universeBackground: {
        backgroundColor: theme.palette.background.default,
        paddingBottom: 80,
        paddingTop: 80,
        height: '100vh',
        overflow: "hidden",
    }
}));

const About = () => {
    const classes = aboutStyles();

    return (
        <Container
            className={classes.universeBackground}
            maxWidth={false}
        >
            <Typography variant={"h1"} style={{color: "white"}}>
                ABOUT_HERE
            </Typography>
        </Container>
    )
}

export default About;