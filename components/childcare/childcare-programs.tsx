'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProgramForm } from './program-form';
import { ProgramList } from './program-list';
import type { Program } from '@/lib/types/childcare';

interface ChildcareProgramsProps {
  programs: Program[];
  childcareId: number;
}

export function ChildcarePrograms({ programs: initialPrograms, childcareId }: ChildcareProgramsProps) {
  const [programs, setPrograms] = useState(initialPrograms);
  const [isAddingProgram, setIsAddingProgram] = useState(false);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Programs</CardTitle>
        <Button onClick={() => setIsAddingProgram(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Program
        </Button>
      </CardHeader>
      <CardContent>
        {isAddingProgram ? (
          <ProgramForm
            childcareId={childcareId}
            onSuccess={(newProgram) => {
              setPrograms([...programs, newProgram]);
              setIsAddingProgram(false);
            }}
            onCancel={() => setIsAddingProgram(false)}
          />
        ) : (
          <ProgramList 
            programs={programs} 
            onProgramUpdate={(updatedProgram) => {
              setPrograms(programs.map(p => 
                p.id === updatedProgram.id ? updatedProgram : p
              ));
            }}
            onProgramDelete={(deletedId) => {
              setPrograms(programs.filter(p => p.id !== deletedId));
            }}
          />
        )}
      </CardContent>
    </Card>
  );
}