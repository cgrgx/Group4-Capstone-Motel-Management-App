import { createContext, useContext } from "react";

function Table({ columns, children }) {
  return (
    <div className="overflow-hidden rounded border border-gray-200">
      {children}
    </div>
  );
}

function Header({ children }) {
  return (
    <div className="grid grid-cols-{{columns}} gap-2.4 p-1.6 bg-gray-50 border-b border-gray-100 text-uppercase font-semibold text-gray-600">
      {children}
    </div>
  );
}

function Row({ children }) {
  return (
    <div className="grid grid-cols-{{columns}} gap-2.4 p-1.2">{children}</div>
  );
}

function Body({ data, render }) {
  if (!data.length)
    return (
      <p className="text-1.6 mt-2.4 text-center font-semibold text-gray-600">
        No data to show at the moment
      </p>
    );
  return <section className="mt-0.4">{data.map(render)}</section>;
}

function Footer({ children }) {
  return (
    <footer className="p-1.2 flex justify-center bg-gray-50">
      {React.Children.count(children) > 0 && children}
    </footer>
  );
}

const TableContext = createContext();

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
Table.Footer = Footer;

export default Table;
