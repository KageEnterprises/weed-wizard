import { getStrainById } from '../utils/weedUtils';

const initialPlayerState = () => {
  const strainProps = getStrainById(0);

  return {
    highness: 0,
    money: 0,
    tools: [
      {
        id: 0,
        quantity: 1,
        selected: true
      }
    ],
    weed: [
      {
        ...strainProps,
        id: 0,
        quantity: 0.125, // in ozs
        selected: true,
        seeds: 0
      }
    ]
  };
};

export default initialPlayerState();
