import React from "react";
import {BigTitleCard, cardStyles, StatsCard} from "../Cards";
import {formatLongNumber} from "../../utils/Utilities";
import {Grid} from "@material-ui/core";
import useVolume from "../../hooks/useVolume";

export const GlobalStats = () => {
    const volume = useVolume();
    const cardClasses = cardStyles();

    return (
        <>
            <BigTitleCard imoji={'💹'} title={'Global Stats'} card/>
            <Grid item container className={cardClasses.cardGrid} style={{padding: '0.8em',}}>
                <StatsCard
                    statsTitles={['🛢️ Total fuel added:', '⏳ Total Time Added:', '🚀 Distance Traveled', '🔥 $VOL burned', '⛽ My fuel added:', '⏱️ My Time Added:']}
                    statsValues={[
                        volume.ecosystemStats.fuelAdded ? formatLongNumber(volume.ecosystemStats.fuelAdded, 2) + ' Blocks' : '????',
                        volume.ecosystemStats.timeAdded ? formatLongNumber(volume.ecosystemStats.timeAdded, 2) + ' Sec' : '????',
                        volume.ecosystemStats.flyingDistance ? formatLongNumber(volume.ecosystemStats.flyingDistance, 2) + ' Blocks' : '????',
                        volume.ecosystemStats.burntToken ? formatLongNumber(volume.ecosystemStats.burntToken, 2) + ' $VOL' : '????',
                        volume.userStats.totalFuelSupplied ? formatLongNumber(volume.userStats.totalFuelSupplied, 2) + ' Blocks' : '????',
                        volume.userStats.totalFuelSupplied ? formatLongNumber((volume.userStats.totalSecAdded), 2) + ' Sec' : '????',
                    ]}
                />
            </Grid>
        </>
    );
}