import { Outlet } from "react-router-dom";
import Header from "./Header";

function AppLayout() {
  return (
    <div className="grid h-screen grid-rows-[auto_1fr]">
      <Header />
      <main className="overflow-y-scroll bg-gray-50 p-16">
        <div className="mx-auto flex max-w-3xl flex-col gap-8">
          <Outlet />
        </div>
      </main>
    </div>
    // <main className="overflow-y-scroll bg-gray-50 p-16">
    //   //{" "}
    //   <div className="mx-auto flex max-w-3xl flex-col gap-8">
    //     // <Outlet />
    //     //{" "}
    //   </div>
    // </main>
    // </div>
    // <>
    //   <main>
    //     <Outlet />
    //   </main>
    // </>
  );
}

export default AppLayout;
