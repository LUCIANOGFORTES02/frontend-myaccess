import { FileVideo , Home, FileAudio , Images ,LogOut,  } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"


import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Gerenciar Imagens",
    url: "#",
    icon: Images ,
  },
  {
    title: "Gerenciar Vídeos",
    url: "#",
    icon: FileVideo ,
  },
  {
    title: "Gerenciar Áudios",
    url: "#",
    icon: FileAudio ,
  },

]

export function AppSidebar() {

  return (
    <Sidebar collapsible="icon" >
      <SidebarHeader className="bg-black text-foreground py-4 px-6 
        group-data-[collapsible=icon]:hidden">
        <div className="flex items-center  gap-3">
          <Avatar className="w-12 h-12" >
            <AvatarImage 
              src="https://github.com/shadcn.png"
            />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p className="text-[1rem]">Hello 👋</p>
            <span className="text-[1.25rem] font-semibold ">Fulano</span>
          </div>

          <button className="pl-5 text-foreground hover:text-white">
            <LogOut  className="w-5 h-5" />
          </button>
        
        </div>
        <Separator className="border-t border-gray-700 w-[calc(100%-0.50rem)] 
          mx-auto my-3" 
          />

      </SidebarHeader>
      

      <SidebarContent className="bg-black text-white">
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel className=" text-white">Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span  className="text-[1rem]" >{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
