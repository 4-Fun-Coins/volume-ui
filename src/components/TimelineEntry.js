import {Grid, makeStyles, Paper} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {TimelineContent} from "@material-ui/lab";

const timelineStyles = makeStyles((theme) => ({
    paper: {
        padding: '6px 16px',
        backgroundColor: "#1d0134",
        borderRadius: 12,
    },
    heading: {
        color: theme.palette.twinkle.main,
        padding: '0.2em'
    },
    text: {
        color: theme.palette.text.paragraph,
        padding: '0.2em',
        textAlign: "center"
    }
}));

const TimelineEntry = ({heading, text}) => {
    const classes = timelineStyles();

    return (
        <TimelineContent>
            <Paper elevation={3} className={classes.paper}>
                <Grid container>
                    <Grid container item xs={12} justify={"center"}>
                        <Typography variant="h3" className={classes.heading}>
                            {heading}
                        </Typography>
                    </Grid>

                    <Grid item>
                        <Typography variant={"h4"} className={classes.text}>
                            {text}
                        </Typography>
                    </Grid>
                </Grid>

            </Paper>
        </TimelineContent>
    )
}

export default TimelineEntry;