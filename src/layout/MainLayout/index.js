import {makeStyles} from "@material-ui/core";
import PropTypes from "prop-types";
import {UseWalletProvider} from "use-wallet";

const mainLayoutStyle = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.default,
        display: "flex",
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
    }
}));

const MainLayout = ({children}) => {
    const classes = mainLayoutStyle();

    return (
        <div>
            <UseWalletProvider
                chainId={56}
                connectors={{}}
                pollBalanceInterval={2000}
                pollBlockNumberInterval={5000}
            >
                <div className={classes.wrapper}>
                    <div className={classes.contentContainer}>
                        <div className={classes.content}>
                            {children}
                        </div>
                    </div>
                </div>
            </UseWalletProvider>

        </div>
    );
}

MainLayout.propTypes = {
    children: PropTypes.node
};

export default MainLayout;