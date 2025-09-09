// Settings Service
import httpClient from './httpClient';
import { API_ENDPOINTS } from './apiConfig';

export interface UserSettings {
  id?: number;
  theme: string;
  language: string;
  personality: string;
  customInstructions: string;
  customizationEnabled: boolean;
}

class SettingsService {
  async getSettings(): Promise<UserSettings> {
    try {
      return await httpClient.get<UserSettings>(API_ENDPOINTS.SETTINGS.GET);
    } catch (error) {
      // Return default settings if none exist
      return {
        theme: 'light',
        language: 'en',
        personality: 'default',
        customInstructions: '',
        customizationEnabled: false,
      };
    }
  }

  async updateSettings(settings: UserSettings): Promise<UserSettings> {
    return await httpClient.put<UserSettings>(API_ENDPOINTS.SETTINGS.UPDATE, settings);
  }
}

export default new SettingsService();