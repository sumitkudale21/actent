import { ResponsiveDialog } from "@/components/responsive-dialog";
import { AgentForm } from "./agent-form";

interface NewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export const NewAgentDialog = ({ open, onOpenChange }: NewDialogProps) => {
  return (
    <ResponsiveDialog
    title="New Agent"
    open={open}
    onOpenChange={onOpenChange}
    description="Create a new agent with specific instructions and settings." 
    >
      <AgentForm
        onSuccess={() => onOpenChange(false)}
        onCancel={() => onOpenChange(false)}
      />
    </ResponsiveDialog>
  );
};