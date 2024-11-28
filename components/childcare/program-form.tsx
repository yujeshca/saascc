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
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { programSchema } from '@/lib/validations/program';
import type { Program } from '@/lib/types/childcare';
import type { ProgramFormData } from '@/lib/validations/program';

interface ProgramFormProps {
  childcareId: number;
  program?: Program;
  onSuccess: (program: Program) => void;
  onCancel: () => void;
}

export function ProgramForm({ childcareId, program, onSuccess, onCancel }: ProgramFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<ProgramFormData>({
    resolver: zodResolver(programSchema),
    defaultValues: {
      name: program?.name || '',
      description: program?.description || '',
      childcareCenterId: childcareId,
    },
  });

  async function onSubmit(data: ProgramFormData) {
    setIsLoading(true);
    try {
      const url = program 
        ? `/api/childcare/${childcareId}/programs/${program.id}`
        : `/api/childcare/${childcareId}/programs`;
      
      const response = await fetch(url, {
        method: program ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Failed to save program');
      
      const savedProgram = await response.json();
      toast({
        title: 'Success',
        description: `Program ${program ? 'updated' : 'created'} successfully`,
      });
      onSuccess(savedProgram);
    } catch (error) {
      toast({
        title: 'Error',
        description: `Failed to ${program ? 'update' : 'create'} program`,
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Program Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter program name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="Enter program description"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Saving...' : program ? 'Update Program' : 'Create Program'}
          </Button>
        </div>
      </form>
    </Form>
  );
}