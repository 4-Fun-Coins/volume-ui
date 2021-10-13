import React, {createContext, useEffect, useState} from 'react';
import {useWallet} from "use-wallet";
import {getFarms, getPending, getRealContract, getStaked} from "../utils/farm-core";
import {getAllowance, getBalance} from "../utils/erc20-core";

const {farmAddress, rpcUrl} = require('../utils/DeploymentConfig.js');
const {FarmABI} = require('../utils/farm-abi.js');
const {erc20ABI} = require('../utils/erc20-abi');
const FarmsContext = createContext({
    farms: null,
    useInfo: null,
    initFarms: null,
    updateUserInfos: null,
});

export const FarmsProvider = ({children}) => {
    const wallet = useWallet();
    const [farms, setFarms] = useState([]);
    const [useInfos, setUseInfos] = useState();

    useEffect(() => {
        initFarms()
    }, [wallet])

    useEffect(() => {
        updateUserInfos();
    }, [farms]);

    useEffect(() => {
        setUseInfos(null);
    }, [wallet.account]);

    const updateUserInfos = () => {
        setUseInfos(null);
        if (wallet.status === "connected" && farms) {
            Promise.all(farms.map(farmInfo => {
                return updateUserInfoForFarm(farmInfo);
            })).then(arr => setUseInfos(arr));
        }
    }

    const initFarms = async () => {
        const realFarmContract = await getRealContract(
            farmAddress,
            wallet && wallet.status === "connected" ? wallet.ethereum : rpcUrl,
            FarmABI
        )


        setFarms(
            await getFarms(
                realFarmContract,
                wallet && wallet.status === "connected" ? wallet.ethereum : rpcUrl
            )
        )
    }

    const updateUserInfoForFarm = async (farmArg) => {
        if (!wallet || !wallet.account) return {
            staked: 0,
            balance: 0
        }
        const erc20 = await getRealContract(farmArg.stakedToken.address, wallet.ethereum, erc20ABI);
        const farmContract = await getRealContract(farmAddress, wallet.ethereum, FarmABI);

        const staked = await getStaked(farmContract, farmArg.pid, wallet.account);
        const myShareRatio = Number(staked) / Number(farmArg.totalStaked);
        return {
            staked: staked,
            balance: await getBalance(erc20, wallet.account),
            pending: await getPending(farmContract, farmArg.pid, wallet.account),
            allowance: await getAllowance(erc20, wallet.account, farmAddress),
            shareRatio: myShareRatio,
            weeklyRewards: farmArg.totalRewardsPerWeek * myShareRatio
        }
    }

    return (
        <FarmsContext.Provider
            value={{
                farms,
                useInfos,
                initFarms,
                updateUserInfos
            }}
        >
            {children}
        </FarmsContext.Provider>
    );
};

export const FarmsConsumer = FarmsContext.Consumer;

export default FarmsContext;
