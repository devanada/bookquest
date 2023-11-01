import { ReactNode } from "react";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Readonly<Props>) => {
  return (
    <div className="w-full h-screen bg-white text-neutral-800 overflow-auto font-roboto flex flex-col">
      <Navbar />
      <div className="container mx-auto grow py-4 px-8">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
