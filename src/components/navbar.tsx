import { Link, useNavigate } from "react-router-dom";
import { ShoppingBasket } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/components/ui/use-toast";
import Combobox from "@/components/combobox";
import Cart from "@/components/cart";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useToken } from "@/utils/contexts/token";
import { useTheme } from "@/utils/contexts/theme";

const Navbar = () => {
  const { token, user, changeToken } = useToken();
  const { setTheme } = useTheme();
  const navigate = useNavigate();
  const { toast } = useToast();

  function handleLogout() {
    changeToken();
    toast({
      description: "Logout Successfully",
    });
  }

  return (
    <header
      className="w-full sticky top-0 bg-white/90 dark:bg-black/90 z-50"
      aria-label="navbar"
    >
      <nav className="mx-auto flex container items-center justify-between p-6 lg:px-8 [&>*]:font-semibold [&>*]:leading-6 [&>*]:text-gray-900 [&>*]:dark:text-white">
        <Link className="text-xl tracking-widest" to="/">
          BookQuest
        </Link>
        <div className="flex gap-4 items-center justify-end">
          <Combobox placeholder="Search books..." />
          {token && user?.role === "user" ? (
            <Cart>
              <ShoppingBasket />
            </Cart>
          ) : null}
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage
                  src={user?.profile_picture}
                  alt={user?.full_name}
                />
                <AvatarFallback>BQ</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-44" align="end" forceMount>
              {token ? (
                <>
                  <DropdownMenuLabel>Hi! {user?.full_name}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/profile")}>
                    Profile
                  </DropdownMenuItem>
                  {user?.role === "user" ? (
                    <DropdownMenuItem
                      onClick={() => navigate("/history-borrow")}
                    >
                      My Books
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                      Dashboard
                    </DropdownMenuItem>
                  )}
                </>
              ) : null}
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Theme</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem onClick={() => setTheme("light")}>
                      Light
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                      Dark
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("system")}>
                      System
                    </DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuSeparator />
              {token ? (
                <DropdownMenuItem onClick={() => handleLogout()}>
                  Logout
                </DropdownMenuItem>
              ) : (
                <>
                  <DropdownMenuItem onClick={() => navigate("/login")}>
                    Login
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate("/register")}>
                    Register
                  </DropdownMenuItem>
                </>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
