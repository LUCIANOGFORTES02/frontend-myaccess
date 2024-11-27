// import Header from "@/components/ui/Header";
import {LayoutSidebar} from "../../Sidebar/LayoutSidebar";
import {Dashboard} from "./components/Dashboard";

export default function DashboardPage() {

  return (
    <div>
      <LayoutSidebar>
        <Dashboard/>
      </LayoutSidebar>
    </div>
  )
}
