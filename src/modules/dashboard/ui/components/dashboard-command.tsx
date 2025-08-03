import {
  CommandResponsiveDialog,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandItem
} from "@/components/ui/command";
import { Dispatch, SetStateAction } from "react";

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const DashboardCommand = ({ open, setOpen }: Props) => {
  return (
    <CommandResponsiveDialog open={open} onOpenChange={setOpen} aria-label="Command Menu">

      <CommandInput placeholder="Find a Meeting or Agent" />
      <CommandList>
        <CommandItem>Test</CommandItem>
      </CommandList>
    </CommandResponsiveDialog>
  );
};
