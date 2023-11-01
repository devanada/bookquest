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

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <header className="w-full sticky top-0 bg-white" aria-label="navbar">
      <nav className="mx-auto flex container items-center justify-between p-6 lg:px-8 [&>*]:text-sm [&>*]:font-semibold [&>*]:leading-6 [&>*]:text-gray-900">
        <Link to="/">BookQuest</Link>
        <div className="flex gap-4 items-center justify-end">
          <Combobox placeholder="Search books..." />
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src="https://github.com/devanada.png" />
                <AvatarFallback>N</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/profile")}>
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/history-borrow")}>
                My Books
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/login")}>
                Login
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate("/register")}>
                Register
              </DropdownMenuItem>
              <DropdownMenuItem>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
