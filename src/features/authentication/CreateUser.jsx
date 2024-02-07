import React, { useState } from "react";
import supabase from "../../services/supabase";

import { useSignup } from "./useSignup";
import { useForm } from "react-hook-form";

const CreateUserComponent = () => {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // Default to normal user role
  const { signup, isLoading } = useSignup();
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;

  //   function onSubmit({ fullName, email, password }) {
  //     signup(
  //       { fullName, email, password },
  //       {
  //         onSettled: () => reset(),
  //       },
  //     );
  //   }

  const handleCreateUser = async ({ fullName, email, password }) => {
    // Create user
    signup(
      { fullName, email, password },
      {
        onSettled: () => reset(),
      },
    );

    // console.log("User created and role assigned:", result);
  };

  return (
    // <form onSubmit={handleSubmit(onSubmit)}>
    //   <input
    //     type="text"
    //     value={fullName}
    //     onChange={(e) => setFullName(e.target.value)}
    //     placeholder="Full name"
    //   />
    //   <input
    //     type="email"
    //     value={email}
    //     onChange={(e) => setEmail(e.target.value)}
    //     placeholder="Email"
    //   />
    //   <input
    //     type="password"
    //     value={password}
    //     onChange={(e) => setPassword(e.target.value)}
    //     placeholder="Password"
    //   />
    //   <select value={role} onChange={(e) => setRole(e.target.value)}>
    //     <option value="user">Normal User</option>
    //     <option value="admin">Admin</option>
    //   </select>
    //   <button type="submit">Create User</button>
    // </form>
    <form onSubmit={handleSubmit(handleCreateUser)}>
      <input
        {...register("fullName", { required: true })}
        placeholder="Full name"
      />
      <input {...register("email", { required: true })} placeholder="Email" />
      <input
        {...register("password", { required: true })}
        placeholder="Password"
        type="password"
      />
      <select {...register("role", { required: true })}>
        <option value="user">Normal User</option>
        <option value="admin">Admin</option>
      </select>
      <button type="submit" disabled={isLoading}>
        Create User
      </button>
    </form>
  );
};

export default CreateUserComponent;
