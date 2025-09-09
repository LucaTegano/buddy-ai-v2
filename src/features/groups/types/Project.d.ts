export interface Project {
  id: string;
  title: string;
  team: { name: string; picture: string; }[];
  progress: number;
  lastActivity: string;
}