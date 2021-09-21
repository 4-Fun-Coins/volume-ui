import React, {createContext, useEffect, useState} from 'react';
import {
    blockToDate, getActiveMilestone,
    getAllMilestones, getAverageBlockTime,
    getBalanceForAddress, getClaimableWinnings,
    getCurrentBlock,
    getCurrentTotalSupply,
    getFuel, getFuelAddedForAddress, getTakeOffBlock, getTotalFuelAdded
} from "../utils/volume-core";
import {getFormattedTimePeriod} from "../utils/Utilities";

const VolumeContext = createContext({
    milestones: null,
    userStats: null,
    ecosystemStats: null,
    setWallet: null,
    refreshUserStats: null,
    refreshMilestones: null,
    refreshEcosystemStats: null
});

export const VolumeProvider = ({children}) => {
    const [wallet, setWallet] = useState();
    const [milestones, setMilestones] = useState(null);

    const [userStats, setUserStats] = useState({
        volumeBalance: null,
        totalFuelSupplied: null,
        totalSecAdded: null,
        milestonesStats: null, // fuelSupplied, rank , winner , milestone book
        claimableRewards: null,
    });
    const [ecosystemStats, setEcosystemStats] = useState({
        totalSupply: null,
        takeoffBlock: null,
        tookOff: null,
        burntToken: null,
        flyingDistance: null,
        flightTime: null,
        flightTimeFormatted: null,
        fuelTank: null,
        fuelAdded: null,
        timeAdded: null,
        estimatedDateFuelOut: null,
        tokenPrice: null,
        timeLeft: null,
        activeMilestone: null
    });

    useEffect(() => {
        if (!milestones) {
            refreshMilestones();
        }
    }, []);

    useEffect(() => {
        refreshEcosystemStats();
    }, [milestones]);


    useEffect(() => {
        if (wallet && wallet.account) {
            refreshUserStats();
        }
    }, [wallet]);

    const refreshEcosystemStats = () => {
        if (!milestones) {
            refreshMilestones();
            return;
        }
        getCurrentTotalSupply().then(async totalSupply => {

                getCurrentBlock().then(async block => {
                    const flightTime = milestones[0] ? await blockToDate(block) - await blockToDate(milestones[0].startBlock) : 0;
                    const fuelTank = Number(await getFuel());
                    const eta = await blockToDate(Number(block) + Number(fuelTank));
                    const fuelAdded = await getTotalFuelAdded();
                    const takeoffBlock = await getTakeOffBlock()
                    setEcosystemStats({
                        ...ecosystemStats,
                        totalSupply: totalSupply,
                        takeoffBlock: Number(await getTakeOffBlock()),
                        tookOff: takeoffBlock != 0 && takeoffBlock <= block,
                        burntToken: (1000000000 * 10 ** 18 - totalSupply) / 10 ** 18,
                        flyingDistance: milestones[0] ? block - milestones[0].startBlock : 0,
                        flightTime: flightTime * 1000,
                        flightTimeFormatted: getFormattedTimePeriod(flightTime * 1000),
                        fuelTank: fuelTank,
                        fuelAdded: fuelAdded,
                        timeAdded: fuelAdded * await getAverageBlockTime(),
                        estimatedDateFuelOut: eta,
                        timeLeft: getFormattedTimePeriod(eta * 1000 - Date.now()),
                        activeMilestone: await getActiveMilestone()
                    });


                });
            }
        );


    }


    const refreshMilestones = () => {
        getAllMilestones().then(milestones => {
            setMilestones(milestones.slice(1, milestones.length));
        });
    }

    const refreshUserStats = async () => {
        if (!wallet || !wallet.account)
            return;

        const balance = await getBalanceForAddress(wallet.account);
        const fuelAdded = await getFuelAddedForAddress(wallet.account);
        const winnings = await getClaimableWinnings(wallet.account);

        if (!milestones) {
            refreshMilestones();
        }
        let userMilestones;
        if (milestones) {
            userMilestones = milestones.map(milestone => {
                let fuelAdded = 0;
                let winningAmount = 0;
                milestone.participants.forEach((participant => {
                    if (participant.address === wallet.account)
                        fuelAdded = participant.fuelAdded
                }));
                milestone.winners.forEach(winner => {
                    if (winner === wallet.account)
                        winningAmount = winner.amount;
                });

                return {
                    milestoneId: milestone.startBlock,
                    fuelAdded,
                    winningAmount
                }
            });
        }
        setUserStats({
            ...setUserStats,
            volumeBalance: balance,
            totalFuelSupplied: fuelAdded,
            totalSecAdded: fuelAdded * await getAverageBlockTime(),
            milestonesStats: userMilestones,
            claimableRewards: winnings,
        })
    }

    return (
        <VolumeContext.Provider
            value={{
                milestones,
                userStats,
                ecosystemStats,
                setWallet,
                refreshUserStats,
                refreshMilestones,
                refreshEcosystemStats
            }}
        >
            {children}
        </VolumeContext.Provider>
    );
};

export const VolumeConsumer = VolumeContext.Consumer;

export default VolumeContext;
