import {useContext} from 'react';
import VolumeContext from "../contexts/VolumeContext";

const useVolume = () => useContext(VolumeContext);

export default useVolume;