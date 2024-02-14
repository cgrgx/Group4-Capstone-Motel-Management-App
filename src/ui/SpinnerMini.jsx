function SpinnerMini() {
  return (
    <div className="flex h-screen items-center justify-center bg-green-300">
      <div className="flex items-center justify-center ">
        <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-gray-900"></div>
      </div>
    </div>
  );
}

export default SpinnerMini;
