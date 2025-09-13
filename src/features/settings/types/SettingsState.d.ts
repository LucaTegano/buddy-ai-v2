import { Personality } from "./Personality";

export type Theme = 'light' | 'dark';
export type ActiveModal = 'settings' | null;

export interface SettingsState {
  activeModal: ActiveModal;
  personality: Personality;
  customInstructions: string;
  isCustomizationEnabled: boolean;
  openModal: (modal: NonNullable<ActiveModal>) => void;
  closeModal: () => void;
  setPersonality: (p: Personality) => void;
  setCustomInstructions: (i: string) => void;
  setIsCustomizationEnabled: (e: boolean) => void;
  loadUserSettings: () => Promise<void>;
  saveUserSettings: () => Promise<void>;
}