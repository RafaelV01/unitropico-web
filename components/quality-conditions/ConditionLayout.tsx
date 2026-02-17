import React, { useState, useEffect } from 'react';
import {
    ArrowLeft,
    Menu,
    X,
    ChevronRight,
    FileText
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { conditions } from '../../data/conditions';

// Utility for merging classes
function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}


interface SidebarItemProps {
    active: boolean;
    title: string;
    onClick: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
    active,
    title,
    onClick
}) => {
    return (
        <button
            onClick={onClick}
            className={cn(
                "w-full text-left px-4 py-3 rounded-xl flex items-center justify-between group transition-all duration-200",
                active
                    ? "bg-green-50 text-green-900 shadow-sm border border-green-100"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 border border-transparent"
            )}
        >
            <div className="flex items-center gap-3">
                <span className={cn(
                    "p-2 rounded-lg transition-colors",
                    active ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500 group-hover:bg-white group-hover:text-gray-700"
                )}>
                    <FileText size={18} />
                </span>
                <span className="font-medium text-sm">{title}</span>
            </div>
            {active && (
                <motion.div layoutId="active-indicator">
                    <ChevronRight size={16} className="text-green-600" />
                </motion.div>
            )}
        </button>
    );
};

interface ContentCardProps {
    title: string;
    subtitle: string;
    children: React.ReactNode;
    id: string;
}

const ContentCard: React.FC<ContentCardProps> = ({ title, subtitle, children, id }) => {
    const navigate = useNavigate();
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl border border-gray-100 shadow-xl shadow-gray-200/50 overflow-hidden h-full flex flex-col"
        >
            <div className="p-6 border-b border-gray-50 bg-gray-50/30 flex-shrink-0">
                <div className="flex items-center gap-2 mb-4 text-gray-400 text-sm font-medium">
                    <button onClick={() => navigate('/quality-conditions')} className="flex items-center gap-1 hover:text-green-700 transition-colors">
                        <ArrowLeft size={16} />
                        Volver
                    </button>
                    <span className="text-gray-300">|</span>
                    <span className="text-secondary font-bold font-montserrat">{id}</span>
                </div>
                <h2 className="text-3xl font-bold text-green-950 mb-2 font-montserrat tracking-tight">{title}</h2>
                <p className="text-gray-500 font-montserrat">{subtitle}</p>
            </div>

            <div className="p-6 flex-1 overflow-y-auto font-montserrat scroll-smooth" id="content-scroll-container">
                {children}
            </div>
        </motion.div>
    );
};

interface Section {
    id: string;
    title: string;
}

interface ConditionLayoutProps {
    children: React.ReactNode;
    activeId: string;
    title: string;
    description: string;
    sections?: Section[];
}

const ConditionLayout: React.FC<ConditionLayoutProps> = ({ children, activeId, title, description, sections = [] }) => {
    const [activeSection, setActiveSection] = useState<string>('');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleScrollTo = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        const container = document.getElementById('content-scroll-container');

        if (element && container) {
            // Calculate relative position within the scroll container
            const topPos = element.offsetTop - container.offsetTop;
            container.scrollTo({
                top: topPos - 20, // Offset for padding
                behavior: 'smooth'
            });
            setActiveSection(sectionId);
            setIsMobileMenuOpen(false);
        }
    };

    // Spy scroll logic could go here, but implementing robust spy scroll inside an overflow container requires
    // more complex event listening. For now, we set active on click.

    return (
        <div className="min-h-screen bg-[#F8FAFC] font-montserrat selection:bg-green-100 selection:text-green-900">

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-140px)] min-h-[600px] relative">

                    {/* Mobile Toggle */}
                    <div className="lg:hidden mb-4 flex justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                        <span className="font-bold text-gray-700">Contenido</span>
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 bg-gray-50 text-gray-600 rounded-lg"
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>

                    {/* Mobile Sidebar Drawer */}
                    <AnimatePresence>
                        {isMobileMenuOpen && (
                            <motion.div
                                initial={{ x: '-100%', opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: '-100%', opacity: 0 }}
                                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                                className="absolute top-20 left-0 right-0 z-50 bg-white shadow-2xl rounded-2xl border border-gray-100 p-4 lg:hidden max-h-[60vh] overflow-y-auto"
                            >
                                <div className="space-y-2">
                                    {sections.length > 0 ? sections.map((section) => (
                                        <SidebarItem
                                            key={section.id}
                                            active={activeSection === section.id}
                                            title={section.title}
                                            onClick={() => handleScrollTo(section.id)}
                                        />
                                    )) : (
                                        <p className="text-gray-400 text-center py-4 text-sm">No hay secciones definidas.</p>
                                    )}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>


                    {/* Desktop Sidebar (30%) */}
                    <aside className="hidden lg:flex w-[30%] flex-col gap-4">
                        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 h-full flex flex-col">
                            <div className="mb-6 px-2 pt-2 flex-1 overflow-y-auto">
                                <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Tabla de Contenidos</h2>
                                <div className="space-y-2">
                                    {sections.length > 0 ? sections.map((section) => (
                                        <SidebarItem
                                            key={section.id}
                                            active={activeSection === section.id}
                                            title={section.title}
                                            onClick={() => handleScrollTo(section.id)}
                                        />
                                    )) : (
                                        <div className="flex flex-col items-center justify-center h-40 text-gray-400 text-center">
                                            <FileText size={32} className="mb-2 opacity-50" />
                                            <p className="text-sm">Explora el contenido a la derecha.</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <div className="mt-auto p-4 bg-green-50 rounded-xl border border-green-100">
                                <h4 className="font-semibold text-green-900 text-sm mb-1">¿Necesitas ayuda?</h4>
                                <p className="text-xs text-green-700 mb-3">Contacta con admisiones.</p>
                            </div>
                        </div>
                    </aside>

                    {/* Right Content Area (70%) */}
                    <section className="w-full lg:w-[70%] h-full relative">
                        <AnimatePresence mode="wait">
                            <ContentCard
                                key={activeId}
                                title={title}
                                subtitle={description}
                                id={activeId}
                            >
                                {children}
                            </ContentCard>
                        </AnimatePresence>
                    </section>

                </div>
            </main>
        </div>
    );
}

export default ConditionLayout;
