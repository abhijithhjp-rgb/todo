import App from "./App";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { UserProvider } from "./context/authContext";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
    <UserProvider>
        <App />
    </UserProvider>
    </StrictMode>
);