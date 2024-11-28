'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import type { Website } from '@/lib/types/website';

interface WebsiteHeaderProps {
  website: Website;
  onUpdate: (website: Website) => void;
}

export function WebsiteHeader({ website, onUpdate }: WebsiteHeaderProps) {
  const [code, setCode] = useState(website.header?.code || '');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  async function handleSave() {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/websites/${website.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          header: {
            upsert: {
              create: {
                title: 'Default Header',
                code,
                structureJson: '{}',
              },
              update: {
                code,
              },
            },
          },
        }),
      });

      if (!response.ok) throw new Error('Failed to update header');

      const updatedWebsite = await response.json();
      onUpdate(updatedWebsite);
      toast({
        title: 'Success',
        description: 'Header updated successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update header',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Header Code</h3>
      <Textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="min-h-[300px] font-mono"
        placeholder="Enter header HTML code"
      />
      <Button onClick={handleSave} disabled={isLoading}>
        {isLoading ? 'Saving...' : 'Save Header'}
      </Button>
    </div>
  );
}