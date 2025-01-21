import { FileVideo , Home, FileAudio , Images } from "lucide-react"
import { Upload,Files } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage, } from "@/components/ui/avatar"
import { Separator ,} from "@/components/ui/separator"
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
import { AuthContext } from "@/auth/AuthContext"
import { useContext } from "react"


// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/",
    icon: Home,
  },
  {
    title: "Upload de Arquivos",
    url: "/upload",
    icon: Upload,
  },
  {
    title: "Arquivos",
    url: "/files",
    icon: Files,
  },
  // {
  //   title: "Imagens",
  //   url: "/image",
  //   icon: Images ,
  // },
  // {
  //   title: "Vídeos",
  //   url: "#",
  //   icon: FileVideo ,
  // },
  // {
  //   title: "Áudios",
  //   url: "#",
  //   icon: FileAudio ,
  // },

]

export function AppSidebar() {
  const {user} = useContext(AuthContext)


  return (
    <Sidebar collapsible="icon" className='border-gray-700'>
      <SidebarHeader className="bg-background  text-foreground pt-3 pb-3 px-4 ">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
              <Link to={'/editprofile'}>
                <SidebarMenuButton
                    size="lg"
                    className="data-[state=open]:bg-gray-800 hover:bg-sidebar-hover"
                    >
                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg ">
                     
                        <Avatar className="w-10 h-10" >
                          <AvatarImage 
                              src={user?.profileImage||"https://github.com/shadcn.png"}
                          />
                          <AvatarFallback> {user?.name?.[0]?.toUpperCase()} </AvatarFallback>
                        </Avatar>
                    </div>
                  {/* Saudação ao usuário */}
                  {/* <a href="/editprofile" className=""> */}
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold text-foreground">Olá </span>
                      <span className="truncate text-xs text-foreground">{user?.name}</span>
                    </div>
                  {/* </a> */}
                  </SidebarMenuButton>
                  </Link>

                </DropdownMenuTrigger>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
      
        
        <Separator className="border-t border-gray-700 w-[calc(100%-0.50rem)] 
          mx-auto mt-2" 
          />
      </SidebarHeader>
    
      <SidebarContent className="bg-background text-foreground">
        <SidebarGroup className="">
          <SidebarGroupLabel className=" text-foreground text-lg">Menu</SidebarGroupLabel>
            <SidebarGroupContent>
              {/* Itens do menu */}
              <SidebarMenu >
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}  >
                    <SidebarMenuButton asChild className="hover:bg-sidebar-hover  "  >
                      <Link  to={item.url} className="hover:bg-sidebar-hover  focus:bg-transparent active:bg-transparent">
                        <item.icon className="text-foreground" />
                        <span  className="text-base text-foreground" >{item.title}</span>
                      </Link>
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
