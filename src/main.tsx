import ReactDOM from "react-dom/client";

import { Toaster } from "@/components/ui/toaster";
import App from "@/routes";

import { TokenProvider } from "@/utils/contexts/token";
import { ThemeProvider } from "@/utils/contexts/theme";
import "@/styles/index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <TokenProvider>
    <ThemeProvider>
      <App />
      <Toaster />
    </ThemeProvider>
  </TokenProvider>
);
