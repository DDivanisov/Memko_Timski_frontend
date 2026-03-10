import { useState } from "react";
import { Row } from "@tanstack/react-table";
import { CheckCheck, Eye, MoreHorizontal, Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ConfirmDialog } from "@/components/resuable/confirm-dialog";
import { TaskType } from "@/types/api.type";
import { TaskStatusEnum } from "@/constant";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useWorkspaceId from "@/hooks/use-workspace-id";
import { deleteTaskMutationFn, editTaskMutationFn } from "@/lib/api";
import { toast } from "@/hooks/use-toast";
import EditTaskDialog from "../edit-task-dialog";
import ViewTaskDialog from "../view-task-dialog";

interface DataTableRowActionsProps {
  row: Row<TaskType>;
}

export function DataTableRowActions({ row }: DataTableRowActionsProps) {
  const [openDeleteDialog, setOpenDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);

  const queryClient = useQueryClient();
  const workspaceId = useWorkspaceId();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteTaskMutationFn,
  });

  const task = row.original;
  const taskId = task._id as string;
  const taskCode = task.taskCode;
  const isCompleted = task.status === TaskStatusEnum.DONE;

    // DONE mutation
  const { mutate: updateTask, isPending: isCompleting } = useMutation({
    mutationFn: editTaskMutationFn,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["all-tasks", workspaceId] });
      toast({
        title: "Task Done",
        description: data.message,
        variant: "success",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleConfirm = () => {
    mutate(
      { workspaceId, taskId },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries({ queryKey: ["all-tasks", workspaceId] });
          toast({ title: "Success", description: data.message, variant: "success" });
          setTimeout(() => setOpenDialog(false), 100);
        },
        onError: (error) => {
          toast({ title: "Error", description: error.message, variant: "destructive" });
        },
      }
    );
  };


   const handleComplete = () => {
    updateTask({
      workspaceId,
      taskId,
      projectId: task.project?._id as string,
      data: {
        title: task?.title ?? "",
        description: task?.description ?? "",
        status: TaskStatusEnum.DONE,
        priority: task?.priority ?? "Medium",
        type: task?.type ?? "Task",
        assignedTo: task.assignedTo?._id ?? "",
        dueDate: task?.dueDate ? new Date(task.dueDate) : new Date(),
        },
    });
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="flex h-8 w-8 p-0 data-[state=open]:bg-muted">
            <MoreHorizontal />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">

          {/* View Task Option */}
          <DropdownMenuItem className="cursor-pointer" onClick={() => setOpenViewDialog(true)}>
            <Eye className="w-4 h-4 mr-2" /> View Task
          </DropdownMenuItem>

          {/* Edit Task Option */}
          <DropdownMenuItem className="cursor-pointer" onClick={() => setOpenEditDialog(true)}>
            <Pencil className="w-4 h-4 mr-2" /> Edit Task
          </DropdownMenuItem>
          <DropdownMenuSeparator />

          {/* Complete Task */}
          <DropdownMenuItem
            className="cursor-pointer"
            disabled={isCompleted || isCompleting}
            onClick={handleComplete}
          >
            <CheckCheck className="w-4 h-4 mr-2" />
            {isCompleted ? "Completed" : "Mark as Complete"}
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          {/* Delete Task Option */}
          <DropdownMenuItem
            className="!text-destructive cursor-pointer"
            onClick={() => setOpenDialog(true)}
          >
            Delete Task
            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* View Task Dialog */}
      <ViewTaskDialog task={task} isOpen={openViewDialog} onClose={() => setOpenViewDialog(false)} />

      {/* Edit Task Dialog */}
      <EditTaskDialog task={task} isOpen={openEditDialog} onClose={() => setOpenEditDialog(false)} />

      {/* Delete Task Confirmation Dialog */}
      <ConfirmDialog
        isOpen={openDeleteDialog}
        isLoading={isPending}
        onClose={() => setOpenDialog(false)}
        onConfirm={handleConfirm}
        title="Delete Task"
        description={`Are you sure you want to delete ${taskCode}?`}
        confirmText="Delete"
        cancelText="Cancel"
      />
    </>
  );
}