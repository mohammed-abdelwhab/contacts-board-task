import type { Contact } from "../types";

export type ContactAction =
  | { type: "contact/updated"; id: string; changes: Partial<Pick<Contact, "stage" | "notes">> };

function shallowEqual(a: Contact, b: Contact): boolean {
  return a.stage === b.stage && a.notes === b.notes;
}

export function contactsReducer(state: Contact[], action: ContactAction): Contact[] {
  switch (action.type) {
    case "contact/updated": {
      const { id, changes } = action;
      const index = state.findIndex((c) => c.id === id);
      if (index === -1) {
        return state;
      }
      const contact = state[index];
      const nextContact = { ...contact, ...changes };
      if (shallowEqual(nextContact, contact)) {
        return state;
      }
      const nextState = [...state];
      nextState[index] = nextContact;
      return nextState;
    }
    default:
      return state;
  }
}