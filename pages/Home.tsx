import React from 'react';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  return (
    <main className="flex-grow relative overflow-hidden flex flex-col min-h-[calc(100vh-5rem)] bg-white font-montserrat">

      {/* Subtle top accent bar */}
      <div className="absolute top-0 right-0 w-1/3 h-[3px] z-20" style={{ backgroundColor: '#B5A160' }}></div>

      {/* ── Full-bleed background image (lateral.webp fades on the right) ── */}
      <div className="absolute inset-0 z-0">
        <img
          src="/img/lateral.webp"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover object-left animate-pulse-subtle origin-left"
        />
        {/* Right-side fade so content panel stays readable */}
        <div className="absolute inset-0"
          style={{ background: 'linear-gradient(to right, transparent 35%, rgba(255,255,255,0.82) 55%, #ffffff 72%)' }}>
        </div>
      </div>

      {/* ── Content layer ── */}
      <div className="relative z-10 w-full flex flex-col lg:flex-row flex-grow">

        {/* Left spacer — lets the image show through on desktop */}
        <div className="hidden lg:block lg:w-[52%] flex-shrink-0" />

        {/* ── Right: Content panel ── */}
        <div className="w-full lg:w-[48%] flex flex-col justify-center px-8 py-12 lg:px-14 xl:px-20">

          {/* Faculty label */}
          <div className="mb-6 hidden lg:block">
            <p className="font-semibold text-lg tracking-wide font-montserrat mb-2" style={{ color: '#00594E' }}>
              Facultad de Ingenierías
            </p>
            <div className="h-[3px] w-16 rounded-full" style={{ backgroundColor: '#B5A160' }}></div>
          </div>

          {/* Mobile faculty label */}
          <div className="mb-4 lg:hidden">
            <p className="font-semibold text-base tracking-wide font-montserrat" style={{ color: '#00594E' }}>
              Facultad de Ingenierías
            </p>
            <div className="h-[3px] w-12 rounded-full mt-1" style={{ backgroundColor: '#B5A160' }}></div>
          </div>

          {/* Year badge + Title */}
          <div className="flex flex-row items-center gap-5 mb-8">
            {/* Badge */}
            <div
              className="flex-shrink-0 flex items-center justify-center px-5 py-4 rounded shadow-lg hover:-translate-y-1 transition-transform cursor-default"
              style={{ backgroundColor: '#B5A160' }}
            >
              <span className="text-white text-2xl font-black tracking-wider font-montserrat">2026</span>
            </div>

            {/* Divider */}
            <div className="w-px h-14 flex-shrink-0" style={{ backgroundColor: '#CCDEDC' }}></div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl xl:text-5xl font-black leading-tight font-montserrat" style={{ color: '#00594E' }}>
              INGENIERÍA EN<br />
              <span style={{ color: '#347B72' }}>INTELIGENCIA</span><br />
              <span className="text-gray-800">ARTIFICIAL</span>
            </h1>
          </div>

          {/* Description */}
          <p className="text-sm lg:text-base leading-relaxed mb-8 max-w-sm font-montserrat font-light"
            style={{ color: '#347B72' }}>
            Fórmate como líder en la revolución tecnológica. Diseña, implementa y gestiona sistemas
            inteligentes que transformarán el futuro de la industria y la sociedad en la Orinoquia y el mundo.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mb-10">
            <Link
              to="/quality-conditions"
              className="flex items-center gap-2 px-6 py-3 rounded font-semibold font-montserrat border-2 transition-all duration-200 hover:text-white"
              style={{ borderColor: '#B5A160', color: '#B5A160' }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.backgroundColor = '#B5A160'; el.style.color = '#fff'; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.backgroundColor = 'transparent'; el.style.color = '#B5A160'; }}
            >
              <span>Condiciones de Calidad</span>
            </Link>
            {/* <Link
              to="/editor"
              className="flex items-center gap-2 px-6 py-3 rounded font-medium font-montserrat border-2 transition-all duration-200"
              style={{ borderColor: '#9ABDB8', color: '#679C95' }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.backgroundColor = '#679C95'; el.style.color = '#fff'; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.backgroundColor = 'transparent'; el.style.color = '#679C95'; }}
            >
              <span>Editor MVP</span>
            </Link> */}
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-6 pt-8" style={{ borderTop: '1px solid #CCDEDC' }}>
            <div className="flex flex-col cursor-default">
              <span className="font-black text-xl font-montserrat" style={{ color: '#B5A160' }}>9</span>
              <span className="text-xs uppercase tracking-widest font-bold font-montserrat mt-0.5" style={{ color: '#679C95' }}>Semestres</span>
            </div>
            <div className="flex flex-col cursor-default">
              <span className="font-black text-xl font-montserrat" style={{ color: '#B5A160' }}>Presencial</span>
              <span className="text-xs uppercase tracking-widest font-bold font-montserrat mt-0.5" style={{ color: '#679C95' }}>Modalidad</span>
            </div>
            <div className="flex flex-col cursor-default">
              <span className="font-black text-xl font-montserrat" style={{ color: '#B5A160' }}>Yopal</span>
              <span className="text-xs uppercase tracking-widest font-bold font-montserrat mt-0.5" style={{ color: '#679C95' }}>Sede</span>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
};

export default Home;