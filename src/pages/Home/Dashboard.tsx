// import Header from "@/components/ui/Header";
import {LayoutSidebar} from "./components/LayoutSidebar";
import { useState } from "react";


export default function DashboardPage() {
  const [open, setOpen] = useState(true); // Estado do Sidebar

  return (
    <div>
      {/* <Header/> */}
      <LayoutSidebar open={open} setOpen={setOpen}/>
    </div>
  )
}
