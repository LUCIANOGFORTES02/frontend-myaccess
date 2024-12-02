import PageTitle from "@/components/ui/PageTitle";
import {LayoutSidebar} from "../../Sidebar/LayoutSidebar";
import {EditProfile} from "./components/editProfile";
import { UserPen } from 'lucide-react';


export default function EditProfilePage() {
  return (
    <LayoutSidebar >
      <PageTitle icon={UserPen} main="Edição" sub="Edição do seu perfil"/>
      <EditProfile  />
    </LayoutSidebar>
  );
}
