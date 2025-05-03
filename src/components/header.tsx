import Link from 'next/link';
import { Menu } from 'lucide-react'; // Removed Code icon, kept Menu
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet'; // For mobile nav drawer, Added SheetClose
import React from 'react';


const navItems = [
  { name: 'About', href: '/' }, // Changed href to root for About/Home
  { name: 'Skills', href: '/' }, // Skills are on the homepage
  { name: 'Experience', href: '/experience' },
  { name: 'Projects', href: '/projects' },
  { name: 'Education', href: '/education' }, // Combined Education & Certs
  { name: 'Contact', href: '/contact' }, // Changed href
];

export default function Header() {

  return (
    // Terminal header style: No blur, solid background, border bottom
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background">
      <div className="container flex h-14 items-center justify-between mx-auto px-4 md:px-8 lg:px-12">
        <Link href="/" className="flex items-center space-x-2 mr-6">
           {/* Terminal style logo: foreground color, bold */}
           <span className="font-bold text-lg text-foreground hover:text-primary transition-colors">
             Revanth_Matte/&gt;
           </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-4">
           {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                // Terminal nav link style: muted foreground, hover foreground
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.name}
              </Link>
           ))}
        </nav>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <Sheet>
             <SheetTrigger asChild>
                {/* Terminal ghost button style */}
                <Button variant="ghost" size="icon" className="button-terminal-ghost text-foreground">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
             </SheetTrigger>
             {/* Ensure sheet content matches terminal style */}
             <SheetContent side="right" className="w-[250px] bg-background border-l border-border">
                <div className="flex flex-col space-y-5 p-6 pt-10">
                    {/* Add SheetClose to the logo link */}
                    <SheetClose asChild>
                        <Link href="/" className="flex items-center space-x-2 mb-4">
                            <span className="font-bold text-base text-foreground">
                                Revanth_Matte/&gt;
                            </span>
                        </Link>
                    </SheetClose>
                   {navItems.map((item) => (
                       <SheetClose key={item.name} asChild>
                            <Link
                                href={item.href}
                                className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
                            >
                                {item.name}
                            </Link>
                       </SheetClose>
                   ))}
                </div>
             </SheetContent>
          </Sheet>
        </div>

      </div>
    </header>
  );
}
