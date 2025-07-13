import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b bg-white">
      <div className="flex items-center gap-6">
        <div className="text-xl font-bold">MyApp</div>
        <NavigationMenu>
          <NavigationMenuList className="gap-4">
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  to="/A"
                  className={`text-sm font-medium text-gray-600 hover:text-black ${
                    location.pathname === "/A"
                      ? "underline underline-offset-8 decoration-2 text-blue-600 font-semibold"
                      : ""
                  }`}
                >
                  A Page
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  to="/B"
                  className={`text-sm font-medium text-gray-600 hover:text-black ${
                    location.pathname === "/B"
                      ? "underline underline-offset-8 decoration-2 text-blue-600 font-semibold"
                      : ""
                  }`}
                >
                  B Page
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      <NavigationMenu>
        <NavigationMenuList className="gap-4">
          <NavigationMenuItem>
            <NavigationMenuLink
              href="/logout"
              className="text-sm font-medium text-red-600"
            >
              로그아웃
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </nav>
  );
}
