import React from 'react';

interface EditorLayoutProps {
    leftPanel: React.ReactNode;
    centerPanel: React.ReactNode;
    rightPanel: React.ReactNode;
    header: React.ReactNode;
}

const EditorLayout: React.FC<EditorLayoutProps> = ({ leftPanel, centerPanel, rightPanel, header }) => {
    return (
        <div className="flex flex-col h-screen overflow-hidden bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
            <div className="h-16 flex-none z-10 shadow-md bg-white dark:bg-gray-800">
                {header}
            </div>
            <div className="flex flex-1 overflow-hidden">
                <div className="w-64 flex-none border-r border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-y-auto">
                    {leftPanel}
                </div>
                <div className="flex-1 flex flex-col min-w-0 bg-gray-200 dark:bg-gray-950 relative overflow-hidden">
                    {centerPanel}
                </div>
                <div className="w-72 flex-none border-l border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 overflow-y-auto">
                    {rightPanel}
                </div>
            </div>
        </div>
    );
};

export default EditorLayout;
