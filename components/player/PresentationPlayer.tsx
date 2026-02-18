import React, { useState, useEffect } from 'react';
import { ProjectConfig, Hotspot } from '../../types';
import ContentList from '../editor/ContentList';
import PresentationContainer from '../editor/PresentationContainer';
import { Link } from 'react-router-dom';

interface PresentationPlayerProps {
    sequenceId: string;
}

const PresentationPlayer: React.FC<PresentationPlayerProps> = ({ sequenceId }) => {
    const [projectConfig, setProjectConfig] = useState<ProjectConfig | null>(null);
    const [selectedContentId, setSelectedContentId] = useState<string | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    // Load project config
    useEffect(() => {
        // In a real app we might cache this or pass it as prop, but fetching is fine for MVP
        fetch('/project-config.json')
            .then(res => res.json())
            .then((data: ProjectConfig) => {
                setProjectConfig(data);

                // Auto-select first content of the requested sequence
                const sequence = data.sequences.find(s => s.id === sequenceId);
                if (sequence && sequence.contents.length > 0) {
                    setSelectedContentId(sequence.contents[0]);
                }
            })
            .catch(err => console.error('Error loading project config:', err));
    }, [sequenceId]);

    const activeSequence = projectConfig?.sequences.find(s => s.id === sequenceId);

    // Filter config for ContentList
    const filteredConfig = projectConfig ? {
        ...projectConfig,
        sequences: activeSequence ? [activeSequence] : []
    } : null;

    const selectedContent = (projectConfig && selectedContentId) ? projectConfig.contents[selectedContentId] : null;

    const handleSelectContent = (id: string) => {
        setSelectedContentId(id);
    };

    const handleHotspotClick = (hotspot: Hotspot) => {
        if (hotspot.action === 'route' && hotspot.target) {
            setSelectedContentId(hotspot.target);
        } else if (hotspot.action === 'play') {
            setIsPlaying(true);
            // In a better implementation we would trigger video play
        }
    };

    const handleNext = () => {
        if (!activeSequence || !selectedContentId) return;
        const currentIndex = activeSequence.contents.indexOf(selectedContentId);
        if (currentIndex < activeSequence.contents.length - 1) {
            setSelectedContentId(activeSequence.contents[currentIndex + 1]);
        }
    };

    const handlePrev = () => {
        if (!activeSequence || !selectedContentId) return;
        const currentIndex = activeSequence.contents.indexOf(selectedContentId);
        if (currentIndex > 0) {
            setSelectedContentId(activeSequence.contents[currentIndex - 1]);
        }
    };

    if (!projectConfig || !activeSequence) {
        return <div className="flex justify-center items-center h-screen">Cargando presentación...</div>;
    }

    return (
        <div className="flex h-screen w-full bg-gray-900 text-white overflow-hidden">
            {/* Left Panel - Navigation (Collapsible ideally, but fixed for MVP) */}
            <div className="w-80 border-r border-gray-800 bg-gray-900 flex flex-col">
                <div className="p-4 border-b border-gray-800 flex items-center gap-3">
                    <Link to="/quality-conditions" className="text-gray-400 hover:text-white transition-colors">
                        <span className="material-icons">arrow_back</span>
                    </Link>
                    <h2 className="font-bold text-lg truncate" title={activeSequence.title}>
                        {activeSequence.title}
                    </h2>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {filteredConfig && (
                        <ContentList
                            projectConfig={filteredConfig}
                            selectedContentId={selectedContentId}
                            onSelectContent={handleSelectContent}
                            readOnly={true}
                            onUploadContent={() => { }}
                            onReorderContent={() => { }}
                        />
                    )}
                </div>

                {/* Navigation Controls */}
                <div className="p-4 border-t border-gray-800 flex justify-between gap-4">
                    <button
                        onClick={handlePrev}
                        disabled={!selectedContentId || activeSequence.contents.indexOf(selectedContentId) === 0}
                        className="flex-1 flex items-center justify-center gap-2 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed py-3 rounded-lg transition-colors"
                    >
                        <span className="material-icons">navigate_before</span>
                        Anterior
                    </button>
                    <button
                        onClick={handleNext}
                        disabled={!selectedContentId || activeSequence.contents.indexOf(selectedContentId) === activeSequence.contents.length - 1}
                        className="flex-1 flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark disabled:opacity-50 disabled:cursor-not-allowed py-3 rounded-lg transition-colors text-white"
                    >
                        Siguiente
                        <span className="material-icons">navigate_next</span>
                    </button>
                </div>
            </div>

            {/* Center Panel - Presentation */}
            <div className="flex-1 bg-black relative">
                <PresentationContainer
                    content={selectedContent}
                    selectedHotspotId={null}
                    onSelectHotspot={() => { }}
                    onAddHotspot={() => { }} // Disabled in read-only
                    readOnly={true}
                    onHotspotClick={handleHotspotClick}
                    onNavigate={handleSelectContent}
                />
            </div>
        </div>
    );
};

export default PresentationPlayer;
