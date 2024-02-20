import { useUser } from "../features/authentication/useUser";
import SettingsForm from "../features/settings/SettingsForm";
import Heading from "../ui/Heading";

function Settings() {
  const { isAdmin } = useUser();
  return (
    <>
      <div className="flex">
        <Heading as="h4">Settings</Heading>
      </div>
      {isAdmin ? (
        <SettingsForm />
      ) : (
        <p className="text-lg text-red-500">
          Users are not allowed to access this page
        </p>
      )}
    </>
  );
}

export default Settings;
