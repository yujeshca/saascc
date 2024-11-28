'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import type { Website } from '@/lib/types/website';

interface WebsiteMenuProps {
  website: Website;
  onUpdate: (website: Website) => void;
}

export function WebsiteMenu({ website, onUpdate }: WebsiteMenuProps) {
  const [menuJson, setMenuJson] = useState(website.menu?.structureJson || '[]');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  async function handleSave() {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/websites/${website.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          menu: {
            upsert: {
              create: {
                title: 'Main Menu',
                structureJson: menuJson,
              },
              update: {
                structureJson: menuJson,
              },
            },
          },
        }),
      });

      if (!response.ok) throw new Error('Failed to update menu');

      const updatedWebsite = await response.json();
      onUpdate(updatedWebsite);
      toast({
        title: 'Success',
        description: 'Menu updated successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update menu',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Menu Structure</h3>
      <Textarea
        value={menuJson}
        onChange={(e) => setMenuJson(e.target.value)}
        className="min-h-[300px] font-mono"
        placeholder="Enter menu structure in JSON format"
      />
      <Button onClick={handleSave} disabled={isLoading}>
        {isLoading ? 'Saving...' : 'Save Menu'}
      </Button>
    </div>
  );
}