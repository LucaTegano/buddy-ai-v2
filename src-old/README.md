# Study Buddy AI Frontend

This is the frontend for the Study Buddy AI application, built with Next.js.

## API Integration

The frontend connects to the backend API through service files located in `src/app/services/`. Each service corresponds to a specific feature of the application.

### Services

1. **Auth Service** (`src/app/services/authService.ts`) - Handles user authentication
2. **Notes Service** (`src/app/services/notesService.ts`) - Manages notes CRUD operations
3. **Groups Service** (`src/app/services/groupsService.ts`) - Manages study groups, messages, tasks, and files
4. **Tasks Service** (`src/app/services/tasksService.ts`) - Manages personal tasks
5. **Settings Service** (`src/app/services/settingsService.ts`) - Manages user preferences
6. **Search Service** (`src/app/services/searchService.ts`) - Handles note search functionality
7. **Trash Service** (`src/app/services/trashService.ts`) - Manages deleted notes
8. **Inbox Service** (`src/app/services/inboxService.ts`) - Manages user notifications
9. **Chat Service** (`src/app/services/chatService.ts`) - Handles AI chat functionality
10. **Projects Service** (`src/app/services/projectsService.ts`) - Manages collaborative projects

### API Configuration

The API endpoints are configured in `src/app/services/apiConfig.ts`. The base URL can be set through the `NEXT_PUBLIC_API_BASE_URL` environment variable.

### Authentication

Authentication is handled through JWT tokens stored in localStorage. The `httpClient` service (`src/app/services/httpClient.ts`) automatically includes the authentication token in all requests.

### State Management

The application uses Zustand for state management. The main store is located at `src/app/store/useAppStore.ts`, with additional stores for chat (`src/app/store/useChatStore.ts`) and scratchpad (`src/app/store/useScratchpadStore.ts`) functionality.

### Data Loading

When a user logs in, the `useAppInitializer` hook (`src/app/hooks/useAppInitializer.ts`) loads all user data from the backend. This includes notes, groups, projects, tasks, settings, and chat history.

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api
NEXT_PUBLIC_API_KEY=your-gemini-api-key
```

## Folder Structure

- `src/app/` - Main application code
  - `components/` - React components
  - `data/` - Mock data (used when backend is not available)
  - `hooks/` - Custom React hooks
  - `models/` - TypeScript interfaces and types
  - `screens/` - Page components
  - `services/` - API service files
  - `store/` - Zustand stores
  - `utils/` - Utility functions

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a `.env.local` file with your API configuration

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser