'use client';

import { useState } from 'react';
import { Edit, Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProgramForm } from './program-form';
import { useToast } from '@/hooks/use-toast';
import type { Program } from '@/lib/types/childcare';

interface ProgramListProps {
  programs: Program[];
  onProgramUpdate: (program: Program) => void;
  onProgramDelete: (id: number) => void;
}

export function ProgramList({ programs, onProgramUpdate, onProgramDelete }: ProgramListProps) {
  const [editingProgram, setEditingProgram] = useState<Program | null>(null);
  const [deletingProgram, setDeletingProgram] = useState<Program | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const { toast } = useToast();

  async function handleDelete() {
    if (!deletingProgram) return;
    
    setIsDeleting(true);
    try {
      const response = await fetch(
        `/api/childcare/${deletingProgram.childcareCenterId}/programs/${deletingProgram.id}`,
        { method: 'DELETE' }
      );

      if (!response.ok) throw new Error('Failed to delete program');

      onProgramDelete(deletingProgram.id);
      toast({
        title: 'Success',
        description: 'Program deleted successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete program',
        variant: 'destructive',
      });
    } finally {
      setIsDeleting(false);
      setDeletingProgram(null);
    }
  }

  if (editingProgram) {
    return (
      <ProgramForm
        childcareId={editingProgram.childcareCenterId}
        program={editingProgram}
        onSuccess={(updatedProgram) => {
          onProgramUpdate(updatedProgram);
          setEditingProgram(null);
        }}
        onCancel={() => setEditingProgram(null)}
      />
    );
  }

  return (
    <div className="space-y-4">
      {programs.length === 0 ? (
        <p className="text-center text-muted-foreground">No programs added yet.</p>
      ) : (
        programs.map((program) => (
          <Card key={program.id}>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">{program.name}</CardTitle>
              <div className="flex space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setEditingProgram(program)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setDeletingProgram(program)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{program.description}</p>
            </CardContent>
          </Card>
        ))
      )}

      <AlertDialog open={!!deletingProgram} onOpenChange={() => setDeletingProgram(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the program.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground"
            >
              {isDeleting ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}