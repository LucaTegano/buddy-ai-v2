import { toast } from 'sonner';

// Toast configuration options
const TOAST_CONFIG = {
  duration: {
    success: 3000,
    error: 5000,
    warning: 4000,
    info: 4000,
    default: 4000
  },
  classNames: {
    toast: 'text-base p-4'
  }
};

// Type definitions
type ToastType = 'success' | 'error' | 'warning' | 'info';

/**
 * Shows a toast notification with the specified message and type
 * @param type - The type of toast (success, error, warning)
 * @param message - The translated message to display
 * @param options - Additional options for the toast
 */
export const showToast = (
  type: ToastType,
  message: string,
  options?: {
    duration?: number;
    classNames?: string;
  }
) => {
  // Determine duration
  const duration = options?.duration || TOAST_CONFIG.duration[type] || TOAST_CONFIG.duration.default;
  
  // Determine class names
  const classNames = options?.classNames || TOAST_CONFIG.classNames.toast;
  
  // Show the appropriate toast
  switch (type) {
    case 'success':
      toast.success(message, {
        duration,
        classNames: {
          toast: classNames
        }
      });
      break;
    case 'error':
      toast.error(message, {
        duration,
        classNames: {
          toast: classNames
        }
      });
      break;
    case 'warning':
      toast.warning(message, {
        duration,
        classNames: {
          toast: classNames
        }
      });
      break;
    case 'info':
      toast.info(message, {
        duration,
        classNames: {
          toast: classNames
        }
      });
      break;
    default:
      toast(message, {
        duration,
        classNames: {
          toast: classNames
        }
      });
  }
};

/**
 * Shows a success toast notification
 * @param message - The translated message to display
 * @param options - Additional options for the toast
 */
export const showSuccessToast = (
  message: string,
  options?: {
    duration?: number;
    classNames?: string;
  }
) => {
  showToast('success', message, options);
};

/**
 * Shows an error toast notification
 * @param message - The translated message to display
 * @param options - Additional options for the toast
 */
export const showErrorToast = (
  message: string,
  options?: {
    duration?: number;
    classNames?: string;
  }
) => {
  showToast('error', message, options);
};

/**
 * Shows a warning toast notification
 * @param message - The translated message to display
 * @param options - Additional options for the toast
 */
export const showWarningToast = (
  message: string,
  options?: {
    duration?: number;
    classNames?: string;
  }
) => {
  showToast('warning', message, options);
};

/**
 * Shows an info toast notification
 * @param message - The translated message to display
 * @param options - Additional options for the toast
 */
export const showInfoToast = (
  message: string,
  options?: {
    duration?: number;
    classNames?: string;
  }
) => {
  showToast('info', message, options);
};