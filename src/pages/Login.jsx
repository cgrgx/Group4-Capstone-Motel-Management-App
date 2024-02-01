import { Link } from "react-router-dom";
import LoginForm from "../features/authentication/LoginForm";
import Heading from "../ui/Heading";
import Logo from "../ui/Logo";

function Login() {
  return (
    <main className=" flex min-h-screen flex-col items-center justify-center gap-8 bg-gray-50">
      <div className="mx-auto flex max-w-md flex-col items-center justify-center gap-8 rounded-md border border-gray-300 bg-white p-8 shadow-md">
        <div className="h-6 w-full bg-orange-400" />
        <Logo />
        <Heading as="h4">SLEEPY GOOSE MOTEL</Heading>
        <LoginForm />
      </div>
      <div className="text-center font-medium">
        <p> &copy; 2024 Maple Solution. All rights reserved. </p>

        <p className="mt-2  text-blue-500 ">
          <Link className="hover:underline" to="/support">
            Support
          </Link>
          <span className="mx-2">|</span>
          <Link className="hover:underline" to="/about-us">
            About us
          </Link>
        </p>
      </div>
    </main>
  );
}

export default Login;
