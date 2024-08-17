import React, { ReactNode, useState } from "react";
import SideBar from "../components/Admin/SideBar";
import Header from "../components/Admin/Header";

const AdminLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="flex h-screen overflow-hidden">
      <SideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main>
          <div className="mx-auto min-h-screen max-w-screen-2xl p-4 md:p-6 2xl:p-10 bg-[#f1f5f9]">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
