export interface GroupTask {
  taskId: string;
  id: string;
  text: string;
  completed: boolean;
  assigneeId?: string;
}

export interface PersonalTask {
  id: string;
  text: string;
  completed: boolean;
}
export interface GroupMember {
  id: string;
  name: string;
  picture: string;
}

interface TaskListProps {
  title: string;
  tasks: PersonalTask[] | GroupTask[];
  members?: GroupMember[];
  isGroupTask?: boolean;
  groupId?: string;
  groupName:string;
}