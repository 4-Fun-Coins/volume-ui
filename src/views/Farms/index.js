import Page from "../../components/Root/Page";
import {Container, makeStyles} from "@material-ui/core";
import React, {useEffect} from "react";
import Typography from "@material-ui/core/Typography";
import useFarms from "../../hooks/useFarms";
import FarmCard from "./FarmCard";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import {themeColors} from "../../data/static/Colors";

const FarmsStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
    },
    contentBackground: {
        paddingTop: 72,
        paddingBottom: 10,
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        alignItems: "center",
        height: '100%',
        justifyContent: 'center',
    },
    farmsContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        gap: "24px",
        justifyContent: 'center',
        width: "100%"
    }
}));

const LandingPage = () => {
    const classes = FarmsStyles();
    const {farms, useInfos,initFarms} = useFarms();

    useEffect(() => {
        initFarms();
    },[])

    return (
        <Page
            className={classes.root}
            title={'Farms'}
        >
            <Container
                maxWidth={"xl"}
                className={classes.contentBackground}
            >
                <Typography variant={"h1"}
                            style={{width: "100%", textAlign: "center", color: themeColors.twinkle.main, margin: 24}}>
                    Volume Farms
                </Typography>
                <Typography variant={"body1"}
                            style={{width: "100%", textAlign: "center", color: 'white', marginBottom: 48}}>
                    Volume holders and Volume liquidity providers can enjoy great APYs on our farms! Thank you for helping
                    the ecosystem!
                </Typography>
                <Box className={classes.farmsContainer}>
                    {farms && farms.map((farm, index) => {
                        return (
                            <FarmCard farm={farm} key={index} userInfo={useInfos ? useInfos[index] : null}/>
                        )
                    })}
                </Box>

            </Container>
        </Page>
    )
}

export default LandingPage;