import { getStrainById } from '../utils/weedUtils';

const initialPlayerState = () => {
  const strainProps = getStrainById(0);
  const strainProps1 = getStrainById(1);
  const strainProps2 = getStrainById(2);
  const strainProps3 = getStrainById(3);
  const strainProps4 = getStrainById(4);

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
        seeds: 4
      },
      {
        ...strainProps1,
        id: 1,
        quantity: 0.125, // in ozs
        selected: false,
        seeds: 4
      },
      {
        ...strainProps2,
        id: 2,
        quantity: 0.125, // in ozs
        selected: false,
        seeds: 4
      },
      {
        ...strainProps3,
        id: 3,
        quantity: 0.125, // in ozs
        selected: false,
        seeds: 4
      },
      {
        ...strainProps4,
        id: 4,
        quantity: 0.125, // in ozs
        selected: false,
        seeds: 4
      }
    ]
  };
};

export default initialPlayerState();
