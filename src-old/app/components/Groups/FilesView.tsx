import React from 'react';
import { GroupFile } from '@/app/models/types';
import { ArrowDownTrayIcon } from '@/app/components/icons';
import FileIcon from './FileIcon';

interface FilesViewProps {
    files: GroupFile[];
}

const FilesView: React.FC<FilesViewProps> = ({ files }) => (
    <div className="flex-1 p-4 overflow-y-auto">
        <ul className="divide-y divide-border-subtle">
            {files.map(file => (
                <li key={file.id} className="py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <FileIcon type={file.type} />
                        <div>
                            <p className="font-semibold text-sm">{file.name}</p>
                            <p className="text-xs text-text-secondary">
                                {file.size} - Uploaded by {file.uploadedBy} on {file.date}
                            </p>
                        </div>
                    </div>
                    <button className="p-2 rounded-lg hover:bg-hover transition-colors">
                        <ArrowDownTrayIcon className="w-5 h-5 text-text-secondary" />
                    </button>
                </li>
            ))}
        </ul>
    </div>
);

export default FilesView;