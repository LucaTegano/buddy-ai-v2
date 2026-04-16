import { create } from 'zustand';
import settingsService from '../services/settings.service';
import { Personality } from '../types/Personality';
import { SettingsState } from '../types/SettingsState';

export const useSettingsStore = create<SettingsState>((set, get) => ({
  activeModal: null,
  personality: 'default',
  customInstructions: '',
  isCustomizationEnabled: false,
  theme: 'system',
  language: 'en',

  openModal: (modal) => {
    set({ activeModal: modal });
  },

  closeModal: () => {
    set({ activeModal: null });
  },

  setPersonality: (p) => set({ personality: p }),
  setCustomInstructions: (i) => set({ customInstructions: i }),
  setIsCustomizationEnabled: (e) => set({ isCustomizationEnabled: e }),
  setTheme: (t) => set({ theme: t }),
  setLanguage: (l) => set({ language: l }),

  loadUserSettings: async () => {
    try {
      const userSettings = await settingsService.getSettings();
      set({
        personality: userSettings.personality as Personality || 'default',
        customInstructions: userSettings.customInstructions || '',
        isCustomizationEnabled: userSettings.customizationEnabled || false,
        theme: userSettings.theme || 'system',
        language: userSettings.language || 'en',
      });
    } catch (error) {
      console.error('Failed to load user settings:', error);
    }
  },

  saveUserSettings: async () => {
    try {
      const { 
        personality, customInstructions, isCustomizationEnabled, theme, language } = get();
      await settingsService.updateSettings({
        personality,
        customInstructions,
        customizationEnabled: isCustomizationEnabled,
        theme,
        language,
      });
    } catch (error) {
      console.error('Failed to save user settings:', error);
      throw error;
    }
  },
}));
