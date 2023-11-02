import ReactDOM from "react-dom/client";

import { Toaster } from "@/components/ui/toaster";
import App from "@/routes";

import { TokenProvider } from "@/utils/contexts/token";
import "@/styles/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <TokenProvider>
    <App />
    <Toaster />
  </TokenProvider>
);
