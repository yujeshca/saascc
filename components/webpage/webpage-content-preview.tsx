'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/ui/loading-spinner';

interface WebPageContentPreviewProps {
  content: string;
  onSave: () => void;
  onEdit: () => void;
  isSaving?: boolean;
}

export function WebPageContentPreview({ 
  content, 
  onSave, 
  onEdit,
  isSaving = false 
}: WebPageContentPreviewProps) {
  return (
    <div className="space-y-4">
      <Card className="p-6">
        <div 
          className="prose prose-slate max-w-none"
          dangerouslySetInnerHTML={{ __html: content }} 
        />
      </Card>
      
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onEdit}>
          Edit Content
        </Button>
        <Button onClick={onSave} disabled={isSaving}>
          {isSaving ? (
            <>
              <LoadingSpinner size="sm" className="mr-2" />
              Saving...
            </>
          ) : (
            'Save Page'
          )}
        </Button>
      </div>
    </div>
  );
}