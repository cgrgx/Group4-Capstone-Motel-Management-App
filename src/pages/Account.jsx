import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import { useState } from "react";

function Account() {
  return (
    <>
      <Heading as="h1">Update your account</Heading>
      <Row>
        <UpdateUserDataForm />
        <UpdatePasswordForm />
      </Row>
    </>
  );
}

export default Account;
