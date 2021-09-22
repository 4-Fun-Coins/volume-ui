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
                    statsTitles={['🗓️ Active Milestone', '💰 Jackpot Amount', '🛢️ Total fuel added:', '⏳ Total Time Added:', '🚀 Distance Traveled', '🔥 $VOL burned']}
                    statsValues={[
                        volume.ecosystemStats.activeMilestone ? volume.ecosystemStats.activeMilestone.name : '????',
                        volume.ecosystemStats.activeMilestone ? formatLongNumber((volume.ecosystemStats.activeMilestone.amountInPot / 10 ** 18), 2) + ' $VOL' : '????',
                        volume.ecosystemStats.fuelAdded ? formatLongNumber(volume.ecosystemStats.fuelAdded, 2) + ' Blocks' : '????',
                        volume.ecosystemStats.timeAdded ? formatLongNumber(volume.ecosystemStats.timeAdded, 2) + ' Sec' : '????',
                        volume.ecosystemStats.flyingDistance ? formatLongNumber(volume.ecosystemStats.flyingDistance, 2) + ' Blocks' : '????',
                        volume.ecosystemStats.burntToken ? formatLongNumber(volume.ecosystemStats.burntToken, 2) + ' $VOL' : '????',
                    ]}
                />
            </Grid>
        </>
    );
}