import {Grid, makeStyles, Divider} from "@material-ui/core";

export const cardStyles = makeStyles((theme) => ({
    cardGrid: {
        border: '1px solid rgba(255, 255, 255, 0.12)',
        borderRadius: '10px',
        background: 'linear-gradient(to top, #0A0A0AB2, #000000B2) !important',
        marginTop: '5px',
        fontFamily: 'monospace',
        color: '#A8A7A9',
    },
    cardGridTitle: {
        textAlign: 'center',
        width: '100%',
        color: '#e8c9ff',
        padding: '0.2em',
        [theme.breakpoints.between('xs', 'sm')]: {
            fontSize: '1.1rem',
        }
    },
    myrankSubText: {
        fontSize: '1.4rem',
        color: '#e8c9ff',
        [theme.breakpoints.between('xs', 'sm')]: {
            fontSize: '0.85rem',
        }
    },
    myRankValues: {
        fontSize: '2.2rem',
        [theme.breakpoints.between('xs', 'sm')]: {
            fontSize: '1.2rem',
            fontWeight: 'bold'
        }
    },
}));


export const BigTitleCard = ({imoji, title, ...rest}) => {
    const classes = cardStyles();
    return (
        <Grid item container className={classes.cardGrid} rest>
            <h1 className={classes.cardGridTitle}>
                {`${imoji}${imoji}${imoji}   ${title}   ${imoji}${imoji}${imoji}`}
            </h1>
        </Grid>
    )
}

export const StatsCard = ({statsTitles, statsValues}) => {
    const classes = cardStyles();

    const StatItem = ({title, statValue}) => {
        return (
            <Grid item container xs={6}>

                <Grid item xs={12} class={classes.myrankSubText}>
                    {title}
                </Grid>
                <Grid item xs={12} className={classes.myRankValues}>
                    {statValue}
                </Grid>

            </Grid>
        )
    }

    const MyDivider = () => <Grid item xs={12}>
        <Divider style={{height: '1px', backgroundColor: 'gray', margin: 10}}/>
    </Grid>

    return (
        <Grid item container className={classes.cardGrid} style={{padding: '0.8em',}}>
            {statsTitles.map((title, index, array) => {
                const hasDivider = index !== 0 && (index + 1) % 2 === 0 && index !== array.length - 1
                return (
                    <>
                        <StatItem title={statsTitles[index]} statValue={statsValues[index]}/>
                        {hasDivider && <MyDivider/>}
                    </>
                )
            })}
        </Grid>
    )
}