import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

function AppLayout() {
  return (
    <div className="grid grid-cols-2 grid-rows-auto-1fr h-screen">
      <Header />
      <Sidebar />
      <main className="bg-gray-50 p-16 overflow-y-scroll">
        <div className="max-w-3xl mx-auto flex flex-col gap-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AppLayout;
