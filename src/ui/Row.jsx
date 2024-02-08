function Row({ type, children }) {
  // Determine the classes to apply based on the `type` prop
  const classes =
    type === "horizontal"
      ? "flex flex-row items-center justify-between"
      : "flex flex-col gap-4";

  return <div className={classes}>{children}</div>;
}

// Set default props for the component
Row.defaultProps = {
  type: "vertical",
};

export default Row;
