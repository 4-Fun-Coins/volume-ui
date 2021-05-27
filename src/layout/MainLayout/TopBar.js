import {AppBar, IconButton, makeStyles, Toolbar, Typography, Box} from "@material-ui/core";
import {AccountBalanceWallet} from "@material-ui/icons";
import clsx from "clsx";
import {Link as RouterLink} from "react-router-dom";
import Logo from "../../components/Logo";

const topBarStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.default
    },
    toolBar: {
        height: 72
    },
    logo: {
        marginRight: theme.spacing(2)
    },
    topBarText: {
        color: theme.palette.twinkle.main
    },
    priceContainer: {
        display: "flex",
        justifyContent: "flex-end"
    },
}));

const TopBar = ({className, ...rest}) => {
    const classes = topBarStyles();

    const connectWallet = () => {

    }

    return (
        <AppBar
            color={"primary"}
            className={clsx(classes.root, className)}
            {...rest}
        >
            <Toolbar className={classes.toolBar}>
                <RouterLink to={"/"}>
                    {/*<Logo className={classes.logo}/>*/}
                </RouterLink>
                <Typography variant={"subtitle1"} className={classes.topBarText}>
                    VOLUME
                </Typography>
                <Box flexGrow={1} className={classes.priceContainer}>
                    <Typography variant={"h4"} className={classes.topBarText}>
                        Price: $1.27
                    </Typography>
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default TopBar;