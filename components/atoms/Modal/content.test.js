import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
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
});
