import { ModeToggle } from "@/components/mode-toggle"
import { SidebarTrigger } from "@/components/ui/sidebar"

function AppNavbar() {
  return (
    <nav className="absolute w-full flex items-center justify-between px-2 py-1 border-b bg-background">
        <SidebarTrigger />
        <ModeToggle />
    </nav>
  )
}

export default AppNavbar