import {makeStyles} from "@material-ui/core";
import PropTypes from "prop-types";
import TopBar from "./TopBar";

const mainLayoutStyle = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.default,
        display: "flex",
        flexDirection: "column",
        height: "100%",
        overflow: "hidden",
        width: "100%"
    },
    wrapper: {
        display: "flex",
        flex: "1 1 auto",
        overflow: "hidden",
    },
    contentContainer: {
        display: "flex",
        flex: "1 1 auto",
        overflow: "hidden"
    },
    content: {
        flex: "1 1 auto",
        height: "100%",
        overflow: "auto"
    },
}));

const MainLayout = ({children}) => {
    const classes = mainLayoutStyle();

    return (
        <div>
                <TopBar />
                <div className={classes.wrapper}>

                    <div className={classes.contentContainer}>
                        <div className={classes.content}>
                            {children}
                        </div>
                    </div>
                </div>
        </div>
    );
}

MainLayout.propTypes = {
    children: PropTypes.node
};

export default MainLayout;