import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import React from "react";

type DynamicAlertDialogueProps = {
  triggerText: string;
  triggerClass?: string;
  title: string;
  content: string;
  onAction: () => void;
  cancelText?: string;
  actionText: string;
  actionButtonClass?: string;
};

const DynamicAlertDialogue: React.FC<DynamicAlertDialogueProps> = ({
  triggerText,
  triggerClass,
  title,
  content,
  onAction,
  cancelText = "Cancel",
  actionText,
  actionButtonClass,
}) => {
  return (
    <AlertDialog>
      <div className={triggerClass}>
        <AlertDialogTrigger className="w-full text-left">
          {triggerText}
        </AlertDialogTrigger>
      </div>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{content}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>{cancelText}</AlertDialogCancel>
          <AlertDialogAction onClick={onAction} className={actionButtonClass}>
            {actionText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DynamicAlertDialogue;
