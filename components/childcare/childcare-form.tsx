'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
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
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { childcareSchema } from '@/lib/validations/childcare';
import type { ChildcareCenter } from '@/lib/types/childcare';
import type { ChildcareFormData } from '@/lib/validations/childcare';

interface ChildcareFormProps {
  initialData?: ChildcareCenter;
  onSuccess?: (childcare: ChildcareCenter) => void;
  onCancel?: () => void;
}

export function ChildcareForm({ initialData, onSuccess, onCancel }: ChildcareFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<ChildcareFormData>({
    resolver: zodResolver(childcareSchema),
    defaultValues: {
      name: initialData?.name || '',
      tagline: initialData?.tagline || '',
      address: initialData?.address || '',
      contact: initialData?.contact || '',
      businessHours: initialData?.businessHours || '',
      mission: initialData?.mission || '',
    },
  });

  async function onSubmit(data: ChildcareFormData) {
    setIsLoading(true);
    try {
      const url = initialData 
        ? `/api/childcare/${initialData.id}`
        : '/api/childcare';
      
      const response = await fetch(url, {
        method: initialData ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to save childcare center');
      }

      const savedChildcare = await response.json();
      toast({
        title: 'Success',
        description: `Childcare center ${initialData ? 'updated' : 'created'} successfully`,
      });

      if (onSuccess) {
        onSuccess(savedChildcare);
      } else {
        router.push(`/childcare/${savedChildcare.id}`);
      }
      router.refresh();
    } catch (error) {
      toast({
        title: 'Error',
        description: `Failed to ${initialData ? 'update' : 'create'} childcare center`,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Center Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter center name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tagline"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tagline</FormLabel>
              <FormControl>
                <Input placeholder="A short, catchy description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Full address of the center"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="contact"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Information</FormLabel>
              <FormControl>
                <Input placeholder="Phone, email, etc." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="businessHours"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Business Hours</FormLabel>
              <FormControl>
                <Input placeholder="e.g., Mon-Fri: 7AM-6PM" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="mission"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mission Statement</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Your center's mission and values"
                  className="resize-none min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : initialData ? 'Update Center' : 'Create Center'}
          </Button>
        </div>
      </form>
    </Form>
  );
}