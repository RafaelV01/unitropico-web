import React, { useRef, useState, useEffect } from 'react';
import { Content, Hotspot } from '../../types';

interface PresentationContainerProps {
    content: Content | null;
    previewUrl?: string; // In-session blob URL for newly uploaded files
    selectedHotspotId: string | null;
    onSelectHotspot: (hotspotId: string | null) => void;
    onAddHotspot?: (rect: Omit<Hotspot, 'id' | 'action'>) => void;
    readOnly?: boolean;
    onHotspotClick?: (hotspot: Hotspot) => void;
    onNavigate?: (targetId: string) => void;
}

const PresentationContainer: React.FC<PresentationContainerProps> = ({
    content,
    previewUrl,
    selectedHotspotId,
    onSelectHotspot,
    onAddHotspot,
    readOnly = false,
    onHotspotClick,
    onNavigate
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);
    const [startPos, setStartPos] = useState<{ x: number, y: number } | null>(null);
    const [currentPos, setCurrentPos] = useState<{ x: number, y: number } | null>(null);

    // Handle messages from iframe
    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (event.data?.type === 'NAVIGATE' && event.data?.targetId && onNavigate) {
                onNavigate(event.data.targetId);
            }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, [onNavigate]);

    // Reset drawing state when content changes
    useEffect(() => {
        setIsDrawing(false);
        setStartPos(null);
        setCurrentPos(null);
    }, [content?.id]);

    if (!content) {
        return (
            <div className="flex items-center justify-center w-full h-full text-gray-400">
                <p>Selecciona un contenido para {readOnly ? 'ver' : 'editar'}</p>
            </div>
        );
    }

    const handleMouseDown = (e: React.MouseEvent) => {
        if (readOnly || !containerRef.current) return;

        // Only start drawing if we clicked on the container directly (not on a hotspot)
        // event.target check is handled by stopping propagation on hotspot elements

        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;

        setIsDrawing(true);
        setStartPos({ x, y });
        setCurrentPos({ x, y });
        onSelectHotspot(null); // Deselect when starting to draw
    };

    const handleMouseMove = (e: React.MouseEvent) => {
        if (readOnly || !isDrawing || !containerRef.current) return;

        const rect = containerRef.current.getBoundingClientRect();
        const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));

        setCurrentPos({ x, y });
    };

    const handleMouseUp = () => {
        if (readOnly || !isDrawing || !startPos || !currentPos) return;

        const x = Math.min(startPos.x, currentPos.x);
        const y = Math.min(startPos.y, currentPos.y);
        const width = Math.abs(currentPos.x - startPos.x);
        const height = Math.abs(currentPos.y - startPos.y);

        // Only add if it has some size (avoid accidental clicks creating tiny hotspots)
        if (width > 0.02 && height > 0.02 && onAddHotspot) {
            onAddHotspot({
                x, y, width, height,
                title: 'Nuevo Hotspot'
            });
        }

        setIsDrawing(false);
        setStartPos(null);
        setCurrentPos(null);
    };

    return (
        <div className={`w-full h-full flex items-center justify-center ${readOnly ? 'bg-black' : 'p-8'}`}>
            {/* 16:9 Aspect Ratio Container */}
            <div
                ref={containerRef}
                className={`relative w-full shadow-2xl overflow-hidden select-none 
                    ${readOnly ? '' : 'cursor-crosshair group bg-black'}`}
                style={{ aspectRatio: '16/9', maxHeight: '100%' }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={() => {
                    if (isDrawing) {
                        setIsDrawing(false);
                        setStartPos(null);
                        setCurrentPos(null);
                    }
                }}
            >
                {/* Content Layer */}
                {content.type === 'video' ? (
                    <video
                        src={previewUrl || content.src}
                        className="w-full h-full object-contain pointer-events-none"
                        controls
                        autoPlay={readOnly}
                    />
                ) : content.type === 'html' ? (
                    <iframe
                        srcDoc={content.html}
                        sandbox="allow-scripts allow-same-origin"
                        className="w-full h-full border-none"
                        title={content.title}
                    />
                ) : (
                    <img
                        src={previewUrl || content.src}
                        alt={content.title}
                        className="w-full h-full object-contain pointer-events-none user-select-none"
                        draggable={false}
                    />
                )}

                {/* Hotspots Layer */}
                {content.hotspots.map((hotspot) => (
                    <div
                        key={hotspot.id}
                        onClick={(e) => {
                            e.stopPropagation();
                            if (readOnly && onHotspotClick) {
                                onHotspotClick(hotspot);
                            } else {
                                onSelectHotspot(hotspot.id);
                            }
                        }}
                        className={`absolute transition-all cursor-pointer
              ${readOnly
                                ? 'hover:bg-white/10 z-20' // Read-only style
                                : `${selectedHotspotId === hotspot.id ? 'border-2 border-primary bg-primary/20 z-20 opacity-100' : 'border-2 border-transparent hover:border-white/50 hover:bg-white/10 z-10'}`
                            }`}
                        style={{
                            left: `${hotspot.x * 100}%`,
                            top: `${hotspot.y * 100}%`,
                            width: `${hotspot.width * 100}%`,
                            height: `${hotspot.height * 100}%`,
                        }}
                        title={readOnly ? hotspot.title : undefined}
                    >
                        {!readOnly && selectedHotspotId === hotspot.id && (
                            <div className="absolute -top-6 left-0 bg-primary text-white text-xs px-2 py-1 rounded">
                                {hotspot.title || 'Hotspot'}
                            </div>
                        )}
                    </div>
                ))}

                {/* Drawing Preview Layer */}
                {!readOnly && isDrawing && startPos && currentPos && (
                    <div
                        className="absolute border-2 border-dashed border-yellow-400 bg-yellow-400/20 z-30 pointer-events-none"
                        style={{
                            left: `${Math.min(startPos.x, currentPos.x) * 100}%`,
                            top: `${Math.min(startPos.y, currentPos.y) * 100}%`,
                            width: `${Math.abs(currentPos.x - startPos.x) * 100}%`,
                            height: `${Math.abs(currentPos.y - startPos.y) * 100}%`,
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default PresentationContainer;
