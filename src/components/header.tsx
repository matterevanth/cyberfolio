import Link from 'next/link';
import { Code, Menu } from 'lucide-react'; // Added Menu for potential mobile nav
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'; // For mobile nav drawer
import React from 'react';


const navItems = [
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

export default function Header() {

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between mx-auto px-4 md:px-8 lg:px-12">
        <Link href="/" className="flex items-center space-x-2 mr-6">
           {/* Simple text logo */}
           <span className="font-bold text-xl text-foreground hover:text-primary transition-colors">
             Revanth Matte
           </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
           {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
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
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
             </SheetTrigger>
             <SheetContent side="right" className="w-[250px] bg-background border-l border-border/40">
                <div className="flex flex-col space-y-6 p-6 pt-12">
                    <Link href="/" className="flex items-center space-x-2 mb-4">
                         <span className="font-bold text-lg text-foreground">
                           Revanth Matte
                         </span>
                    </Link>
                   {navItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
                        // TODO: Add onClick to close sheet after navigation
                      >
                        {item.name}
                      </Link>
                   ))}
                </div>
             </SheetContent>
          </Sheet>
        </div>

      </div>
    </header>
  );
}
