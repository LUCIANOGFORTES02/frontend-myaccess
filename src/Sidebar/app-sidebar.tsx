import { FileVideo , Home, FileAudio , Images } from "lucide-react"
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
import { Link } from "react-router-dom"
import { DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { DropdownMenu } from "@radix-ui/react-dropdown-menu"

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
      <SidebarHeader className="bg-background text-foreground pt-3 pb-3 px-4 ">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground hover:bg-slate-400"
                    >
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                      <Link to={'/editprofile'}>
                        <Avatar className="w-10 h-10" >
                          <AvatarImage 
                            src="https://github.com/shadcn.png"
                          />
                          <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                      </Link>
                    </div>
                  {/* Saudação ao usuário */}
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">Hello 👋</span>
                      <span className="truncate text-xs">Gabriel Augusto</span>
                    </div>
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
      
        
        <Separator className="border-t border-gray-700 w-[calc(100%-0.50rem)] 
          mx-auto mt-2" 
          />
      </SidebarHeader>
    
      <SidebarContent className="bg-background text-white">
        <SidebarGroup className="">
          <SidebarGroupLabel className=" text-white text-sm ">Menu</SidebarGroupLabel>
            <SidebarGroupContent>
              {/* Itens do menu */}
              <SidebarMenu >
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}  >
                    <SidebarMenuButton asChild className="hover:bg-slate-400"  >
                      <a href={item.url}>
                        <item.icon />
                        <span  className="text-sm " >{item.title}</span>
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
