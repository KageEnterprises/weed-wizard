import { getStrainById } from '../utils/weedUtils';

const initialPlayerState = () => {
  const strainProps = getStrainById(0);

  return {
    weed: [
      {
        ...strainProps,
        id: 0,
        quantity: 0.125, // in ozs
        selected: true,
        seeds: 0
      }
    ],
    tools: [
      {
        id: 0,
        quantity: 1,
        selected: true
      }
    ],
    highness: 0
  };
};

export default initialPlayerState();
