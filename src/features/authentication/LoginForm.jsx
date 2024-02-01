function LoginForm() {
  return (
    <form className="mx-auto flex max-w-lg flex-col px-16 py-8">
      <div className="mb-4">
        <label htmlFor="username" className=" mb-2 ">
          Username:
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
        <label htmlFor="password" className="mb-2">
          Password:
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
        className="mx-auto mt-4 rounded-md bg-orange-500 px-8 py-2 hover:bg-orange-700"
      >
        <span className=" text-xl font-bold text-black">LOGIN</span>
      </button>
    </form>
  );
}

export default LoginForm;
