import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  
  // (Any JavaScript logic, like state for a mobile menu, would go here)

  return (
    <header>
      <div>
        
        {/* Left: Brand */}
        <Link href="/">BARIK DAVID BOLEY</Link>

        {/* Center: Navigation Links */}
        <nav>
          <Link href="#about">ABOUT</Link>
          <Link href="#projects">PROJECTS</Link>
        </nav>

        {/* Right: Action Button */}
        <div>
          <Button>DOWNLOAD RESUME</Button>
        </div>

      </div>
    </header>
  );
}