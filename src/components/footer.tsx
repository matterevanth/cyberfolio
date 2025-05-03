export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/40 bg-background mt-16 md:mt-24">
      <div className="container mx-auto flex flex-col items-center justify-center py-8 px-4 md:flex-row md:justify-between md:px-8 lg:px-12">
        <p className="text-center text-sm text-muted-foreground md:text-left">
          &copy; {currentYear} Revanth Matte. All rights reserved.
        </p>
        <p className="mt-3 text-center text-xs text-muted-foreground/70 md:mt-0 md:text-left">
          Inspired by creativity, built with Next.js & ShadCN UI.
        </p>
      </div>
    </footer>
  );
}
