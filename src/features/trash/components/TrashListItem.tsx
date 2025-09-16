
import { useState } from 'react';
import { TrashItem } from '@/features/trash/types';
import { Button } from '@/components/ui/button';
import { useTrashStore } from '@/features/trash/store/trash.store';
import { FileText, Trash2, Undo } from 'lucide-react';
import DeleteConfirmationDialog from './DeleteConfirmationDialog';

interface TrashListItemProps {
  item: TrashItem;
}

export default function TrashListItem({ item }: TrashListItemProps) {
  
  const { restoreItem, deleteItem } = useTrashStore();
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleDelete = () => {
    deleteItem(item.id);
    setIsDeleteDialogOpen(false);
  };

  return (
    <>
      <div className="flex items-center justify-between p-2 hover:bg-hover rounded-md">
        <div className="flex items-center gap-3">
          <FileText className="h-5 w-5 text-text-secondary" />
          <span className="text-sm font-medium">{item.title}</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => restoreItem(item.id)}>
            <Undo className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => setIsDeleteDialogOpen(true)}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <DeleteConfirmationDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDelete}
      />
    </>
  );
}
