import { SidebarProvider, SidebarTrigger,  } from "@/components/ui/sidebar"
import { AppSidebar } from "./app-sidebar"
import React, { useEffect, useState } from "react";
import { useSidebar } from "@/components/ui/sidebar"



export function LayoutSidebar({
  children,
  open,
  setOpen,
}: {
  children?: React.ReactNode;
  open: boolean;
  setOpen: (isOpen: boolean) => void;
}) {


  const [defaultOpen, setDefaultOpen] = useState(false);
  // Suportar o estado da barra lateral em recargas de página e renderização do lado do servidor
  useEffect(() => {
    const cookieValue = document.cookie
      .split("; ")
      .find((row) => row.startsWith("sidebar:state="))
      ?.split("=")[1];

    setDefaultOpen(cookieValue === "true");
  }, []);

  
  // const { toggleSidebar } = useSidebar()
  // const { setOpen } = useSidebar()
  // const [open, setOpen] = React.useState(true)
  // console.log("Valor", open)

  return (
    <SidebarProvider 
      style={{
        "--sidebar-width": "14rem",
        "--sidebar-width-mobile": "12rem",
      }as any }
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        document.cookie = `sidebar:state=${isOpen}; path=/;`;
      }}

      >
      <AppSidebar />
      <main className={`transition-all duration-300 ${
          open ? "ml-14" : "ml-3"
        } flex flex-col`}>
        <SidebarTrigger className="-ml-14"/>
        {children}
      </main>
    </SidebarProvider>
  )
}
