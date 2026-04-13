import { create } from 'zustand';
import settingsService from '../services/settings.service';
import { Personality } from '../types/Personality';
import { SettingsState } from '../types/SettingsState';

export const useSettingsStore = create<SettingsState>((set, get) => ({
  activeModal: null,
  personality: 'default',
  customInstructions: '',
  isCustomizationEnabled: false,

  openModal: (modal) => {
    set({ activeModal: modal });
  },

  closeModal: () => {
    set({ activeModal: null });
  },

  setPersonality: (p) => set({ personality: p }),
  setCustomInstructions: (i) => set({ customInstructions: i }),
  setIsCustomizationEnabled: (e) => set({ isCustomizationEnabled: e }),

  loadUserSettings: async () => {
    try {
      const userSettings = await settingsService.getSettings();
      set({
        personality: userSettings.personality as Personality || 'default',
        customInstructions: userSettings.customInstructions || '',
        isCustomizationEnabled: userSettings.customizationEnabled || false,
      });
    } catch (error) {
      console.error('Failed to load user settings:', error);
    }
  },

  saveUserSettings: async () => {
    try {
      const { 
        personality, customInstructions, isCustomizationEnabled } = get();
      await settingsService.updateSettings({
        personality,
        customInstructions,
        customizationEnabled: isCustomizationEnabled,
      });
    } catch (error) {
      console.error('Failed to save user settings:', error);
      throw error; // Re-throw to be handled by the UI
    }
  },
}));
