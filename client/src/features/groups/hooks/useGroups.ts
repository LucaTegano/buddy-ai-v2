import { useGroupsStore } from '@/features/groups/store/groups.store';
import { groupActions } from '@/features/groups/actions/group.actions';

export const useGroups = () => {
  const store = useGroupsStore();
  
  return {
    // Store state
    ...store,
    
    // Actions
    loadGroups: groupActions.loadGroups,
    createGroup: groupActions.createGroup,
    joinGroup: groupActions.joinGroup,
    leaveGroup: groupActions.leaveGroup,
    setActiveGroupId: groupActions.setActiveGroupId,
    //loadGroupMessages: groupActions.loadGroupMessages,
    //postGroupMessage: groupActions.postGroupMessage,
    loadGroupTasks: groupActions.loadGroupTasks,
    createGroupTask: groupActions.createGroupTask,
    updateGroupTask: groupActions.updateGroupTask,
    deleteGroupTask: groupActions.deleteGroupTask,
    loadGroupFiles: groupActions.loadGroupFiles,
  };
};