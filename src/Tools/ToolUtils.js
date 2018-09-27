import TOOLS from './ToolList';

export const getToolById = id => {
  return TOOLS.find(TOOL => TOOL.id === id);
};