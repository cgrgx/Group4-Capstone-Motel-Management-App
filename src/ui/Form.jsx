const Form = ({ children }) => {
  return (
    <form className="border-grey-100 overflow-hidden rounded-md border bg-gray-50 px-12 py-6 text-base font-normal">
      {children}
    </form>
  );
};

export default Form;
