function Stat({ icon, title, value }) {
  return (
    <div className="flex justify-around gap-4 rounded-md border p-6 shadow-sm">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gray-200 p-2">
        {icon}
      </div>
      <div className="flex flex-col items-start justify-end gap-2 text-left font-poppins">
        <h4 className="self-start text-sm font-semibold uppercase tracking-wide text-gray-500">
          {title}
        </h4>
        <p className="text-2xl font-semibold">{value}</p>
      </div>
    </div>
  );
}

export default Stat;
