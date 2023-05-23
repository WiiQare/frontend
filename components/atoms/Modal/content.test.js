import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import ContentModal from "./content";
import { SessionProvider } from "next-auth/react";
import { Dialog, Transition } from "@headlessui/react";

describe("ContentModal", () => {
  let component;
  beforeEach(() => {
    const res = render(
      <SessionProvider session={{ user: { name: "John Doe" } }}>
        <Transition appear show={true}>
          <Dialog onClose={() => {}}>
            <ContentModal>
              <div>Content</div>
            </ContentModal>
          </Dialog>
        </Transition>
      </SessionProvider>
    );
    component = res.container;
  });

  test("should render ContentModal component", () => {
    expect(component).toMatchSnapshot();
  });
});
