import React, { forwardRef, useCallback, useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import { Fade, Slide, Zoom } from "@material-ui/core";

const Page = forwardRef(({ children, title, ...rest }, ref) => {
    const location = useLocation();

    const sendPageViewEvent = useCallback(() => {
        // TODO Parse analytics add this page view
    }, []);

    useEffect(() => {
        sendPageViewEvent();
    }, [sendPageViewEvent]);

    return (
        <HelmetProvider>
            <div ref={ref} {...rest}>
                <Helmet>
                    <title>{"VOLUME | " + title}</title>
                </Helmet>
                <Fade direction={"up"} in={true} timeout={1000} mountOnEnter unmountOnExit>
                    <div>{children}</div>
                </Fade>
            </div>
        </HelmetProvider>
    );
});

Page.propTypes = {
    children: PropTypes.node.isRequired,
    title: PropTypes.string,
};

export default Page;
