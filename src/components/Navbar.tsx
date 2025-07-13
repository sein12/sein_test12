import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b bg-white">
      <div className="flex items-center gap-6">
        <div className="text-xl font-bold">MyApp</div>
        <NavigationMenu>
          <NavigationMenuList className="gap-4">
            <NavigationMenuItem>
              <NavigationMenuLink href="/" className="text-sm font-medium">
                A Page
              </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink
                href="/profile"
                className="text-sm font-medium"
              >
                B Page
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
