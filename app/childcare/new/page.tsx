'use client';

import { ChildcareForm } from '@/components/childcare/childcare-form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function NewChildcarePage() {
  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Create New Childcare Center</CardTitle>
        </CardHeader>
        <CardContent>
          <ChildcareForm />
        </CardContent>
      </Card>
    </div>
  );
}