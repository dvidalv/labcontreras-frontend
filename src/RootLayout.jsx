import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { initGA } from "./analytics/ga";
import GAListener from "./analytics/GAListener";

export default function RootLayout() {
  useEffect(() => {
    initGA();
  }, []);

  return (
    <>
      <GAListener />
      <Outlet />
    </>
  );
}