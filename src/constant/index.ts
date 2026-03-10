export const TaskStatusEnum = {
  BACKLOG: "Backlog",
  TODO: "Todo",
  IN_PROGRESS: "In Progress",
  IN_REVIEW: "In Review",
  DONE: "Done",
} as const;

export const TaskPriorityEnum = {
  LOW: "Low",
  MEDIUM: "Medium",
  HIGH: "High",
} as const;
export type TaskStatusEnumType = keyof typeof TaskStatusEnum;
export type TaskPriorityEnumType = keyof typeof TaskPriorityEnum;

export const Permissions = {
  CREATE_WORKSPACE: "CREATE_WORKSPACE",
  DELETE_WORKSPACE: "DELETE_WORKSPACE",
  EDIT_WORKSPACE: "EDIT_WORKSPACE",
  MANAGE_WORKSPACE_SETTINGS: "MANAGE_WORKSPACE_SETTINGS",
  ADD_MEMBER: "ADD_MEMBER",
  CHANGE_MEMBER_ROLE: "CHANGE_MEMBER_ROLE",
  REMOVE_MEMBER: "REMOVE_MEMBER",
  CREATE_PROJECT: "CREATE_PROJECT",
  EDIT_PROJECT: "EDIT_PROJECT",
  DELETE_PROJECT: "DELETE_PROJECT",
  CREATE_TASK: "CREATE_TASK",
  EDIT_TASK: "EDIT_TASK",
  DELETE_TASK: "DELETE_TASK",
  VIEW_ONLY: "VIEW_ONLY",
} as const;
export type PermissionType = keyof typeof Permissions;

export const Type = {
  BUG: 'Bug', 
  FEATURE: 'Feature', 
  IMPROVEMENT: 'Improvement', 
  TASK: 'Task', 
  SUB_TASK: 'Sub Task'
} as const;
export type TypeType = keyof typeof Type;
