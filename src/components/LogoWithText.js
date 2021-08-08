import Box from '@material-ui/core/Box';
import { makeStyles , Typography} from "@material-ui/core";
import {useHistory} from 'react-router-dom';
import { ROUTES_NAMES } from '../constants';

const styles = makeStyles((theme) => ({
    root : {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2,
        cursor: 'Pointer',
    },
    volText: {
        color: theme.palette.twinkle.main,
        fontSize: '1.5em',
    }
})
);

const LogoWithText = (props) => {
    const history = useHistory();
    const classes = styles();

    return (
        <Box className={classes.root} onClick={() => {history.push(ROUTES_NAMES.HOME)}}>
            <img src={'/logo_small.png'} width={'48'} height={'48'} alt={'logo'}/>
            <Typography variant="h6" className={classes.volText}>
                            Volume
            </Typography>
        </Box>
    )
}

export default LogoWithText;