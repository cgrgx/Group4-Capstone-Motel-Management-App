import { Outlet } from "react-router-dom";
import Header from "./Header";

function AppLayout() {
  return (
    <div className="grid h-screen grid-rows-[auto_1fr]">
      <Header />
      <main className="overflow-auto  bg-gray-100 p-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 ">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default AppLayout;
