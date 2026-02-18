import React from 'react';
import { ProjectConfig, Sequence } from '../../types';

interface ContentListProps {
  projectConfig: ProjectConfig;
  selectedContentId: string | null;
  onSelectContent: (contentId: string) => void;
  onUploadContent?: (file: File) => void;
  onAddHtmlContent?: () => void;
  onReorderContent?: (fromIndex: number, toIndex: number) => void;
  readOnly?: boolean;
}

const ContentList: React.FC<ContentListProps> = ({
  projectConfig,
  selectedContentId,
  onSelectContent,
  onUploadContent,
  onAddHtmlContent,
  onReorderContent,
  readOnly = false
}) => {
  const [draggedIndex, setDraggedIndex] = React.useState<number | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && onUploadContent) {
      onUploadContent(e.target.files[0]);
    }
  };

  const handleDragStart = (e: React.DragEvent, index: number) => {
    if (readOnly) return;
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", index.toString());
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (readOnly) return;
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = (e: React.DragEvent, dropIndex: number) => {
    e.preventDefault();
    if (readOnly || draggedIndex === null) return;
    if (draggedIndex !== dropIndex && onReorderContent) {
      onReorderContent(draggedIndex, dropIndex);
    }
    setDraggedIndex(null);
  };

  return (
    <div className={`p-4 space-y-6 ${readOnly ? 'h-full overflow-y-auto' : ''}`}>
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          {readOnly ? 'Navegación' : 'Estructura'}
        </h3>
        {!readOnly && (
          <div className="flex gap-2">
            <button
              onClick={onAddHtmlContent}
              className="text-primary hover:text-primary-dark p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              title="Nueva diapositiva HTML"
            >
              <span className="material-icons text-xl">code</span>
            </button>
            <label className="cursor-pointer text-primary hover:text-primary-dark p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" title="Agregar imagen/video">
              <span className="material-icons text-xl">add_photo_alternate</span>
              <input
                type="file"
                accept="image/*,video/*"
                className="hidden"
                onChange={handleFileUpload}
              />
            </label>
          </div>
        )}
      </div>

      {projectConfig.sequences.map((sequence: Sequence) => (
        <div key={sequence.id} className="space-y-2">
          {!readOnly && (
            <div className="flex items-center gap-2 font-semibold text-primary dark:text-accent">
              <span className="material-icons text-sm">folder</span>
              <span>{sequence.title}</span>
            </div>
          )}
          <div className="pl-4 space-y-1">
            {sequence.contents.map((contentId, index) => {
              const content = projectConfig.contents[contentId];
              if (!content) return null;

              const isSelected = selectedContentId === contentId;
              const isDragging = draggedIndex === index;

              return (
                <div
                  key={contentId}
                  draggable={!readOnly}
                  onDragStart={(e) => handleDragStart(e, index)}
                  onDragOver={handleDragOver}
                  onDrop={(e) => handleDrop(e, index)}
                  className={`relative ${isDragging ? 'opacity-50' : ''} `}
                >
                  <button
                    onClick={() => onSelectContent(contentId)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors flex items-center gap-2 group 
                        ${!readOnly ? 'cursor-grab active:cursor-grabbing' : 'cursor-pointer'}
                        ${isSelected
                        ? 'bg-primary/10 text-primary dark:text-accent border border-primary/20 font-medium'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700 border border-transparent'
                      } `}
                  >
                    {!readOnly && (
                      <span className="material-icons text-gray-400 group-hover:text-gray-600 cursor-grab" style={{ fontSize: '14px' }}>drag_indicator</span>
                    )}
                    <span className="material-icons text-xs">
                      {content.type === 'video' ? 'movie' : content.type === 'html' ? 'code' : 'image'}
                    </span>
                    <span className="truncate flex-1">{content.title || contentId}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContentList;

