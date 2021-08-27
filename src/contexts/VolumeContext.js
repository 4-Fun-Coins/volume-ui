import React, {createContext, useEffect, useState} from 'react';
import {getAllMilestones, getCurrentTotalSupply} from "../utils/volume-core";

const VolumeContext = createContext({
    milestones: null,
    userStats: null,
    ecosystemStats: null,
    setWallet: null
});

export const VolumeProvider = ({children}) => {
    const [wallet, setWallet] = useState();
    const [milestones, setMilestones] = useState(null);

    const [userStats, setUserStats] = useState({
        volumeBalance: null,
        totalFuelSupplied: null,
        milestonesStats: null, // fuelSupplied, rank , winner , milestone book
        claimableRewards: null,
    });
    const [ecosystemStats, setEcosystemStats] = useState({
        totalSupply: null,
        burntToken: null,
        flyingDistance: null,
        tokenPrice: null,
    });

    useEffect(() => {
        if (!milestones) {
            refreshMilestones();
        }
    }, []);

    useEffect(() => {
        if (milestones) {
            getCurrentTotalSupply();
        }
    }, [milestones])

    const refreshMilestones = () => {
        getAllMilestones().then(milestones => {
            setMilestones(milestones.slice(1, milestones.length));
        });
    }


    return (
        <VolumeContext.Provider
            value={{
                milestones,
                userStats,
                ecosystemStats,
                setWallet
            }}
        >
            {children}
        </VolumeContext.Provider>
    );
};

export const VolumeConsumer = VolumeContext.Consumer;

export default VolumeContext;
