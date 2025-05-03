export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    // Terminal footer style: border top, solid background
    <footer className="border-t border-border/60 bg-background mt-16 md:mt-24">
      <div className="container mx-auto flex flex-col items-center justify-center py-6 px-4 md:flex-row md:justify-between md:px-8 lg:px-12">
        {/* Terminal text style: muted foreground, smaller size */}
        <p className="text-center text-xs text-muted-foreground md:text-left">
          &copy; {currentYear} Revanth Matte. All rights reserved.
        </p>
        {/* Terminal text style: dimmer muted foreground, very small size */}
        <p className="mt-2 text-center text-[10px] text-muted-foreground/60 md:mt-0 md:text-left">
          // Built with Next.js & ShadCN UI // Inspired by the command line
        </p>
      </div>
    </footer>
  );
}
