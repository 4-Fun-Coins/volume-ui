import {Box, Container, Grid, makeStyles, Typography, useMediaQuery, useTheme} from "@material-ui/core";
import Chart from 'react-apexcharts';
import numeral from 'numeral';
import React from "react";

const tokenDistributionStyles = makeStyles((theme) => ({
    root: {
        padding: '8px',
    },
    BigTitles: {
        color: theme.palette.twinkle.main,
        padding: '8px !important',
        width: '100%',
        textAlign: 'center',
        fontSize: '4em',
        [theme.breakpoints.between('xs', 'sm')]: {
            fontSize: '2.5rem',
        }
    },
    BigBody: {
        //color : theme.palette.text.paragraph,
        marginTop: '12px',
        margin: 'auto',
        textAlign: 'justify',
        lineHeight: '1.5em',
        fontSize: '1.3rem',
        fontWeight: 400,
        color: '#d5d5d5',
        letterSpacing: '1px',
        [theme.breakpoints.between('xs', 'sm')]: {
            fontWeight: 400,
            fontSize: '0.9rem',
            letterSpacing: '1px',
        }
    },
    chartContainer: {
        textAlign: "center",
        alignItems: 'center',
        margin: 'auto',
        maxWidth: 500,
        [theme.breakpoints.between('md', 'xl')]: {
            minWidth: 450
        }
    }
}));

const TokenDistribution = ({reverse, ...rest}) => {
    const classes = tokenDistributionStyles();

    return (
        <Container maxWidth={'lg'} className={classes.root} rest>
            <Grid container alignItems={'center'}>
                <Grid item container xs={12} md={6} direction={'column'} spacing={2}>
                    <Grid item style={{width: '100%'}}>
                        <Typography variant={"h1"} className={classes.BigTitles}>
                            $VOL Token distribution
                        </Typography>
                        <Typography variant={"body1"} className={classes.BigBody}>
                            $VOL was built to be a fairly distributed token. There were no private or special selling
                            rounds. All the funds raised in the publicly accessible ICO are locked in the escrow and
                            provided as liquidity with no option of removing it - not even by the developers. $VOL
                            liquidity is therefore guaranteed.
                        </Typography>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <DistributionChart/>
                </Grid>
            </Grid>
            <div style={{margin: '6em'}}/>
        </Container>
    )
}
export default TokenDistribution;


const DistributionChart = () => {
    const classes = tokenDistributionStyles();
    const data = {
        series: [
            {
                color: '#67BFF6',
                data: 375000000,
                label: 'ICO',
                percentage: '37.5'
            },
            {
                color: '#08D4CB',
                data: 375000000,
                label: 'LP',
                percentage: '37.5'
            },
            {
                color: '#FFE375',
                data: 100000000,
                label: 'Rewards',
                percentage: '10'
            },
            {
                color: '#FFCBAD',
                data: 100000000,
                label: 'Dev Fund',
                percentage: '10'
            },
            {
                color: '#FC4E4E',
                data: 50000000,
                label: 'Marketing',
                percentage: '5'
            }
        ]
    };
    const theme = useTheme();
    const chartOptions = {
        chart: {
            background: 'transparent',
            stacked: false,
            toolbar: {
                show: false
            }
        },
        colors: data.series.map((item) => item.color),
        dataLabels: {
            enabled: false
        },
        labels: data.series.map((item) => item.label),
        legend: {
            show: false
        },
        stroke: {
            colors: [theme.palette.background.paper],
            width: 1
        }
    };
    const isMobile = useMediaQuery(theme.breakpoints.between('xs', 'sm'));

    const chartSeries = data.series.map((item) => item.data);

    return (
        <Box
            sx={{
                backgroundColor: 'transparent',
                display: 'flex',
                alignItems: 'center',
                alignContent: 'center'
            }}
        >
            {!isMobile && <Box sx={{flexGrow: 1}}/>}
            <Box className={classes.chartContainer}>
                <Chart
                    height="260"
                    options={chartOptions}
                    series={chartSeries}
                    type="donut"
                />
                {data.series.map((item) => (
                    <Box
                        key={item.label}
                        sx={{
                            alignItems: 'center',
                            display: 'flex',
                            p: 1,
                            margin: 'auto',
                        }}
                    >
                        <Box
                            sx={{
                                backgroundColor: item.color,
                                borderRadius: '50%',
                                height: 8,
                                width: 8,
                            }}
                        />
                        <Box sx={{
                            width: 8
                        }}/>
                        <Box sx={{minWidth: 100, textAlign: 'left'}}>
                            <Typography
                                color="textPrimary"
                                sx={{ml: 2}}
                                variant="body1"

                            >
                                {item.label}
                            </Typography></Box>
                        <Box sx={{flexGrow: 1}}>
                            {!isMobile && <Typography
                                color="textSecondary"
                                sx={{ml: 2}}
                                variant="body1"
                            >
                                {`(${numeral(item.percentage).format('00.0')}%)`}
                            </Typography>}
                        </Box>
                        <Typography
                            color="textSecondary"
                            sx={{ml: 2}}
                            variant="body1"
                        >
                            {numeral(item.data).format('0,0') + ` $VOL `}
                        </Typography>
                    </Box>
                ))}
            </Box>
        </Box>
    );
}