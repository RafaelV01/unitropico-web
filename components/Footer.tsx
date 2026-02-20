import React from 'react';

const Footer: React.FC = () => {
  return (
    <>
      <footer className="bg-primary text-white py-4 relative z-20 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <span className="font-bold text-lg tracking-wider">Unitrópico</span>
            <div className="hidden sm:block h-4 w-px bg-white/30"></div>
            <div className="bg-accent/90 text-primary px-4 py-1 parrafo font-bold uppercase tracking-wider rounded shadow-sm">
              — Vigilada MinEducación —
            </div>
          </div>
          <div className="parrafo opacity-80 text-center sm:text-right">
            <p>© {new Date().getFullYear()} Unitrópico. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
      <div className="h-1.5 w-full bg-gradient-to-r from-primary via-accent to-primary"></div>
    </>
  );
};

export default Footer;