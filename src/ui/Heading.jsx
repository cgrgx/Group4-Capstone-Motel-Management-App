import PropTypes from "prop-types";

const Heading = ({ as: Element = "h1", children }) => {
  // Map the heading levels to corresponding Tailwind classes
  const headingClasses = {
    h1: "text-3xl font-semibold",
    h2: "text-2xl font-semibold",
    h3: "text-2xl font-medium",
    h4: "text-3xl font-semibold text-center",
  };

  return (
    <Element className={`leading-5 ${headingClasses[Element]}`}>
      {children}
    </Element>
  );
};
Heading.propTypes = {
  as: PropTypes.elementType,
  children: PropTypes.node,
};

export default Heading;
