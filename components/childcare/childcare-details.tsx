'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Building2, Clock, Mail, MapPin, Phone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChildcareForm } from './childcare-form';
import type { ChildcareCenter } from '@/lib/types/childcare';

interface ChildcareDetailsProps {
  childcare: ChildcareCenter;
  setChildcare: (childcare: ChildcareCenter) => void;
}

export function ChildcareDetails({ childcare, setChildcare }: ChildcareDetailsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  if (isEditing) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Edit Childcare Center</CardTitle>
        </CardHeader>
        <CardContent>
          <ChildcareForm
            initialData={childcare}
            onSuccess={(updatedChildcare) => {
              setChildcare(updatedChildcare);
              setIsEditing(false);
              router.refresh();
            }}
            onCancel={() => setIsEditing(false)}
          />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="space-y-1">
          <CardTitle>{childcare.name}</CardTitle>
          {childcare.tagline && (
            <p className="text-sm text-muted-foreground">{childcare.tagline}</p>
          )}
        </div>
        <Button onClick={() => setIsEditing(true)}>Edit</Button>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="grid gap-4">
          <div className="flex items-start gap-4">
            <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div className="space-y-1">
              <p className="font-medium">Address</p>
              <p className="text-sm text-muted-foreground">{childcare.address}</p>
            </div>
          </div>
          
          <div className="flex items-start gap-4">
            <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div className="space-y-1">
              <p className="font-medium">Contact</p>
              <p className="text-sm text-muted-foreground">{childcare.contact}</p>
            </div>
          </div>

          {childcare.businessHours && (
            <div className="flex items-start gap-4">
              <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
              <div className="space-y-1">
                <p className="font-medium">Business Hours</p>
                <p className="text-sm text-muted-foreground">{childcare.businessHours}</p>
              </div>
            </div>
          )}
        </div>

        {childcare.mission && (
          <div className="flex items-start gap-4">
            <Building2 className="h-5 w-5 text-muted-foreground mt-0.5" />
            <div className="space-y-1">
              <p className="font-medium">Mission Statement</p>
              <p className="text-sm text-muted-foreground whitespace-pre-line">
                {childcare.mission}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}