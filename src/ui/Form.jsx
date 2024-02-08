const Form = ({ onSubmit, children, type = "signup" }) => {
  const signupStyles =
    "border-grey-100 overflow-hidden rounded-md border  bg-gray-50 px-12 py-6 text-base font-normal";

  const loginStyles =
    "w-full overflow-hidden text-base font-normal flex flex-col gap-6";

  return (
    <form
      onSubmit={onSubmit}
      className={type === "signup" ? signupStyles : loginStyles}
    >
      {children}
    </form>
  );
};

export default Form;
