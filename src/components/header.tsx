import Link from 'next/link';
import { Code } from 'lucide-react'; // Or a more relevant icon

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center mx-auto px-4 md:px-8 lg:px-12">
        <Link href="/" className="flex items-center space-x-2">
           {/* Simple text logo */}
           <span className="font-bold text-lg text-primary hover:text-accent transition-colors">
             RevPortfolio
           </span>
        </Link>
        {/* Optional: Add navigation links here if needed later */}
        {/* <nav className="ml-auto flex items-center space-x-4">
          <Link href="#projects" className="text-sm font-medium text-muted-foreground hover:text-primary">Projects</Link>
          <Link href="#contact" className="text-sm font-medium text-muted-foreground hover:text-primary">Contact</Link>
        </nav> */}
      </div>
    </header>
  );
}