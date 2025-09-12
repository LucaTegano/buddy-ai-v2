import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button"; // Import the standard Button component
import { useTranslation } from "react-i18next";

interface DeleteConfirmationDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function DeleteConfirmationDialog({ isOpen, onClose, onConfirm }: DeleteConfirmationDialogProps) {
  const { t } = useTranslation();

  return (
    // 1. Replaced AlertDialog with Dialog. The props `open` and `onOpenChange` work the same.
    <Dialog open={isOpen} onOpenChange={onClose}>
      {/* 2. Replaced AlertDialogContent with DialogContent */}
      {/* Your custom DialogContent includes a close 'X' button by default, which is fine. */}
      <DialogContent>
        {/* The Header, Title, and Description components are direct replacements. */}
        <DialogHeader>
          <DialogTitle>{t('trash.deleteModalTitle')}</DialogTitle>
          <DialogDescription>
            {t('trash.deleteModalMessage')}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          {/* 3. Replaced AlertDialogCancel with a standard Button */}
          {/*    The 'outline' variant is a good choice for a secondary action like "Cancel". */}
          <Button variant="outline" onClick={onClose}>
            {t('modal.cancel')}
          </Button>

          {/* 4. Using the consistent red styling for delete confirmation */}
          <button
            className="rounded-md border-2 border-feedback-error shadow-sm px-4 py-2 bg-feedback-error text-base font-medium text-text-primary hover:opacity-70 focus:outline-none sm:text-sm cursor-pointer"
            onClick={onConfirm}
          >
            {t('trash.deleteModalConfirm')}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}