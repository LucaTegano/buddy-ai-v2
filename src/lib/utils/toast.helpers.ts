import { showSuccessToast, showErrorToast } from '@/lib/utils/toast.utils';
import { t } from '@/lib/i18n/i18n.global';

/**
 * Shows a success toast for task added
 */
export const showTaskAddedSuccess = () => {
  showSuccessToast(String(t('toast.success.taskAdded')));
};

/**
 * Shows a success toast for task removed
 */
export const showTaskRemovedSuccess = () => {
  showSuccessToast(String(t('toast.success.taskRemoved')));
};

/**
 * Shows a success toast for task updated
 */
export const showTaskUpdatedSuccess = () => {
  showSuccessToast(String(t('toast.success.taskUpdated')));
};

/**
 * Shows a success toast for task status updated
 */
export const showTaskStatusUpdatedSuccess = () => {
  showSuccessToast(String(t('toast.success.taskStatusUpdated')));
};

/**
 * Shows an error toast for failed to load tasks
 */
export const showFailedToLoadTasksError = () => {
  showErrorToast(String(t('toast.error.failedToLoadTasks')));
};

/**
 * Shows an error toast for failed to add task
 */
export const showFailedToAddTaskError = () => {
  showErrorToast(String(t('toast.error.failedToAddTask')));
};

/**
 * Shows an error toast for failed to remove task
 */
export const showFailedToRemoveTaskError = () => {
  showErrorToast(String(t('toast.error.failedToRemoveTask')));
};

/**
 * Shows an error toast for failed to update task
 */
export const showFailedToUpdateTaskError = () => {
  showErrorToast(String(t('toast.error.failedToUpdateTask')));
};

/**
 * Shows an error toast for failed to update task status
 */
export const showFailedToUpdateTaskStatusError = () => {
  showErrorToast(String(t('toast.error.failedToUpdateTaskStatus')));
};