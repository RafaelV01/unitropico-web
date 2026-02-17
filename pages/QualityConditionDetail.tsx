import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ConditionLayout from '../components/quality-conditions/ConditionLayout';
import { conditionDetails, conditions } from '../data/conditions';
import Condition01_Denominacion from '../components/quality-conditions/Condition01_Denominacion';
import Condition02_Justificacion from '../components/quality-conditions/Condition02_Justificacion';
import Condition03_Curricular from '../components/quality-conditions/Condition03_Curricular';
import Condition04_Organizacion from '../components/quality-conditions/Condition04_Organizacion';
import Condition05_Investigacion from '../components/quality-conditions/Condition05_Investigacion';
import Condition06_RelacionSector from '../components/quality-conditions/Condition06_RelacionSector';
import Condition07_Docentes from '../components/quality-conditions/Condition07_Docentes';
import Condition08_Medios from '../components/quality-conditions/Condition08_Medios';
import Condition09_Infraestructura from '../components/quality-conditions/Condition09_Infraestructura';

const conditionComponents: { [key: string]: React.FC } = {
    '01': Condition01_Denominacion,
    '02': Condition02_Justificacion,
    '03': Condition03_Curricular,
    '04': Condition04_Organizacion,
    '05': Condition05_Investigacion,
    '06': Condition06_RelacionSector,
    '07': Condition07_Docentes,
    '08': Condition08_Medios,
    '09': Condition09_Infraestructura,
};

const QualityConditionDetail: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const detail = id ? conditionDetails[id] : null;
    const Component = id ? conditionComponents[id] : null;

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (!detail || !id) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 pt-32">
                <h1 className="text-3xl font-montserrat font-bold text-primary mb-4">Condición no encontrada</h1>
                <button
                    onClick={() => navigate('/quality-conditions')}
                    className="px-6 py-2 bg-secondary text-white rounded hover:bg-secondary-dark transition-colors"
                >
                    Volver
                </button>
            </div>
        );
    }

    return (
        <ConditionLayout
            activeId={id}
            title={detail.title}
            description={detail.description}
            sections={detail.sections || []}
        >
            {Component ? <Component /> : (
                <div className="p-8 bg-gray-50 rounded-lg border border-gray-100 flex flex-col items-center justify-center text-center">
                    <span className="material-symbols-outlined text-6xl text-gray-300 mb-4">construction</span>
                    <h3 className="text-lg font-bold text-gray-500 mb-2">Contenido no disponible</h3>
                </div>
            )}
        </ConditionLayout>
    );
};

export default QualityConditionDetail;
