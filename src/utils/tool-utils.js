import { TOOLS } from './constants';

export function getToolById(id) {
  let res;
  TOOLS.forEach((tool) => {
    if (tool.id === id) {
      res = tool;
    }
  });
  return res;
}
