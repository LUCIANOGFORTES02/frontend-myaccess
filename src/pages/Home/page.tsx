// import Header from "@/components/ui/Header";
import PageTitle from "@/components/ui/PageTitle";
import {LayoutSidebar} from "../../Sidebar/LayoutSidebar";
import {Dashboard} from "./components/Dashboard";
import { House  } from 'lucide-react';
import { useContext } from "react";
import { AuthContext } from "@/auth/AuthContext";


export default function DashboardPage() {
  const auth = useContext(AuthContext);


  return (
      <LayoutSidebar>
          <PageTitle icon={House} main="Dashboard" sub="Visão geral"/>
            <Dashboard/>
      </LayoutSidebar>
         
  )
}
