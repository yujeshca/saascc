'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface WebPageContentEditorProps {
  content: string;
  onSave: (content: string) => void;
  onCancel: () => void;
}

export function WebPageContentEditor({ 
  content: initialContent,
  onSave,
  onCancel 
}: WebPageContentEditorProps) {
  const [content, setContent] = useState(initialContent);

  return (
    <div className="space-y-4">
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="min-h-[400px] font-mono text-sm"
      />
      
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={() => onSave(content)}>
          Update Content
        </Button>
      </div>
    </div>
  );
}