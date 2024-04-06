import Row from "../ui/Row";
import Heading from "../ui/Heading";

import ServicesTable from "@/features/services/ServiceTable";

function Services() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Services</Heading>
        {/* <AddGuest /> */}
        {/* <CabinTableOperations /> */}
      </Row>
      <Row>
        <ServicesTable />
      </Row>
    </>
  );
}

export default Services;
