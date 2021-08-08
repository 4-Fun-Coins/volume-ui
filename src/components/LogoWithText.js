import Box from '@material-ui/core/Box';
import { makeStyles , Typography} from "@material-ui/core";

const styles = makeStyles((theme) => ({
    root : {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2
    },
    volText: {
        color: theme.palette.twinkle.main,
        fontSize: '1.5em',
    }
})
);

const LogoWithText = (props) => {
    const classes = styles();

    return (
        <Box className={classes.root}>
            <img src={'/logo_small.png'} width={'48'} height={'48'} alt={'logo'}/>
            <Typography variant="h6" className={classes.volText}>
                            Volume
            </Typography>
        </Box>
    )
}

export default LogoWithText;