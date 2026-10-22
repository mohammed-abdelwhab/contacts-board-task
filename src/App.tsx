import { ContactsProvider } from "./features/contacts/state/ContactsContext";
import { ContactsPage } from "./features/contacts/ContactsPage";

export default function App() {
  return (
    <ContactsProvider>
      <ContactsPage />
    </ContactsProvider>
  );
}