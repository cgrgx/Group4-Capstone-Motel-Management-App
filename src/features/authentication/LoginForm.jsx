import { useState } from "react";
import { useLogin } from "./useLogin";

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading } = useLogin();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;

    login(
      { email, password },
      {
        onSettled: () => {
          setEmail("");
          setPassword("");
        },
      },
    );
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto flex max-w-lg flex-col px-16 py-8"
    >
      <div className="mb-4">
        <label htmlFor="email" className=" mb-2 ">
          Username:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-4 py-2"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="password" className="mb-2">
          Password:
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-md border border-gray-300 px-4 py-2"
        />
      </div>

      <button
        type="submit"
        className="mx-auto mt-4 rounded-md bg-orange-500 px-8 py-2 hover:bg-orange-700"
      >
        <span className=" text-xl font-bold text-black">LOGIN</span>
      </button>
    </form>
  );
}

export default LoginForm;
