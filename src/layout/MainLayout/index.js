import {makeStyles} from "@material-ui/core";
import PropTypes from "prop-types";
import TopBar from "./TopBar";
import Footer from "../../components/Footer";
import React, {useEffect, useRef} from "react";
import {useLocation} from "react-router-dom";

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

    useEffect(() => {
        // reset scroll position to top (user changed the page)
        window.scrollTo(0, 0)
    }, [location]);

    return (
        <div style={{backgroundColor: 'rgba(10, 10, 10, 0.2)'}}>
            <TopBar/>
            <div className={classes.content}>
                {children}
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