import LoginForm from "../features/authentication/LoginForm";
// import Logo from "../ui/Logo";
// import Heading from "../ui/Heading";

function Login() {
  return (
    <main className="min-h-screen grid grid-cols-48rem place-content-center gap-8 bg-gray-50">
      {/* <Logo /> */}
      {/* <Heading as="h4">Login to your account</Heading> */}
      <LoginForm />
    </main>
  );
}

export default Login;
