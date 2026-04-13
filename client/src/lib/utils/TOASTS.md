# Toast Messages

This document describes the toast messages used in the application and how to use them.

## Available Toast Messages

### Success Messages
- `toast.success.default` - "This is a success message"
- `toast.success.taskAdded` - "Task added successfully"
- `toast.success.taskRemoved` - "Task removed successfully"
- `toast.success.taskUpdated` - "Task updated successfully"
- `toast.success.taskStatusUpdated` - "Task status updated"

### Error Messages
- `toast.error.default` - "This is an error message"
- `toast.error.failedToLoadTasks` - "Failed to load personal tasks"
- `toast.error.failedToAddTask` - "Failed to add task"
- `toast.error.failedToRemoveTask` - "Failed to remove task"
- `toast.error.failedToUpdateTask` - "Failed to update task"
- `toast.error.failedToUpdateTaskStatus` - "Failed to update task status"

### Warning Messages
- `toast.warning.default` - "This is a warning message"

## How to Use

### In React Components

1. Import the toast utilities:
```typescript
import { useTranslation } from 'react-i18next';
import { showSuccessToast, showErrorToast, showWarningToast } from '@/lib/utils/toast.utils';
```

2. Use the translation hook to get translated messages:
```typescript
const { t } = useTranslation();

// Show a success toast
showSuccessToast(t('toast.success.taskAdded'));

// Show an error toast
showErrorToast(t('toast.error.failedToAddTask'));

// Show a warning toast
showWarningToast(t('toast.warning.default'));
```

### Using Helper Functions

For convenience, you can also use the helper functions that automatically handle translation:

```typescript
import { useTranslation } from 'react-i18next';
import {
  showTaskAddedSuccess,
  showFailedToAddTaskError,
  // ... other helpers
} from '@/lib/utils/toast.helpers';

const { t } = useTranslation();

// Show a task added success message
showTaskAddedSuccess(t);

// Show a failed to add task error message
showFailedToAddTaskError(t);
```

## Adding New Toast Messages

1. Add the new message key to each locale file in `src/lib/i18n/locales/`
2. Use the appropriate nesting under `toast.success`, `toast.error`, or `toast.warning`
3. Add the translation for all supported languages (en, it, zh, hi, es, ar, fr)