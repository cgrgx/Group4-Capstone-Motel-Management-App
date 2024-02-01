import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

function AppLayout() {
  return (
    // <div className="grid-rows-auto-1fr grid h-screen grid-cols-2">
    //   <Header />
    //   <Sidebar />
    //   <main className="overflow-y-scroll bg-gray-50 p-16">
    //     <div className="mx-auto flex max-w-3xl flex-col gap-8">
    //       <Outlet />
    //     </div>
    //   </main>
    // </div>
    <>
      <main>
        <Outlet />
      </main>
    </>
  );
}

export default AppLayout;
