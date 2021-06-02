import {Container, makeStyles, Typography} from "@material-ui/core";
import GlobalStyles from "./GlobalStyles";

const statsStyles = makeStyles((theme) => ({
    universeBackground: {
        backgroundColor: theme.palette.background.default,
        paddingBottom: 80,
        paddingTop: 80,
        height: '100vh',
        overflow: "hidden",
    }
}));

const Stats = () => {
    const classes = statsStyles();

    return (
        <Container
            className={classes.universeBackground}
            maxWidth={false}
        >
            <Typography variant={"h1"} style={{color: "white"}}>
                STATS_HERE
            </Typography>
        </Container>
    )
}

export default Stats;