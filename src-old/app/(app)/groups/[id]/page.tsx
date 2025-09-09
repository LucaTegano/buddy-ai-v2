"use client"

import React from 'react';
import { useParams } from 'next/navigation';
import { useAppStore } from '@/app/store/useAppStore';
import Groups from '@/app/screens/Groups';

export default function GroupPage() {
  const params = useParams();
  const { setActiveGroupId } = useAppStore();
  const groupId = params.id as string;
  
  // Set the active group ID when the component mounts
  React.useEffect(() => {
    if (groupId) {
      setActiveGroupId(groupId);
    }
    
    // Clean up when unmounting
    return () => {
      setActiveGroupId(null);
    };
  }, [groupId, setActiveGroupId]);

  return <Groups />;
}