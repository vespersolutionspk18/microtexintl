"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";

interface ContactPanelContextType {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const ContactPanelContext = createContext<ContactPanelContextType>({
  isOpen: false,
  open: () => {},
  close: () => {},
});

export function useContactPanel() {
  return useContext(ContactPanelContext);
}

export function ContactPanelProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <ContactPanelContext.Provider value={{ isOpen, open, close }}>
      {children}
    </ContactPanelContext.Provider>
  );
}
