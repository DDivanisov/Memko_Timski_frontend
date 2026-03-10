import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { TaskType } from "@/types/api.type";
import { TaskPriorityEnum, TaskStatusEnum } from "@/constant";
import { CalendarIcon, UserIcon, TagIcon, AlertCircleIcon, ClipboardIcon } from "lucide-react";

const statusColorMap: Record<string, string> = {
  [TaskStatusEnum.TODO]: "bg-slate-100 text-slate-700",
  [TaskStatusEnum.IN_PROGRESS]: "bg-blue-100 text-blue-700",
  [TaskStatusEnum.IN_REVIEW]: "bg-yellow-100 text-yellow-700",
  [TaskStatusEnum.DONE]: "bg-green-100 text-green-700",
  [TaskStatusEnum.BACKLOG]: "bg-gray-100 text-gray-600",
};

const priorityColorMap: Record<string, string> = {
  [TaskPriorityEnum.LOW]: "bg-green-100 text-green-700",
  [TaskPriorityEnum.MEDIUM]: "bg-yellow-100 text-yellow-700",
  [TaskPriorityEnum.HIGH]: "bg-orange-100 text-orange-700"
};

export default function ViewTaskForm({ task, onClose }: { task: TaskType; onClose: () => void }) {
  const dueDate = task?.dueDate ? format(new Date(task.dueDate), "PPP") : "No due date";
  const assigneeName = task.assignedTo?.name ?? "Unassigned";

  return (
    <div className="w-full h-auto max-w-full">
      <div className="h-full">
        {/* Header */}
        <div className="mb-5 pb-2 border-b flex items-center justify-between">
          <h1 className="text-xl font-semibold text-center sm:text-left">Task Details</h1>
          <span className="text-xs text-muted-foreground font-mono">{task.taskCode}</span>
        </div>

        <div className="space-y-4">
          {/* Title */}
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1 flex items-center gap-1">
              <ClipboardIcon className="w-3 h-3" /> Title
            </p>
            <p className="text-base font-semibold">{task.title}</p>
          </div>

          {/* Description */}
          {task.description && (
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1">Description</p>
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-wrap rounded-md bg-muted/40 p-3">
                {task.description}
              </p>
            </div>
          )}

          <Separator />

          {/* Metadata Grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* Status */}
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5 flex items-center gap-1">
                <TagIcon className="w-3 h-3" /> Status
              </p>
              <Badge className={`text-xs font-medium ${statusColorMap[task.status] ?? "bg-gray-100 text-gray-600"}`} variant="outline">
                {task.status?.charAt(0) + task.status?.slice(1).toLowerCase().replace("_", " ")}
              </Badge>
            </div>

            {/* Priority */}
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5 flex items-center gap-1">
                <AlertCircleIcon className="w-3 h-3" /> Priority
              </p>
              <Badge className={`text-xs font-medium ${priorityColorMap[task.priority] ?? "bg-gray-100 text-gray-600"}`} variant="outline">
                {task.priority?.charAt(0) + task.priority?.slice(1).toLowerCase()}
              </Badge>
            </div>

            {/* Type */}
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5">Type</p>
              <Badge variant="secondary" className="text-xs">
                {task.type}
              </Badge>
            </div>

            {/* Due Date */}
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-1.5 flex items-center gap-1">
                <CalendarIcon className="w-3 h-3" /> Due Date
              </p>
              <p className="text-sm">{dueDate}</p>
            </div>
          </div>

          <Separator />

          {/* Assigned To */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
              <UserIcon className="w-4 h-4 text-muted-foreground" />
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Assigned To</p>
              <p className="text-sm font-medium">{assigneeName}</p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6">
          <Button variant="outline" className="w-full" onClick={onClose}>
            Close
          </Button>
        </div>
      </div>
    </div>
  );
}