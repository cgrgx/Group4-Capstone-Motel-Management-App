import { useMoveBack } from "../hooks/useMoveBack";
import Heading from "../ui/Heading";
import Button from "../ui/Button";

function PageNotFound() {
  const moveBack = useMoveBack();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-16">
      <Heading as="h1">Page Not Found</Heading>
      <Button onClick={moveBack} size="large">
        &larr; Go Back
      </Button>
    </main>
  );
}

export default PageNotFound;
