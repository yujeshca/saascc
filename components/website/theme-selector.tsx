'use client';

import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { Theme } from '@/lib/types/website';

interface ThemeSelectorProps {
  websiteId: number;
  currentThemeId?: number | null;
  onThemeChange: (themeId: number) => void;
}

export function ThemeSelector({ websiteId, currentThemeId, onThemeChange }: ThemeSelectorProps) {
  const [themes, setThemes] = useState<Theme[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchThemes() {
      try {
        const response = await fetch('/api/themes');
        if (!response.ok) throw new Error('Failed to fetch themes');
        const data = await response.json();
        setThemes(data);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to load themes',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    }

    fetchThemes();
  }, [toast]);

  if (isLoading) {
    return <div>Loading themes...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <Select
          value={currentThemeId?.toString()}
          onValueChange={(value) => onThemeChange(parseInt(value))}
        >
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="Select theme" />
          </SelectTrigger>
          <SelectContent>
            {themes.map((theme) => (
              <SelectItem key={theme.id} value={theme.id.toString()}>
                {theme.title}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          variant="outline"
          onClick={() => {
            // Preview theme functionality
            toast({
              title: 'Preview',
              description: 'Theme preview functionality coming soon',
            });
          }}
        >
          Preview Theme
        </Button>
      </div>
    </div>
  );
}