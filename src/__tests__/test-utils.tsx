import "./matchMedia.mock";
import { BrowserRouter } from "react-router-dom";
import { render } from "@testing-library/react";

import { ThemeProvider } from "@/utils/contexts/theme";
import { TokenProvider } from "@/utils/contexts/token";

const Providers = ({ children }: any) => {
  return (
    <BrowserRouter>
      <TokenProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </TokenProvider>
    </BrowserRouter>
  );
};

const customRender = (component: any) => {
  return render(component, {
    wrapper: Providers,
  });
};

export * from "@testing-library/react";
export { customRender as render };
