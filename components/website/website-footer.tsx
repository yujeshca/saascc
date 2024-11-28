'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import type { Website } from '@/lib/types/website';

interface WebsiteFooterProps {
  website: Website;
  onUpdate: (website: Website) => void;
}

export function WebsiteFooter({ website, onUpdate }: WebsiteFooterProps) {
  const [code, setCode] = useState(website.footer?.code || '');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  async function handleSave() {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/websites/${website.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          footer: {
            upsert: {
              create: {
                title: 'Default Footer',
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

      if (!response.ok) throw new Error('Failed to update footer');

      const updatedWebsite = await response.json();
      onUpdate(updatedWebsite);
      toast({
        title: 'Success',
        description: 'Footer updated successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update footer',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Footer Code</h3>
      <Textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        className="min-h-[300px] font-mono"
        placeholder="Enter footer HTML code"
      />
      <Button onClick={handleSave} disabled={isLoading}>
        {isLoading ? 'Saving...' : 'Save Footer'}
      </Button>
    </div>
  );
}