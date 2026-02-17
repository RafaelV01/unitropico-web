import React from 'react';

const Condition01_Denominacion: React.FC = () => {
    return (
        <div className="space-y-12 animate-fade-in pb-20">
            {/* 1.1 Definición y Concepto */}
            <div id="definicion" className="p-8 bg-gray-50 rounded-lg border border-gray-100 flex flex-col items-center justify-center text-center scroll-mt-6">
                <span className="material-symbols-outlined text-6xl text-gray-300 mb-4">description</span>
                <h3 className="text-xl font-bold text-gray-700 mb-2">1.1 Definición y Concepto</h3>
                <p className="text-gray-600 max-w-md">
                    El programa de Ingeniería en Inteligencia Artificial de Unitrópico se fundamenta en la integración de ciencias de la computación, matemáticas y ética para formar profesionales capaces de liderar la transformación tecnológica.
                </p>
            </div>

            {/* 1.2 Título que Otorga */}
            <div id="titulo" className="scroll-mt-6">
                <h3 className="text-2xl font-bold text-green-900 mb-6 border-l-4 border-green-500 pl-4 py-1">1.2 Título que Otorga</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-4 mb-3">
                            <span className="p-2 bg-blue-50 text-blue-600 rounded-lg material-symbols-outlined">school</span>
                            <h4 className="font-bold text-primary text-lg">Título Profesional</h4>
                        </div>
                        <p className="text-gray-600 font-medium">Ingeniero(a) en Inteligencia Artificial</p>
                    </div>
                </div>
            </div>

            {/* 1.3 Duración y Modalidad */}
            <div id="duracion" className="scroll-mt-6">
                <h3 className="text-2xl font-bold text-green-900 mb-6 border-l-4 border-green-500 pl-4 py-1">1.3 Duración y Modalidad</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-4 mb-3">
                            <span className="p-2 bg-purple-50 text-purple-600 rounded-lg material-symbols-outlined">schedule</span>
                            <h4 className="font-bold text-primary text-lg">Duración</h4>
                        </div>
                        <p className="text-gray-600 font-medium">9 Semestres Académicos</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-4 mb-3">
                            <span className="p-2 bg-orange-50 text-orange-600 rounded-lg material-symbols-outlined">apartment</span>
                            <h4 className="font-bold text-primary text-lg">Modalidad</h4>
                        </div>
                        <p className="text-gray-600 font-medium">Presencial (Yopal, Casanare)</p>
                    </div>
                </div>
            </div>

            {/* 1.4 Normativa */}
            <div id="normativa" className="scroll-mt-6">
                <h3 className="text-2xl font-bold text-green-900 mb-6 border-l-4 border-green-500 pl-4 py-1">1.4 Normativa Aplicable</h3>
                <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                    <p className="text-gray-600 mb-4">
                        El programa se rige bajo la normativa vigente del Ministerio de Educación Nacional y los estatutos internos de Unitrópico.
                    </p>
                    <button className="text-secondary font-bold hover:underline flex items-center gap-2">
                        Ver Resolución
                        <span className="material-symbols-outlined text-sm">open_in_new</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Condition01_Denominacion;
