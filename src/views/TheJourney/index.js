import Page from "../../components/Page";
import {makeStyles} from "@material-ui/core";
import React from "react";
import JourneyHome from "../../components/Journey/Journey";

const journeyStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        minHeight: '100vh',
    },
    contentBackground: {
        paddingBottom: 10,
        paddingTop: 80,
    },
}));

const Journey = () => {
    const classes = journeyStyles();

    return (
        <Page
            className={classes.root}
            title={'The Journey'}
        >
            <JourneyHome className={classes.contentBackground}/>
        </Page>
    )
}

export default Journey;