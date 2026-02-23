"use client";

import { useEffect } from "react";
import { useContactPanel } from "./ContactPanelContext";

export default function ContactAutoOpen() {
  const { open } = useContactPanel();

  useEffect(() => {
    open();
  }, [open]);

  return null;
}
