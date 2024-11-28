// import Header from "@/components/ui/Header";
import PageTitle from "@/components/PageTitle";
import {LayoutSidebar} from "../../Sidebar/LayoutSidebar";
import {Dashboard} from "./components/Dashboard";
import { House  } from 'lucide-react';


export default function DashboardPage() {

  return (
      <LayoutSidebar>
          <PageTitle icon={House} main="Dashboard" sub="Visão geral"/>
            <Dashboard/>
      </LayoutSidebar>
         
  )
}
