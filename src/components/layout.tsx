import { ReactNode } from "react";
import clsx from "clsx";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

interface Props {
  children: ReactNode;
  center?: boolean;
}

const Layout = ({ children, center = false }: Readonly<Props>) => {
  return (
    <div className="w-full h-screen bg-white text-neutral-800 overflow-auto font-roboto flex flex-col">
      <Navbar />
      <div
        className={clsx(
          "container mx-auto grow py-4 px-8 flex flex-col",
          center && "items-center justify-center"
        )}
      >
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
