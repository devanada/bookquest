import { Link, useNavigate } from "react-router-dom";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Combobox from "@/components/combobox";
import { useToast } from "@/components/ui/use-toast";

import { useToken } from "@/utils/contexts/token";

const Navbar = () => {
  const { token, user, changeToken } = useToken();
  const navigate = useNavigate();
  const { toast } = useToast();

  function handleLogout() {
    changeToken();
    toast({
      description: "Logout Successfully",
    });
  }

  return (
    <header className="w-full sticky top-0 bg-white/90" aria-label="navbar">
      <nav className="mx-auto flex container items-center justify-between p-6 lg:px-8 [&>*]:text-sm [&>*]:font-semibold [&>*]:leading-6 [&>*]:text-gray-900">
        <Link to="/">BookQuest</Link>
        <div className="flex gap-4 items-center justify-end">
          <Combobox placeholder="Search books..." />
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src={user.profile_picture} />
                <AvatarFallback>N</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {token ? (
                <>
                  <DropdownMenuLabel>Hi! {user.full_name}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => navigate("/profile")}>
                    Profile
                  </DropdownMenuItem>
                  {user.role === "user" ? (
                    <DropdownMenuItem
                      onClick={() => navigate("/history-borrow")}
                    >
                      My Books
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem
                      onClick={() => navigate("/history-borrow")}
                    >
                      Dashboard
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuItem onClick={() => handleLogout()}>
                    Logout
                  </DropdownMenuItem>
                </>
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
