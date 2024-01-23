import { HiMiniUser, HiLockClosed } from "react-icons/hi2";
import { FaSignInAlt } from "react-icons/fa";

function LoginForm() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="mx-auto max-w-2xl rounded-md bg-white p-8 shadow-md">
        <header className="mb-6 flex items-center justify-between rounded-t-md bg-blue-500 p-4">
          <div className="flex items-center">
            <i className="fas fa-hotel mr-4 text-2xl text-white"></i>
            <span className="text-2xl font-bold text-white">Maple Motel</span>
          </div>
        </header>

        <div className="text-center">
          <h2 className="mb-8 text-2xl font-bold">Login</h2>
          <form className="mx-auto flex max-w-lg flex-col">
            <div className="mb-4">
              <label
                htmlFor="username"
                className=" mb-2 flex items-center justify-center gap-2"
              >
                <HiMiniUser />
                <span> Email Address: </span>
              </label>
              <input
                type="text"
                id="username"
                name="username"
                required
                className="w-full rounded-md border border-gray-300 px-4 py-2"
              />
            </div>

            <div className="mb-4">
              <label
                htmlFor="password"
                className="mb-2 flex items-center justify-center gap-2"
              >
                <HiLockClosed /> <span>Password: </span>
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                className="w-full rounded-md border border-gray-300 px-4 py-2"
              />
            </div>

            <button
              type="submit"
              className="mx-auto mt-4 flex w-1/3 items-center justify-center gap-2 rounded-md bg-green-500 px-4 py-2 text-white hover:bg-green-600"
            >
              <FaSignInAlt />
              <span className="font-bold">Log In</span>
            </button>
          </form>
        </div>

        <footer className="mt-8 rounded-b-md bg-blue-500 p-4 text-center text-white">
          <p>&copy; 2024 Maple Motel. All rights reserved. </p>
        </footer>
      </div>
    </div>
  );
}

export default LoginForm;
