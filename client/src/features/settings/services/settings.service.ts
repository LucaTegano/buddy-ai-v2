import apiClient from '@/shared/api/apiClient';
import { Personality } from '../types/Personality';

const getSettings = async () => {
  try {
    const response = await apiClient.get('/users/me');
    const user = response.data;
    return {
      personality: user.personality,
      customInstructions: user.customInstructions,
      customizationEnabled: user.customizationEnabled,
      theme: user.theme,
      language: user.language,
    };
  } catch (error) {
    console.warn('Failed to fetch settings from backend, falling back to localStorage:', error);
    const settings = localStorage.getItem('userSettings');
    return settings ? JSON.parse(settings) : {};
  }
};

const updateSettings = async (settings: {
  personality: Personality;
  customInstructions: string;
  customizationEnabled: boolean;
  theme?: string;
  language?: string;
}) => {
  try {
    await apiClient.put('/users/settings', settings);
  } catch (error) {
    console.error('Failed to update settings in backend:', error);
    throw error; // Re-throw to ensure the store can catch it
  }
  
  // Also keep localStorage updated for persistence between logins if needed
  localStorage.setItem('userSettings', JSON.stringify(settings));
  return settings;
};

const settingsService = {
  getSettings,
  updateSettings,
};

export default settingsService;
