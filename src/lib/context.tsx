/**
 * Professional Context Library
 * React Context providers and hooks for global state management
 */

'use client';

import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { MedicalImage, QualityMetric } from './types';

// Theme Context
interface ThemeContextType {
  theme: 'light' | 'dark' | 'system';
  setTheme: (theme: 'light' | 'dark' | 'system') => void;
  resolvedTheme: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Medical Imaging Context
interface MedicalImagingState {
  currentImage: MedicalImage | null;
  comparisonImages: MedicalImage[];
  qualityMetrics: QualityMetric[];
  isLoading: boolean;
  error: string | null;
}

type MedicalImagingAction =
  | { type: 'SET_CURRENT_IMAGE'; payload: MedicalImage }
  | { type: 'ADD_COMPARISON_IMAGE'; payload: MedicalImage }
  | { type: 'REMOVE_COMPARISON_IMAGE'; payload: string }
  | { type: 'SET_QUALITY_METRICS'; payload: QualityMetric[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'RESET_STATE' };

const initialMedicalImagingState: MedicalImagingState = {
  currentImage: null,
  comparisonImages: [],
  qualityMetrics: [],
  isLoading: false,
  error: null
};

function medicalImagingReducer(
  state: MedicalImagingState,
  action: MedicalImagingAction
): MedicalImagingState {
  switch (action.type) {
    case 'SET_CURRENT_IMAGE':
      return {
        ...state,
        currentImage: action.payload,
        error: null
      };
    case 'ADD_COMPARISON_IMAGE':
      return {
        ...state,
        comparisonImages: [...state.comparisonImages, action.payload],
        error: null
      };
    case 'REMOVE_COMPARISON_IMAGE':
      return {
        ...state,
        comparisonImages: state.comparisonImages.filter(
          img => img.id !== action.payload
        )
      };
    case 'SET_QUALITY_METRICS':
      return {
        ...state,
        qualityMetrics: action.payload,
        error: null
      };
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        isLoading: false
      };
    case 'RESET_STATE':
      return initialMedicalImagingState;
    default:
      return state;
  }
}

interface MedicalImagingContextType {
  state: MedicalImagingState;
  dispatch: React.Dispatch<MedicalImagingAction>;
  // Helper functions
  setCurrentImage: (image: MedicalImage) => void;
  addComparisonImage: (image: MedicalImage) => void;
  removeComparisonImage: (imageId: string) => void;
  setQualityMetrics: (metrics: QualityMetric[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  resetState: () => void;
}

const MedicalImagingContext = createContext<MedicalImagingContextType | undefined>(undefined);

export const useMedicalImaging = () => {
  const context = useContext(MedicalImagingContext);
  if (context === undefined) {
    throw new Error('useMedicalImaging must be used within a MedicalImagingProvider');
  }
  return context;
};

export const MedicalImagingProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(medicalImagingReducer, initialMedicalImagingState);

  const setCurrentImage = (image: MedicalImage) => {
    dispatch({ type: 'SET_CURRENT_IMAGE', payload: image });
  };

  const addComparisonImage = (image: MedicalImage) => {
    dispatch({ type: 'ADD_COMPARISON_IMAGE', payload: image });
  };

  const removeComparisonImage = (imageId: string) => {
    dispatch({ type: 'REMOVE_COMPARISON_IMAGE', payload: imageId });
  };

  const setQualityMetrics = (metrics: QualityMetric[]) => {
    dispatch({ type: 'SET_QUALITY_METRICS', payload: metrics });
  };

  const setLoading = (loading: boolean) => {
    dispatch({ type: 'SET_LOADING', payload: loading });
  };

  const setError = (error: string | null) => {
    dispatch({ type: 'SET_ERROR', payload: error });
  };

  const resetState = () => {
    dispatch({ type: 'RESET_STATE' });
  };

  const value: MedicalImagingContextType = {
    state,
    dispatch,
    setCurrentImage,
    addComparisonImage,
    removeComparisonImage,
    setQualityMetrics,
    setLoading,
    setError,
    resetState
  };

  return (
    <MedicalImagingContext.Provider value={value}>
      {children}
    </MedicalImagingContext.Provider>
  );
};

// UI State Context
interface UIState {
  sidebarOpen: boolean;
  modalOpen: boolean;
  currentModal: string | null;
  notifications: Notification[];
  isComparisonMode: boolean;
}

interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  duration?: number;
}

type UIAction =
  | { type: 'TOGGLE_SIDEBAR' }
  | { type: 'SET_SIDEBAR'; payload: boolean }
  | { type: 'OPEN_MODAL'; payload: string }
  | { type: 'CLOSE_MODAL' }
  | { type: 'ADD_NOTIFICATION'; payload: Notification }
  | { type: 'REMOVE_NOTIFICATION'; payload: string }
  | { type: 'TOGGLE_COMPARISON_MODE' }
  | { type: 'SET_COMPARISON_MODE'; payload: boolean };

const initialUIState: UIState = {
  sidebarOpen: false,
  modalOpen: false,
  currentModal: null,
  notifications: [],
  isComparisonMode: false
};

function uiReducer(state: UIState, action: UIAction): UIState {
  switch (action.type) {
    case 'TOGGLE_SIDEBAR':
      return {
        ...state,
        sidebarOpen: !state.sidebarOpen
      };
    case 'SET_SIDEBAR':
      return {
        ...state,
        sidebarOpen: action.payload
      };
    case 'OPEN_MODAL':
      return {
        ...state,
        modalOpen: true,
        currentModal: action.payload
      };
    case 'CLOSE_MODAL':
      return {
        ...state,
        modalOpen: false,
        currentModal: null
      };
    case 'ADD_NOTIFICATION':
      return {
        ...state,
        notifications: [...state.notifications, action.payload]
      };
    case 'REMOVE_NOTIFICATION':
      return {
        ...state,
        notifications: state.notifications.filter(n => n.id !== action.payload)
      };
    case 'TOGGLE_COMPARISON_MODE':
      return {
        ...state,
        isComparisonMode: !state.isComparisonMode
      };
    case 'SET_COMPARISON_MODE':
      return {
        ...state,
        isComparisonMode: action.payload
      };
    default:
      return state;
  }
}

interface UIContextType {
  state: UIState;
  dispatch: React.Dispatch<UIAction>;
  // Helper functions
  toggleSidebar: () => void;
  setSidebar: (open: boolean) => void;
  openModal: (modalId: string) => void;
  closeModal: () => void;
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  removeNotification: (id: string) => void;
  toggleComparisonMode: () => void;
  setComparisonMode: (enabled: boolean) => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const useUI = () => {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error('useUI must be used within a UIProvider');
  }
  return context;
};

export const UIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, initialUIState);

  const toggleSidebar = () => {
    dispatch({ type: 'TOGGLE_SIDEBAR' });
  };

  const setSidebar = (open: boolean) => {
    dispatch({ type: 'SET_SIDEBAR', payload: open });
  };

  const openModal = (modalId: string) => {
    dispatch({ type: 'OPEN_MODAL', payload: modalId });
  };

  const closeModal = () => {
    dispatch({ type: 'CLOSE_MODAL' });
  };

  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: { ...notification, id }
    });

    // Auto-remove notification after duration
    if (notification.duration) {
      setTimeout(() => {
        dispatch({ type: 'REMOVE_NOTIFICATION', payload: id });
      }, notification.duration);
    }
  };

  const removeNotification = (id: string) => {
    dispatch({ type: 'REMOVE_NOTIFICATION', payload: id });
  };

  const toggleComparisonMode = () => {
    dispatch({ type: 'TOGGLE_COMPARISON_MODE' });
  };

  const setComparisonMode = (enabled: boolean) => {
    dispatch({ type: 'SET_COMPARISON_MODE', payload: enabled });
  };

  const value: UIContextType = {
    state,
    dispatch,
    toggleSidebar,
    setSidebar,
    openModal,
    closeModal,
    addNotification,
    removeNotification,
    toggleComparisonMode,
    setComparisonMode
  };

  return (
    <UIContext.Provider value={value}>
      {children}
    </UIContext.Provider>
  );
};

// Combined Provider Component
export const AppProviders: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <UIProvider>
      <MedicalImagingProvider>
        {children}
      </MedicalImagingProvider>
    </UIProvider>
  );
};