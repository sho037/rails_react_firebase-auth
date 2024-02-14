import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./firebaseSetting.ts";
import { FirebaseAuthProvider } from "./providers/FirebaseAuth";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <FirebaseAuthProvider>
      <App />
    </FirebaseAuthProvider>
  </React.StrictMode>
);
