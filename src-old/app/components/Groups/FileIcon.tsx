import React from 'react';
import { GroupFile } from '@/app/models/types';
import { DocumentIcon } from '@/app/components/icons';

interface FileIconProps {
    type: GroupFile['type'];
}

const FileIcon: React.FC<FileIconProps> = ({ type }) => {
    // In a real app, you might have different icons for PDF, DOCX, etc.
    return <DocumentIcon className="w-6 h-6 text-text-secondary" />;
};

export default FileIcon;