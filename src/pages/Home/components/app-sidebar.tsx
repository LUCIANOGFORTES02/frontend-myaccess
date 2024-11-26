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
  SidebarMenuSkeleton,
} from "@/components/ui/sidebar"
import { Link } from "react-router-dom"

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Gerenciar Imagens",
    url: "/image",
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
      <SidebarHeader className="bg-background text-foreground pt-3 pb-3 px-6 
        group-data-[collapsible=icon]:hidden">
        <div className="flex items-center gap-3">
          <Link to={'/editprofile'}>
            <Avatar className="w-12 h-12" >
              <AvatarImage 
                src="https://github.com/shadcn.png"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Link>
          <div className="flex flex-col">
            <p className="text-[0.9rem]">Hello 👋</p>
            <span className="text-[1rem] font-semibold ">Gabriel Augusto</span>
          </div>

          <button className="pl-6 text-foreground hover:text-foreground">
            <LogOut  className="w-5 h-5" />
          </button>
        
        </div>
        <Separator className="border-t border-gray-700 w-[calc(100%-0.50rem)] 
          mx-auto mt-2" 
          />
      </SidebarHeader>
    
      <SidebarContent className="bg-background text-white">
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
