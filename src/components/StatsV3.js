import React, {useEffect, useState} from "react";
import { BigTitleCard, StatsCard } from "./LeaderBoardHome";
import {getFuelAddedForAddress, getTotalFuelAdded} from "../utils/volume-core";
import {useWallet} from "use-wallet";
import { formatLongNumber } from "../utils/Utilities";
const Big = require('big-js');

export const GlobalStats = () => {

    const wallet = useWallet();

    const [initGlobalStats, setInitGlobalStats] = useState(false);
    const [globalBlocks, setGlobalBlocks] = useState(new Big(0));
    const [globalSeconds, setGlobalSeconds] = useState(new Big(0));
    const [globalError, setGlobalError] = useState(false);

    const [initUserStats, setInitUserStats] = useState(false);
    const [userBlocks, setUserBlocks] = useState(new Big(0));
    const [userSeconds, setUserSeconds] = useState(new Big(0));
    const [userError, setUserError] = useState(false);

    useEffect(() => {
        if (!initGlobalStats) {
            // Fetch global stats
            getTotalFuelAdded().then((res) => {
                setGlobalBlocks(new Big(res).toFixed(4));
                setGlobalSeconds(new Big(res).times(3).toFixed(0).toString());
                //
            }).catch((err) => {
                setGlobalError(true);
            }).finally(() => {
                setInitGlobalStats(true);
            });
        }
    }, [initGlobalStats]);

    useEffect(() => {
        if (wallet.status === 'connected') {
            // Fetch the user stats here
            getFuelAddedForAddress(wallet.account).then((res) => {
                setUserBlocks(new Big(res).toFixed(4));
                setUserSeconds(new Big(res).times(3).toFixed(0).toString());
                // Set loading stats to false & initStats to true
            }).catch((err) => {
                setUserError(true);
            }).finally(() => {
                setInitUserStats(true);
            });
        }
    }, [wallet.status]);

    return (
        <>
            <BigTitleCard imoji={'💹'} title={'Global Stats'}/>
            <StatsCard
                statsTitles={['🛢️ Total fuel added:','⏳ Total Time Added:','🚀 Distance Traveled','🔥 $VOL burned','⛽ My fuel added:','⏱️ My Time Added:']}
                statsValues={[
                    initGlobalStats && !globalError ? formatLongNumber(globalBlocks , 2) + ' Blocks' : '????',
                    initGlobalStats && !globalError ? formatLongNumber(globalSeconds , 2) + ' Sec' : '????',
                    initGlobalStats && !globalError ? formatLongNumber(globalBlocks , 2) + ' Blocks' : '????',
                    initGlobalStats && !globalError ? formatLongNumber(globalBlocks , 2) + ' $VOL' : '????',
                    initUserStats && !userError ? formatLongNumber(userBlocks , 2) + ' Blocks' : '????',
                    initUserStats && !userError ? formatLongNumber(userSeconds , 2) + ' Sec' : '????',
                ]}
            />
        </>
    );
}