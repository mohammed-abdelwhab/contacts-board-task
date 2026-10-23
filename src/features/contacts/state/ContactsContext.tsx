import { createContext, useContext, useReducer, type ReactNode } from "react";
import { contactsReducer } from "./contactsReducer";
import { CONTACTS } from "../data/contacts";
import type { Contact } from "../types";

interface ContactsContextValue {
  contacts: Contact[];
  updateContact: (id: string, changes: Partial<Contact>) => void;
}

const ContactsContext = createContext<ContactsContextValue | null>(null);

export function ContactsProvider({ children }: { children: ReactNode }) {
  const [contacts, dispatch] = useReducer(contactsReducer, CONTACTS);

  const updateContact = (id: string, changes: Partial<Contact>) => {
    dispatch({ type: "contact/updated", id, changes: changes as Partial<Pick<Contact, "stage" | "notes">> });
  };

  return (
    <ContactsContext.Provider value={{ contacts, updateContact }}>
      {children}
    </ContactsContext.Provider>
  );
}

export function useContacts(): ContactsContextValue {
  const context = useContext(ContactsContext);
  if (!context) {
    throw new Error("useContacts must be used within a ContactsProvider");
  }
  return context;
}