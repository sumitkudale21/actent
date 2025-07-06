"use client";
import { Button } from "@/components/ui/button";
import { useSidebar } from "@/components/ui/sidebar";
import { PanelLeftCloseIcon, PanelLeftIcon, SearchIcon } from "lucide-react";
import { DashboardCommand } from "./dashboard-command";
import { useState, useEffect } from "react";

export const DashboardNavbar = () => {
  const { toggleSidebar, state, isMobile } = useSidebar();
  const [commandOpen, seCommandtOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        seCommandtOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <DashboardCommand open={commandOpen} setOpen={seCommandtOpen} />
      <nav className="flex items-center gap-2 border-b bg-background px-4">
        <Button className="size-7" variant="outline" onClick={toggleSidebar}>
          {state === "collapsed" || isMobile ? (
            <PanelLeftIcon className="size-4" />
          ) : (
            <PanelLeftCloseIcon className="size-4" />
          )}
        </Button>
        <Button className="h-9 w-[240px] justify-start text-muted-foreground hover:text-muted-foreground font-normal bg-background hover:bg-[oklch(94%_0.005_250)]"
          onClick={() => seCommandtOpen((open) => !open)}
          variant="outline"
          size={"sm"}>
          <SearchIcon className="size-4" />
          Search
          <kbd className="ml-auto hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 dark:border-muted-foreground sm:flex">
            <span className="text-xs">⌘K</span>
          </kbd>
        </Button>
      </nav>
    </>
  );
};
