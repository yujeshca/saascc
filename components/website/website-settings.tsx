'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { ThemeSelector } from './theme-selector';
import { useToast } from '@/hooks/use-toast';
import { websiteSettingsSchema } from '@/lib/validations/website';
import type { Website } from '@/lib/types/website';

interface WebsiteSettingsProps {
  website: Website;
  onUpdate: (website: Website) => void;
}

export function WebsiteSettings({ website, onUpdate }: WebsiteSettingsProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(websiteSettingsSchema),
    defaultValues: {
      logo: website.logo || '',
      darkLogo: website.darkLogo || '',
      favicon: website.favicon || '',
      commonMetaCode: website.commonMetaCode || '',
    },
  });

  async function onSubmit(data: any) {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/websites/${website.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to update website settings');

      const updatedWebsite = await response.json();
      onUpdate(updatedWebsite);
      toast({
        title: 'Success',
        description: 'Website settings updated successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update website settings',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="logo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Logo URL</FormLabel>
                <FormControl>
                  <Input placeholder="Enter logo URL" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="darkLogo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dark Logo URL</FormLabel>
                <FormControl>
                  <Input placeholder="Enter dark logo URL" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="favicon"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Favicon URL</FormLabel>
                <FormControl>
                  <Input placeholder="Enter favicon URL" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Settings'}
          </Button>
        </form>
      </Form>

      <div className="space-y-4">
        <h3 className="text-lg font-medium">Theme Settings</h3>
        <ThemeSelector
          websiteId={website.id}
          currentThemeId={website.themes_id}
          onThemeChange={async (themeId) => {
            try {
              const response = await fetch(`/api/websites/${website.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ themes_id: themeId }),
              });

              if (!response.ok) throw new Error('Failed to update theme');

              const updatedWebsite = await response.json();
              onUpdate(updatedWebsite);
              toast({
                title: 'Success',
                description: 'Theme updated successfully',
              });
            } catch (error) {
              toast({
                title: 'Error',
                description: 'Failed to update theme',
                variant: 'destructive',
              });
            }
          }}
        />
      </div>
    </div>
  );
}