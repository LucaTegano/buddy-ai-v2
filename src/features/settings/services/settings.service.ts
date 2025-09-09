import { Personality } from '../types/Personality';

const getSettings = async () => {
  const settings = localStorage.getItem('userSettings');
  return settings ? JSON.parse(settings) : {};
};

const updateSettings = async (settings: {
  personality: Personality;
  customInstructions: string;
  customizationEnabled: boolean;
}) => {
  localStorage.setItem('userSettings', JSON.stringify(settings));
  return settings;
};

const settingsService = {
  getSettings,
  updateSettings,
};

export default settingsService;
