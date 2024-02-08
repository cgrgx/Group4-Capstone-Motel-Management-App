import SignupForm from "../features/authentication/SignupForm";
import Heading from "../ui/Heading";

function Users() {
  return (
    <>
      <div className="flex">
        <Heading as="h4">New User</Heading>
      </div>
      <SignupForm />
    </>
  );
}

export default Users;
