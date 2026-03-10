import { TaskPriorityEnum, TaskStatusEnum, Type } from "@/constant";
import { transformOptions } from "@/lib/helper";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  CheckCircle,
  Circle,
  HelpCircle,
  Timer,
  View,
  Bug,
  BadgePlus,
  CircleFadingArrowUp,
  CheckCheck,
  Check
} from "lucide-react";

const statusIcons = {
  [TaskStatusEnum.BACKLOG]: HelpCircle,
  [TaskStatusEnum.TODO]: Circle,
  [TaskStatusEnum.IN_PROGRESS]: Timer,
  [TaskStatusEnum.IN_REVIEW]: View,
  [TaskStatusEnum.DONE]: CheckCircle,
};

const priorityIcons = {
  [TaskPriorityEnum.LOW]: ArrowDown,
  [TaskPriorityEnum.MEDIUM]: ArrowRight,
  [TaskPriorityEnum.HIGH]: ArrowUp,
};

const typeIcons = {
  [Type.BUG]: Bug,
  [Type.FEATURE]: BadgePlus,
  [Type.IMPROVEMENT]: CircleFadingArrowUp,
  [Type.SUB_TASK]: Check,
  [Type.TASK]: CheckCheck,
};

export const statuses = transformOptions(
  Object.values(TaskStatusEnum),
  statusIcons
);

export const priorities = transformOptions(
  Object.values(TaskPriorityEnum),
  priorityIcons
);

export const types = transformOptions(
  Object.values(Type),
  typeIcons
);