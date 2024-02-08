import SettingsForm from "../features/settings/SettingsForm";
import Heading from "../ui/Heading";

function Settings() {
  return (
    <>
      <div className="flex">
        <Heading as="h4">Settings</Heading>
      </div>
      <SettingsForm />
    </>
  );
}

export default Settings;
