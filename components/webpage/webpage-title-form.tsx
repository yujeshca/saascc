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
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { webpageTitleSchema } from '@/lib/validations/webpage';
import type { WebPageTitleFormData } from '@/lib/validations/webpage';

interface WebPageTitleFormProps {
  childcareId: number;
  onSuccess: (data: { title: string; pageType: string; content: string }) => void;
  onCancel: () => void;
}

const PAGE_TYPES = [
  { value: 'home', label: 'Home Page' },
  { value: 'about', label: 'About Us' },
  { value: 'programs', label: 'Programs' },
  { value: 'contact', label: 'Contact' },
  { value: 'custom', label: 'Custom Page' },
];

export function WebPageTitleForm({ childcareId, onSuccess, onCancel }: WebPageTitleFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<WebPageTitleFormData>({
    resolver: zodResolver(webpageTitleSchema),
    defaultValues: {
      title: '',
      pageType: 'custom',
    },
  });

  async function onSubmit(data: WebPageTitleFormData) {
    setIsLoading(true);
    try {
      const response = await fetch('/api/pages/generate-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          childcareId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate content');
      }
      const { saveData, content } = await response.json();
      onSuccess({ ...saveData, content });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to generate page content',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Page Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter page title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="pageType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Page Type</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select page type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {PAGE_TYPES.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Generating...' : 'Generate Content'}
          </Button>
        </div>
      </form>
    </Form>
  );
}