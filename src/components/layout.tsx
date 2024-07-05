import { useLoaderData } from "react-router-dom";
import { ReactNode } from "react";
import clsx from "clsx";

import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

import useTitle from "@/utils/hooks/use-title";

interface Props {
  children: ReactNode;
  centerY?: boolean;
  centerX?: boolean;
}

const Layout = (props: Readonly<Props>) => {
  const { children, centerY = false, centerX = false } = props;
  const loaderData = useLoaderData() as string;
  useTitle(loaderData);

  return (
    <div className="w-full h-screen bg-white dark:bg-black text-gray-900 dark:text-white overflow-auto font-roboto flex flex-col">
      <Navbar />
      <div
        className={clsx(
          "container mx-auto grow py-4 px-8 flex flex-col",
          centerY && "justify-center",
          centerX && "items-center"
        )}
        data-testid="content-container"
      >
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
