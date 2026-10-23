import { contactsReducer, type ContactAction } from "./contactsReducer";
import { CONTACTS } from "../data/contacts";

describe("contactsReducer", () => {
  const initialState = CONTACTS;

  it("updates stage for a known id", () => {
    const action: ContactAction = {
      type: "contact/updated",
      id: "c-03",
      changes: { stage: "Qualified" },
    };
    const next = contactsReducer(initialState, action);
    const updated = next.find((c) => c.id === "c-03");
    expect(updated?.stage).toBe("Qualified");
  });

  it("updates notes for a known id", () => {
    const action: ContactAction = {
      type: "contact/updated",
      id: "c-03",
      changes: { notes: "Updated notes" },
    };
    const next = contactsReducer(initialState, action);
    const updated = next.find((c) => c.id === "c-03");
    expect(updated?.notes).toBe("Updated notes");
  });

  it("returns same state reference for unknown id", () => {
    const action: ContactAction = {
      type: "contact/updated",
      id: "unknown",
      changes: { stage: "Qualified" },
    };
    const next = contactsReducer(initialState, action);
    expect(next).toBe(initialState);
  });

  it("keeps other contacts untouched", () => {
    const action: ContactAction = {
      type: "contact/updated",
      id: "c-03",
      changes: { stage: "Qualified" },
    };
    const next = contactsReducer(initialState, action);
    const c01 = next.find((c) => c.id === "c-01");
    const c02 = next.find((c) => c.id === "c-02");
    expect(c01?.stage).toBe("Qualified");
    expect(c02?.stage).toBe("Qualified");
  });

  it("contact count unchanged and ids unique after updates", () => {
    const action: ContactAction = {
      type: "contact/updated",
      id: "c-03",
      changes: { stage: "Qualified", notes: "New notes" },
    };
    const next = contactsReducer(initialState, action);
    expect(next.length).toBe(initialState.length);
    const ids = next.map((c) => c.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it("returns same reference when changes produce no difference", () => {
    const action: ContactAction = {
      type: "contact/updated",
      id: "c-03",
      changes: { stage: "Prospect" },
    };
    const next = contactsReducer(initialState, action);
    const c03 = initialState.find((c) => c.id === "c-03");
    expect(c03?.stage).toBe("Prospect");
    expect(next).toBe(initialState);
  });
});