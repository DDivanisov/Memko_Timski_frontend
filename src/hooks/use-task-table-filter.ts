import {
  TaskPriorityEnum,
  TaskPriorityEnumType,
  TaskStatusEnum,
  TaskStatusEnumType,
  Type,
  TypeType,
} from "@/constant";
import { parseAsString, parseAsStringEnum, useQueryStates } from "nuqs";

const useTaskTableFilter = () => {
  return useQueryStates({
    status: parseAsStringEnum<TaskStatusEnumType>(
      Object.keys(TaskStatusEnum) as TaskStatusEnumType[]
    ),
    priority: parseAsStringEnum<TaskPriorityEnumType>(
      Object.keys(TaskPriorityEnum) as TaskPriorityEnumType[]
    ),
    type: parseAsStringEnum<TypeType>(
      Object.keys(Type) as TypeType[]),
    keyword: parseAsString,
    projectId: parseAsString,
    assigneeId: parseAsString,
  });
};

export default useTaskTableFilter;
