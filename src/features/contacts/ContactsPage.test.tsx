import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ContactsProvider } from "./state/ContactsContext";
import { ContactsPage } from "./ContactsPage";
import { CONTACTS } from "./data/contacts";
import type { Stage } from "./types";

function renderWithProvider() {
  return render(
    <ContactsProvider>
      <ContactsPage />
    </ContactsProvider>
  );
}

async function openContactFromTable(user: ReturnType<typeof userEvent.setup>, contactId: string) {
  const button = screen.getByTestId(contactId);
  await user.click(button);
}

async function switchToBoard(user: ReturnType<typeof userEvent.setup>) {
  const boardTab = screen.getByRole("tab", { name: /board/i });
  await user.click(boardTab);
}

async function openPanelFromBoard(user: ReturnType<typeof userEvent.setup>, contactId: string) {
  const card = screen.getByTestId(contactId);
  await user.click(card);
}

async function setStageAndSave(user: ReturnType<typeof userEvent.setup>, stage: Stage) {
  const select = screen.getByLabelText(/stage/i);
  await user.selectOptions(select, stage);
  const saveButton = screen.getByRole("button", { name: /save/i });
  await user.click(saveButton);
}

function getColumnByStage(stage: Stage): HTMLElement {
  const header = screen.getByRole("heading", { name: stage });
  return header.closest('[data-column]')!;
}

describe("Contacts integration", () => {
  it("opens a contact from table, changes stage, saves, switches to Board, asserts card in new column", async () => {
    renderWithProvider();
    const user = userEvent.setup();

    // Open Priya (c-03) from table - currently Prospect
    await openContactFromTable(user, "c-03");

    // Verify panel opened
    await waitFor(() => expect(screen.getByRole("dialog")).toBeInTheDocument());

    // Change stage to Qualified and save
    await setStageAndSave(user, "Qualified");

    // Panel should close
    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());

    // Switch to Board view
    await switchToBoard(user);

    // Find the card in Qualified column
    const qualifiedColumn = getColumnByStage("Qualified");
    const card = qualifiedColumn.querySelector('[data-testid="c-03"]');
    expect(card).toBeInTheDocument();

    // Ensure it appears exactly once (not in Prospect anymore)
    const prospectColumn = getColumnByStage("Prospect");
    const oldCard = prospectColumn.querySelector('[data-testid="c-03"]');
    expect(oldCard).not.toBeInTheDocument();
  });

  it("edits then cancels, reopens, asserts saved values show not draft", async () => {
    renderWithProvider();
    const user = userEvent.setup();

    // Open Theo (c-02) from table - currently Qualified
    await openContactFromTable(user, "c-02");

    await waitFor(() => expect(screen.getByRole("dialog")).toBeInTheDocument());

    // Change stage and notes
    const select = screen.getByLabelText(/stage/i);
    await user.selectOptions(select, "Customer");

    const notesArea = screen.getByLabelText(/notes/i);
    await user.clear(notesArea);
    await user.type(notesArea, "Draft notes that should not persist");

    // Cancel
    const cancelButton = screen.getByRole("button", { name: /cancel/i });
    await user.click(cancelButton);

    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());

    // Reopen the same contact
    await openContactFromTable(user, "c-02");

    await waitFor(() => expect(screen.getByRole("dialog")).toBeInTheDocument());

    // Assert saved values show, not draft
    expect(screen.getByLabelText(/stage/i)).toHaveValue("Qualified");
    expect(screen.getByLabelText(/notes/i)).toHaveValue("Closing next week. Ask about the data residency addendum.");
  });

  it("moves a contact into empty Customer column and asserts empty state disappears", async () => {
    renderWithProvider();
    const user = userEvent.setup();

    // Switch to Board
    await switchToBoard(user);

    // Verify Customer column is empty initially
    const customerColumn = getColumnByStage("Customer");
    expect(customerColumn.querySelector('[data-testid]')).toBeNull();

    // Open a contact from another column (Mara in Qualified - c-01)
    await openPanelFromBoard(user, "c-01");

    await waitFor(() => expect(screen.getByRole("dialog")).toBeInTheDocument());

    // Move to Customer
    await setStageAndSave(user, "Customer");

    await waitFor(() => expect(screen.queryByRole("dialog")).not.toBeInTheDocument());

    // Customer column should now have the card, empty state gone
    const updatedCustomerColumn = getColumnByStage("Customer");
    const card = updatedCustomerColumn.querySelector('[data-testid="c-01"]');
    expect(card).toBeInTheDocument();
  });
});