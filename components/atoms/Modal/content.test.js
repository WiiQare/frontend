import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ContentModal from "./content";
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from 'react-query';
import { Dialog, Transition } from "@headlessui/react";

global.IntersectionObserver = class IntersectionObserver {
  observe() {
    return null;
  }
  disconnect() {
    return null;
  }
  unobserve() {
    return null;
  }
};

describe("ContentModal", () => {
  let component;
  const queryClient = new QueryClient(); // Create a new QueryClient
  beforeEach(() => {
    const res = render(
      <QueryClientProvider client={queryClient}> {/* Use QueryClientProvider here */}
        <SessionProvider 
          session={{ 
            user: { 
              name: "John Doe", 
              data: { 
                access_token: "mock_access_token" 
              } 
            } 
          }}
        >
          <Transition appear show={true}>
            <Dialog onClose={() => {}}>
              <ContentModal title="Test Title" tabs={['email', 'Phone']}>
                <div>Content</div>
              </ContentModal>
            </Dialog>
          </Transition>
        </SessionProvider>
      </QueryClientProvider> // Close QueryClientProvider here
    );
    component = res.container;
  });

  test("should render ContentModal component", () => {
    expect(component).toMatchSnapshot();
  });

  test("should render ContentModal component with title", () => {
    expect(screen.getByText("Test Title")).toBeInTheDocument();
  });

  test("should render ContentModal component with tabs", () => {
    expect(screen.getByText("email")).toBeInTheDocument();
    expect(screen.getByText("Phone")).toBeInTheDocument();
  });

  test("should render an email TextField", () => {
    expect(screen.getByLabelText(/Adresse e-mail d'un ami/i)).toBeInTheDocument();
  });

  test("should allow to add another email TextField", async () => {
    const addButton = screen.getByText("+ Ajouter un ami");
    fireEvent.click(addButton);
    
    await waitFor(() => expect(screen.getAllByLabelText(/Adresse e-mail d'un ami/i)).toHaveLength(2));
  });

  test("should allow to remove an added email TextField", async () => {
    const addButton = screen.getByText("+ Ajouter un ami");
    fireEvent.click(addButton);
  
    await waitFor(() => {
      const removeButtons = screen.getAllByRole('remove');
      fireEvent.click(removeButtons[0]);
    });
    await waitFor(() => expect(screen.getAllByLabelText(/Adresse e-mail d'un ami/i)).toHaveLength(1));
  });
  

  test("should render a phone number field", () => {
    const phoneTab = screen.getByText("Phone");
    fireEvent.click(phoneTab);
    
    expect(screen.getByLabelText(/Numéro de téléphone d'un ami/i)).toBeInTheDocument();
  });
});
