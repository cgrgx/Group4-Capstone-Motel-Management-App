import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

import { useUsers } from "../features/authentication/useUsers";
import { useUser } from "../features/authentication/useUser";
import { useSetAdmin } from "../features/authentication/useSetAdmin";
import UserTable from "../features/authentication/UserTable";
import AddUser from "../features/authentication/AddUser";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Users() {
  const { isAdmin } = useUser();

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Users</Heading>
        {isAdmin && <AddUser />}
      </Row>
      <Row>
        <UserTable />
      </Row>
    </>
  );
}

export default Users;
