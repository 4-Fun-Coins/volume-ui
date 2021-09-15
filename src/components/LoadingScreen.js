import React, {useEffect} from "react";
import NProgress from 'nprogress';
import {makeStyles} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    root: {
        alignItems: "center",
        backgroundColor: theme.palette.background.default,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "center",
        minHeight: "100%",
        padding: theme.spacing(3)
    },
    rootTransparent: {
        alignItems: "center",
        backgroundColor: "transparent",
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "center",
        minHeight: "100%",
        padding: theme.spacing(3)
    },
    progress: {
        marginBottom: "2em"
    }
}));

const LoadingScreen = ({transparent, style, ...rest}) => {
    const classes = useStyles();

    useEffect(() => {
        NProgress.start();

        return () => {
            NProgress.done();
        }
    }, []);

    return (
        <div className={transparent ? classes.rootTransparent : classes.root} style={style} {...rest}>
            <img src={'/pacman.svg'} style={{backgroundColor: "transparent"}} width={128} height={128}/>
        </div>
    );
};

export default LoadingScreen;