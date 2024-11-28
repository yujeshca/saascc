'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import DragDropEditor from '@/components/webeditor/DragDropEditor';
import{
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { WebPageContentPreview } from './webpage-content-preview';
import { WebPageContentEditor } from './webpage-content-editor';
import { useToast } from '@/hooks/use-toast';
import { webpageSchema } from '@/lib/validations/webpage';
import type { WebPage } from '@prisma/client';
import type { WebPageFormData } from '@/lib/validations/webpage';

interface WebPageFormProps {
  childcareId: number;
  initialData: {
    title: string;
    pageType: string;
    content: string;
  };
  onSuccess: (page: WebPage) => void;
  onCancel: () => void;
}

export function WebPageForm({
  childcareId,
  initialData,
  onSuccess,
  onCancel
}: WebPageFormProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();

  const form = useForm<WebPageFormData>({
    resolver: zodResolver(webpageSchema),
    defaultValues: {
      title: initialData.title,
      slug: initialData.title.toLowerCase()
        .replace(/[^a-z0-9-]/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, ''),
      content: initialData.content,
      pageType: initialData.pageType,
      childcareCenterId: childcareId,
    },
  });

  // async function onUpdate(data: WebPageFormData) {
  //   setIsSaving(true);
  //   try {
  //     const response = await fetch('/api/pages', {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(data),
  //     });

  //     if (!response.ok) throw new Error('Failed to save page');

  //     const savedPage = await response.json();
  //     toast({
  //       title: 'Success',
  //       description: 'Page created successfully',
  //     });
  //     onSuccess(savedPage);
  //   } catch (error) {
  //     toast({
  //       title: 'Error',
  //       description: 'Failed to create page',
  //       variant: 'destructive',
  //     });
  //   } finally {
  //     setIsSaving(false);
  //   }
  // }
  async function onSubmit(data: WebPageFormData) {
    setIsSaving(true);
    try {
      const response = await fetch(`/api/pages/${initialData.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to save pagerr');

      const savedPage = await response.json();
      toast({
        title: 'Success',
        description: 'Page created successfully',
      });
      onSuccess(savedPage);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to create pagess',
        variant: 'destructive',
      });
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <>
    <Form {...form}>
      <form className="space-y-6">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Page Title</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL Slug</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="space-y-4">
          <h3 className="text-lg font-medium">Page Content</h3>

          {isEditing ? (
            <WebPageContentEditor
              content={form.getValues('content')}
              onSave={(content) => {
                form.setValue('content', content);
                setIsEditing(false);
              }}
              onCancel={() => setIsEditing(false)}
            />
          ) : (
            <WebPageContentPreview
              content={form.getValues('content')}
              onSave={() => form.handleSubmit(onSubmit)()}
              onEdit={() => setIsEditing(true)}
              isSaving={isSaving}
            />
          )}
        </div>
      </form>
    </Form>
     
       </>
  );
}