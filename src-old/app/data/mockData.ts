
import { Note, Project, Group, GroupMember } from '@/app/models/types';

export const mockNotes: Note[] = [
  {
    id: 'note-1',
    title: 'Quantum Physics Lecture Notes',
    lastEdited: '2 hours ago',
    participantCount: 1,
    content: `<h1>Quantum Physics Basics</h1><p>Quantum physics is the study of matter and energy at the most fundamental level. It aims to uncover the properties and behaviors of the very building blocks of nature.</p><p>Key concepts:</p><ul><li>Wave-particle duality</li><li>Superposition</li><li>Quantum entanglement</li></ul>`,
  },
  {
    id: 'note-2',
    title: 'Shakespearean Sonnets Analysis',
    lastEdited: 'Yesterday',
    participantCount: 3,
    content: `<h2>Analysis of Sonnet 18</h2><p>"Shall I compare thee to a summer’s day?" - This opening line sets the stage for a comparison, but the speaker quickly asserts the subject's superiority.</p>`,
  },
  {
    id: 'note-3',
    title: 'Calculus III Study Guide',
    lastEdited: '3 days ago',
    participantCount: 1,
    content: `<h3>Partial Derivatives</h3><p>A partial derivative of a function of several variables is its derivative with respect to one of those variables, with the others held constant.</p>`,
  },
  {
    id: 'note-4',
    title: 'World History: The Roman Empire',
    lastEdited: 'Last week',
    participantCount: 5,
    content: `<h1>The Roman Empire</h1><p>The Roman Empire was one of the most powerful and influential civilizations in world history. It began in Rome in 753 BC.</p>`,
  },
];

export const mockProjects: Project[] = [
  {
    id: 'proj-1',
    title: 'Biology Lab Report',
    team: [
      { name: 'Alex Doe', picture: 'https://i.pravatar.cc/150?u=alex' },
      { name: 'Jane Smith', picture: 'https://i.pravatar.cc/150?u=jane' },
      { name: 'Sam Wilson', picture: 'https://i.pravatar.cc/150?u=sam' },
    ],
    progress: 75,
    lastActivity: 'Jane pushed an update 3 hours ago',
  },
  {
    id: 'proj-2',
    title: 'Computer Science Final Project',
    team: [
      { name: 'Alex Doe', picture: 'https://i.pravatar.cc/150?u=alex' },
      { name: 'Chris Lee', picture: 'https://i.pravatar.cc/150?u=chris' },
    ],
    progress: 40,
    lastActivity: 'Initial commit by Alex yesterday',
  },
  {
    id: 'proj-3',
    title: 'Art History Presentation',
    team: [
      { name: 'Alex Doe', picture: 'https://i.pravatar.cc/150?u=alex' },
      { name: 'Maria Garcia', picture: 'https://i.pravatar.cc/150?u=maria' },
      { name: 'David Chen', picture: 'https://i.pravatar.cc/150?u=david' },
      { name: 'Emily White', picture: 'https://i.pravatar.cc/150?u=emily' },
    ],
    progress: 90,
    lastActivity: 'Final slides added by Maria',
  },
];

const alex: GroupMember = { id: 'user-alex', name: 'Alex Doe', picture: 'https://i.pravatar.cc/150?u=alex' };
const jane: GroupMember = { id: 'user-jane', name: 'Jane Smith', picture: 'https://i.pravatar.cc/150?u=jane' };
const sam: GroupMember = { id: 'user-sam', name: 'Sam Wilson', picture: 'https://i.pravatar.cc/150?u=sam' };
const maria: GroupMember = { id: 'user-maria', name: 'Maria Garcia', picture: 'https://i.pravatar.cc/150?u=maria' };

export const mockGroups: Group[] = [
  {
    id: 'group-1',
    name: 'Physics Study Group',
    subject: 'Quantum Mechanics',
    members: [alex, jane, sam],
    messages: [
      { id: 'msg-1', senderId: 'user-jane', text: 'Hey everyone, ready for the exam on Friday?', timestamp: '10:30 AM' },
      { id: 'msg-2', senderId: 'user-alex', text: 'Almost! Still a bit confused about quantum entanglement.', timestamp: '10:31 AM' },
      { id: 'msg-3', senderId: 'user-sam', text: 'I found a great video explaining it, I\'ll share it in the files tab.', timestamp: '10:32 AM' },
    ],
    files: [
      { id: 'file-1', name: 'Lecture Notes Week 5.pdf', type: 'PDF', size: '1.2 MB', uploadedBy: 'Jane Smith', date: 'Oct 26, 2023' },
      { id: 'file-2', name: 'Entanglement Explained.mp4', type: 'Other', size: '15.4 MB', uploadedBy: 'Sam Wilson', date: 'Oct 28, 2023' },
    ],
    tasks: [
      { id: 'task-1', text: 'Review Chapter 4', completed: true, assigneeId: 'user-jane' },
      { id: 'task-2', text: 'Complete problem set 3', completed: false, assigneeId: 'user-alex' },
      { id: 'task-3', text: 'Summarize lecture notes', completed: false },
    ],
  },
  {
    id: 'group-2',
    name: 'History Buffs',
    subject: 'The Renaissance',
    members: [alex, maria],
    messages: [
      { id: 'msg-4', senderId: 'user-maria', text: 'The presentation is looking great! I just added the final slides on Da Vinci.', timestamp: 'Yesterday' },
      { id: 'msg-5', senderId: 'user-alex', text: 'Awesome, I\'ll do a final proofread tonight.', timestamp: 'Yesterday' },
    ],
    files: [
      { id: 'file-3', name: 'Presentation Draft.pptx', type: 'Other', size: '5.6 MB', uploadedBy: 'Maria Garcia', date: 'Oct 27, 2023' },
      { id: 'file-4', name: 'Research Sources.docx', type: 'Word', size: '34 KB', uploadedBy: 'Alex Doe', date: 'Oct 25, 2023' },
    ],
    tasks: [
      { id: 'task-4', text: 'Create title slide', completed: true, assigneeId: 'user-alex' },
      { id: 'task-5', text: 'Add speaker notes', completed: true, assigneeId: 'user-maria' },
      { id: 'task-6', text: 'Practice timing', completed: false },
    ],
  }
];