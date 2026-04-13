"use client"
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { groupActions } from '@/features/groups/actions/group.actions';

interface CreateGroupDialogProps {
  trigger?: React.ReactNode;
}

export default function CreateGroupDialog({ trigger }: CreateGroupDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [newGroupName, setNewGroupName] = useState('');

  const handleCreateGroup = async () => {
    if (!newGroupName.trim()) return;
    
    const result = await groupActions.createGroup({
      name: newGroupName
    });
    
    if (result.success) {
      setIsOpen(false);
      setNewGroupName('');
    }
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setNewGroupName('');
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger || <Button>Create Group</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-surface">
        <DialogHeader>
          <DialogTitle>Create New Group</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right text-text-secondary">
              Group Name
            </Label>
            <Input
              id="name"
              value={newGroupName}
              onChange={(e) => setNewGroupName(e.target.value)}
              className="col-span-3 bg-surface border-border-subtle focus:ring-brand-primary"
              placeholder="Enter group name"
            />
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleCreateGroup} className="bg-brand-primary hover:bg-brand-hover">
            Create
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}