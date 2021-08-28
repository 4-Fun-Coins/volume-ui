import {makeStyles} from "@material-ui/core";
import PropTypes from "prop-types";
import TopBar from "./TopBar";
import Footer from "../../components/Root/Footer";
import React, {useEffect} from "react";
import {useLocation} from "react-router-dom";
import useVolume from "../../hooks/useVolume";
import LoadingScreen from "../../components/LoadingScreen";
import {ROUTES_NAMES} from "../../constants";

const mainLayoutStyle = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.default,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflow: "hidden",
        width: "100%"
    },
    content: {
        display: "flex",
        flex: "1 1 auto",
        height: "100%",
        justifyContent: 'center',
    },
}));

const MainLayout = ({children}) => {
    const classes = mainLayoutStyle();
    const location = useLocation();
    const volumeEcosystem = useVolume();

    useEffect(() => {
        // reset scroll position to top (user changed the page)
        window.scrollTo(0, 0)
    }, [location]);

    return (
        <div style={{backgroundColor: 'rgba(10, 10, 10, 0.2)'}}>
            <TopBar/>
            <div className={classes.content}>
                {volumeEcosystem.ecosystemStats.totalSupply || location.pathname === ROUTES_NAMES.HOME ? children :
                    <LoadingScreen transparent style={{height: '100vh'}}/>}
            </div>
            <div style={{height: '4em'}}/>
            <Footer/>
        </div>
    );
}

MainLayout.propTypes = {
    children: PropTypes.node
};

export default MainLayout;