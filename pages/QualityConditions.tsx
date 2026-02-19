import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './QualityConditions.css';

const QualityConditions: React.FC = () => {
    const mainRef = useRef<HTMLElement>(null);

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // Handle Navbar visibility on scroll
    useEffect(() => {
        const mainElement = mainRef.current;
        const navbar = document.querySelector('nav');

        if (!mainElement || !navbar) return;

        navbar.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';

        const handleScroll = () => {
            const scrollTop = mainElement.scrollTop;
            const threshold = window.innerHeight * 0.1;

            if (scrollTop > threshold) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
        };

        mainElement.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            mainElement.removeEventListener('scroll', handleScroll);
            navbar.style.transform = '';
            navbar.style.transition = '';
        };
    }, []);

    return (
        <main ref={mainRef} className="fixed inset-0 z-40 h-screen w-full overflow-y-scroll snap-y snap-mandatory light-grid-bg font-montserrat scroll-smooth" style={{ color: '#00594E' }}>

            {/* ── Logo top-right (fixed, always visible) ── */}
            <div className="fixed top-4 right-6 z-50 pointer-events-none">
                <img
                    src="/img/logo_unitropico.png"
                    alt="Logo Unitrópico"
                    className="h-16 md:h-20 lg:h-24 w-auto object-contain opacity-90"
                />
            </div>

            {/* ── Persisten Background Image ── */}
            <div className="fixed inset-0 z-0 bg-white">
                <img
                    src="/img/background-1.jpg"
                    alt="AI Pattern Background"
                    className="w-full h-full object-cover opacity-40 mix-blend-multiply"
                />

                {/* Institutional Glows */}
                <div className="absolute inset-0 opacity-40"
                    style={{ background: 'radial-gradient(circle at 15% 15%, rgba(181, 161, 96, 0.2) 0%, transparent 50%)' }}></div>
                <div className="absolute inset-0 opacity-30"
                    style={{ background: 'radial-gradient(circle at 85% 85%, rgba(0, 89, 78, 0.15) 0%, transparent 50%)' }}></div>

                {/* Decorative Elements */}
                <div className="absolute top-1/2 left-1/2 w-[1100px] h-[1100px] rounded-full animate-spin-slow pointer-events-none opacity-20"
                    style={{ border: 'none', transform: 'translate(-50%, -50%)' }}></div>
                <div className="absolute top-1/2 left-1/2 w-[900px] h-[900px] rounded-full animate-spin-reverse border-dashed pointer-events-none opacity-20"
                    style={{ border: 'none', transform: 'translate(-50%, -50%)' }}></div>
            </div>

            {/* SECTION 1: Text + Partial Orbit */}
            <section className="relative w-full h-screen snap-start flex flex-col items-center justify-start pt-32 lg:pt-40 z-10">

                <div className="text-center mb-10 relative z-10 max-w-4xl mx-auto px-4">
                    <h1 className="text-5xl md:text-7xl font-montserrat font-black mb-4 tracking-tighter drop-shadow-sm" style={{ color: '#00594E' }}>
                        CONDICIONES DE <span style={{ color: '#B5A160' }}>CALIDAD</span>
                    </h1>
                    <div className="mx-auto w-24 h-[3px] rounded-full mb-4" style={{ backgroundColor: '#B5A160' }}></div>
                    <p className="max-w-xl mx-auto font-medium tracking-wide text-sm font-montserrat pt-4 mt-2" style={{ color: '#679C95', borderTop: '1px solid #CCDEDC' }}>
                        NAVEGUE EL COMPÁS ESTRATÉGICO DEL PROGRAMA DE INGENIERÍA EN INTELIGENCIA ARTIFICIAL
                    </p>

                    <div className="mt-8 animate-bounce" style={{ color: '#9ABDB8' }}>
                        <span className="material-symbols-outlined text-4xl">keyboard_double_arrow_down</span>
                        <p className="text-[10px] tracking-widest uppercase font-bold font-montserrat">Descubre Más</p>
                    </div>
                </div>

                {/* Partial Orbit Preview */}
                <div className="absolute bottom-[-400px] left-1/2 transform -translate-x-1/2 scale-75 opacity-50 pointer-events-none lg:block hidden">
                    <div className="w-[1000px] h-[1000px] rounded-full flex items-center justify-center" style={{ border: 'none' }}>
                        <div className="w-[700px] h-[700px] rounded-full border-dashed" style={{ border: 'none' }}></div>
                    </div>
                </div>

            </section>

            {/* SECTION 2: Full Orbit */}
            <section className="relative w-full h-screen snap-start flex flex-col items-center justify-center z-10 overflow-hidden">

                <div className="orbit-container hidden lg:block scale-[0.6] lg:scale-[0.65] xl:scale-75 2xl:scale-90 origin-center">

                    {/* Center core */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full flex flex-col items-center justify-center z-10 core-shadow overflow-hidden"
                        style={{ backgroundColor: '#ffffff', border: '1px solid #CCDEDC' }}>
                        <div className="absolute inset-0 z-0" style={{ background: 'linear-gradient(135deg, #ffffff 0%, #F0ECDF 100%)', opacity: 0.8 }}></div>
                        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
                            <span className="material-symbols-outlined text-6xl mb-2" style={{ color: '#00594E' }}>hub</span>
                            <span className="text-xs font-montserrat font-black tracking-widest" style={{ color: '#00594E' }}>UNITRÓPICO AI</span>
                            <div className="mt-4 w-16 h-0.5" style={{ backgroundColor: '#B5A160' }}></div>
                        </div>
                    </div>

                    {/* Orbit ring decorations */}
                    <div className="absolute top-1/2 left-1/2 w-[760px] h-[760px] rounded-full pointer-events-none"
                        style={{ border: 'none', transform: 'translate(-50%, -50%)' }}></div>
                    <div className="absolute top-1/2 left-1/2 w-[560px] h-[560px] rounded-full pointer-events-none border-dashed"
                        style={{ border: 'none', transform: 'translate(-50%, -50%)' }}></div>

                    {/* ── Orbit cards — each with its own explicit pos-N class ── */}
                    <Link className="orbit-item pos-1 group w-56" to="/quality-conditions/01">
                        <div className="relative bg-white p-6 rounded-lg hover:bg-[#00594E] hover:text-white transition-all duration-300 elegant-shadow group-hover:shadow-xl group-hover:-translate-y-1" style={{ border: '1px solid #CCDEDC' }}>
                            <div className="absolute -top-3 -left-3 text-white text-base font-black w-8 h-8 flex items-center justify-center rounded-full font-montserrat z-20 shadow-md" style={{ backgroundColor: '#B5A160', border: '2px solid #fff' }}>01</div>
                            <div className="flex flex-col items-center text-center">
                                <span className="material-symbols-outlined text-3xl mb-2 group-hover:text-white group-hover:scale-110 transition-transform" style={{ color: '#00594E' }}>description</span>
                                <h3 className="text-xl font-montserrat font-black text-gray-800 group-hover:text-white">Denominación</h3>
                                <div className="h-0.5 w-8 group-hover:w-full transition-all duration-500 mt-2" style={{ backgroundColor: '#CCDEDC' }}></div>
                            </div>
                        </div>
                    </Link>

                    <Link className="orbit-item pos-2 group w-56" to="/quality-conditions/02">
                        <div className="relative bg-white p-6 rounded-lg hover:bg-[#00594E] hover:text-white transition-all duration-300 elegant-shadow group-hover:shadow-xl group-hover:-translate-y-1" style={{ border: '1px solid #CCDEDC' }}>
                            <div className="absolute -top-3 -left-3 text-white text-base font-black w-8 h-8 flex items-center justify-center rounded-full font-montserrat z-20 shadow-md" style={{ backgroundColor: '#B5A160', border: '2px solid #fff' }}>02</div>
                            <div className="flex flex-col items-center text-center">
                                <span className="material-symbols-outlined text-3xl mb-2 group-hover:text-white group-hover:scale-110 transition-transform" style={{ color: '#00594E' }}>lightbulb</span>
                                <h3 className="text-xl font-montserrat font-black text-gray-800 group-hover:text-white">Justificación</h3>
                                <div className="h-0.5 w-8 group-hover:w-full transition-all duration-500 mt-2" style={{ backgroundColor: '#CCDEDC' }}></div>
                            </div>
                        </div>
                    </Link>

                    <Link className="orbit-item pos-3 group w-56" to="/quality-conditions/03">
                        <div className="relative bg-white p-6 rounded-lg hover:bg-[#00594E] hover:text-white transition-all duration-300 elegant-shadow group-hover:shadow-xl group-hover:-translate-y-1" style={{ border: '1px solid #CCDEDC' }}>
                            <div className="absolute -top-3 -left-3 text-white text-base font-black w-8 h-8 flex items-center justify-center rounded-full font-montserrat z-20 shadow-md" style={{ backgroundColor: '#B5A160', border: '2px solid #fff' }}>03</div>
                            <div className="flex flex-col items-center text-center">
                                <span className="material-symbols-outlined text-3xl mb-2 group-hover:text-white group-hover:scale-110 transition-transform" style={{ color: '#00594E' }}>school</span>
                                <h3 className="text-xl font-montserrat font-black text-gray-800 group-hover:text-white">Curricular</h3>
                                <div className="h-0.5 w-8 group-hover:w-full transition-all duration-500 mt-2" style={{ backgroundColor: '#CCDEDC' }}></div>
                            </div>
                        </div>
                    </Link>

                    <Link className="orbit-item pos-4 group w-56" to="/quality-conditions/04">
                        <div className="relative bg-white p-6 rounded-lg hover:bg-[#00594E] hover:text-white transition-all duration-300 elegant-shadow group-hover:shadow-xl group-hover:-translate-y-1" style={{ border: '1px solid #CCDEDC' }}>
                            <div className="absolute -top-3 -left-3 text-white text-base font-black w-8 h-8 flex items-center justify-center rounded-full font-montserrat z-20 shadow-md" style={{ backgroundColor: '#B5A160', border: '2px solid #fff' }}>04</div>
                            <div className="flex flex-col items-center text-center">
                                <span className="material-symbols-outlined text-3xl mb-2 group-hover:text-white group-hover:scale-110 transition-transform" style={{ color: '#00594E' }}>calendar_month</span>
                                <h3 className="text-xl font-montserrat font-black text-gray-800 group-hover:text-white">Organización</h3>
                                <div className="h-0.5 w-8 group-hover:w-full transition-all duration-500 mt-2" style={{ backgroundColor: '#CCDEDC' }}></div>
                            </div>
                        </div>
                    </Link>

                    <Link className="orbit-item pos-5 group w-56" to="/quality-conditions/05">
                        <div className="relative bg-white p-6 rounded-lg hover:bg-[#00594E] hover:text-white transition-all duration-300 elegant-shadow group-hover:shadow-xl group-hover:-translate-y-1" style={{ border: '1px solid #CCDEDC' }}>
                            <div className="absolute -top-3 -left-3 text-white text-base font-black w-8 h-8 flex items-center justify-center rounded-full font-montserrat z-20 shadow-md" style={{ backgroundColor: '#B5A160', border: '2px solid #fff' }}>05</div>
                            <div className="flex flex-col items-center text-center">
                                <span className="material-symbols-outlined text-3xl mb-2 group-hover:text-white group-hover:scale-110 transition-transform" style={{ color: '#00594E' }}>biotech</span>
                                <h3 className="text-xl font-montserrat font-black text-gray-800 group-hover:text-white">Investigación</h3>
                                <div className="h-0.5 w-8 group-hover:w-full transition-all duration-500 mt-2" style={{ backgroundColor: '#CCDEDC' }}></div>
                            </div>
                        </div>
                    </Link>

                    <Link className="orbit-item pos-6 group w-56" to="/quality-conditions/06">
                        <div className="relative bg-white p-6 rounded-lg hover:bg-[#00594E] hover:text-white transition-all duration-300 elegant-shadow group-hover:shadow-xl group-hover:-translate-y-1" style={{ border: '1px solid #CCDEDC' }}>
                            <div className="absolute -top-3 -left-3 text-white text-base font-black w-8 h-8 flex items-center justify-center rounded-full font-montserrat z-20 shadow-md" style={{ backgroundColor: '#B5A160', border: '2px solid #fff' }}>06</div>
                            <div className="flex flex-col items-center text-center">
                                <span className="material-symbols-outlined text-3xl mb-2 group-hover:text-white group-hover:scale-110 transition-transform" style={{ color: '#00594E' }}>handshake</span>
                                <h3 className="text-xl font-montserrat font-black text-gray-800 group-hover:text-white">Sector</h3>
                                <div className="h-0.5 w-8 group-hover:w-full transition-all duration-500 mt-2" style={{ backgroundColor: '#CCDEDC' }}></div>
                            </div>
                        </div>
                    </Link>

                    <Link className="orbit-item pos-7 group w-56" to="/quality-conditions/07">
                        <div className="relative bg-white p-6 rounded-lg hover:bg-[#00594E] hover:text-white transition-all duration-300 elegant-shadow group-hover:shadow-xl group-hover:-translate-y-1" style={{ border: '1px solid #CCDEDC' }}>
                            <div className="absolute -top-3 -left-3 text-white text-base font-black w-8 h-8 flex items-center justify-center rounded-full font-montserrat z-20 shadow-md" style={{ backgroundColor: '#B5A160', border: '2px solid #fff' }}>07</div>
                            <div className="flex flex-col items-center text-center">
                                <span className="material-symbols-outlined text-3xl mb-2 group-hover:text-white group-hover:scale-110 transition-transform" style={{ color: '#00594E' }}>groups</span>
                                <h3 className="text-xl font-montserrat font-black text-gray-800 group-hover:text-white">Docentes</h3>
                                <div className="h-0.5 w-8 group-hover:w-full transition-all duration-500 mt-2" style={{ backgroundColor: '#CCDEDC' }}></div>
                            </div>
                        </div>
                    </Link>

                    <Link className="orbit-item pos-8 group w-56" to="/quality-conditions/08">
                        <div className="relative bg-white p-6 rounded-lg hover:bg-[#00594E] hover:text-white transition-all duration-300 elegant-shadow group-hover:shadow-xl group-hover:-translate-y-1" style={{ border: '1px solid #CCDEDC' }}>
                            <div className="absolute -top-3 -left-3 text-white text-base font-black w-8 h-8 flex items-center justify-center rounded-full font-montserrat z-20 shadow-md" style={{ backgroundColor: '#B5A160', border: '2px solid #fff' }}>08</div>
                            <div className="flex flex-col items-center text-center">
                                <span className="material-symbols-outlined text-3xl mb-2 group-hover:text-white group-hover:scale-110 transition-transform" style={{ color: '#00594E' }}>computer</span>
                                <h3 className="text-xl font-montserrat font-black text-gray-800 group-hover:text-white">Medios</h3>
                                <div className="h-0.5 w-8 group-hover:w-full transition-all duration-500 mt-2" style={{ backgroundColor: '#CCDEDC' }}></div>
                            </div>
                        </div>
                    </Link>

                    <Link className="orbit-item pos-9 group w-56" to="/quality-conditions/09">
                        <div className="relative bg-white p-6 rounded-lg hover:bg-[#00594E] hover:text-white transition-all duration-300 elegant-shadow group-hover:shadow-xl group-hover:-translate-y-1" style={{ border: '1px solid #CCDEDC' }}>
                            <div className="absolute -top-3 -left-3 text-white text-base font-black w-8 h-8 flex items-center justify-center rounded-full font-montserrat z-20 shadow-md" style={{ backgroundColor: '#B5A160', border: '2px solid #fff' }}>09</div>
                            <div className="flex flex-col items-center text-center">
                                <span className="material-symbols-outlined text-3xl mb-2 group-hover:text-white group-hover:scale-110 transition-transform" style={{ color: '#00594E' }}>apartment</span>
                                <h3 className="text-xl font-montserrat font-black text-gray-800 group-hover:text-white">Infraestructura</h3>
                                <div className="h-0.5 w-8 group-hover:w-full transition-all duration-500 mt-2" style={{ backgroundColor: '#CCDEDC' }}></div>
                            </div>
                        </div>
                    </Link>

                </div>

                {/* Mobile grid */}
                <div className="lg:hidden w-full px-6 grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 pb-32">
                    {[
                        { id: "01", title: "Denominación" },
                        { id: "02", title: "Justificación" },
                        { id: "03", title: "Aspectos Curriculares" },
                        { id: "04", title: "Organización" },
                        { id: "05", title: "Investigación" },
                        { id: "06", title: "Relación Sector" },
                        { id: "07", title: "Personal Docente" },
                        { id: "08", title: "Medios Educativos" },
                        { id: "09", title: "Infraestructura" }
                    ].map((item) => (
                        <Link key={item.id} className="block p-6 rounded-xl transition-all duration-300" style={{ backgroundColor: '#ffffff', border: '1px solid #CCDEDC', boxShadow: '0 2px 12px rgba(0,89,78,0.08)' }} to={`/quality-conditions/${item.id}`}>
                            <div className="flex items-center gap-4">
                                <span className="font-montserrat font-black text-xl" style={{ color: '#B5A160' }}>{item.id}</span>
                                <h3 className="font-montserrat font-bold" style={{ color: '#00594E' }}>{item.title}</h3>
                            </div>
                        </Link>
                    ))}
                </div>

            </section>
        </main>
    );
};

export default QualityConditions;
