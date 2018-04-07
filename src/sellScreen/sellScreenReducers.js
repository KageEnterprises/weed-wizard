import {
  CANCEL_SALE,
  SEEDS_FOR_SALE,
  TOOLS_FOR_SALE,
  WEED_FOR_SALE }       from './sellScreenActions';
import SellScreenState  from './sellScreenState';

export default function forSale(state = SellScreenState, action = null) {
  let quantity, weed, tool;

  switch (action.type) {
    case CANCEL_SALE:
      return SellScreenState;

    case SEEDS_FOR_SALE:
      quantity = action.quantity;
      weed = action.weed;

      if (state.seeds.some(strain => strain.id === weed.id)) {
        const stateSeeds = state.seeds.map(strain => {
          return {
            ...strain,
            quantity: strain.id === weed.id ? quantity : strain.quantity
          };
        });

        return {
          ...state,
          seeds: stateSeeds
        };
      }

      return {
        ...state,
        seeds: [
          ...state.seeds,
          {
            ...weed,
            quantity
          }
        ]
      };

    case TOOLS_FOR_SALE:
      quantity = action.quantity;
      tool = action.tool;

      if (state.tools.some(stateTool => stateTool.id === tool.id)) {
        const stateTools = state.tools.map(stateTool => {
          return {
            ...stateTool,
            quantity: stateTool.id === tool.id ? quantity : stateTool.quantity
          };
        });

        return {
          ...state,
          tools: stateTools
        };
      }

      return {
        ...state,
        tools: [
          ...state.tools,
          {
            ...tool,
            quantity
          }
        ]
      };

    case WEED_FOR_SALE:
      quantity = action.quantity;
      weed = action.weed;

      if (state.weed.some(strain => strain.id === weed.id)) {
        const stateWeed = state.weed.map(strain => {
          return {
            ...strain,
            quantity: strain.id === weed.id ? quantity : strain.quantity
          };
        });

        return {
          ...state,
          weed: stateWeed
        };
      }

      return {
        ...state,
        weed: [
          ...state.weed,
          {
            ...weed,
            quantity
          }
        ]
      };

    default:
      return state;
  }
}
