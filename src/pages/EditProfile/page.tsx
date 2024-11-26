import { useState } from "react";
import {LayoutSidebar} from "../Home/components/LayoutSidebar";
import {EditProfile} from "./components/editProfile";

export default function EditProfilePage() {
  const [open, setOpen] = useState(true); // Estado do Sidebar

  return (
    <LayoutSidebar open={open} setOpen={setOpen}>
      <EditProfile open={open} />
    </LayoutSidebar>
  );
}
