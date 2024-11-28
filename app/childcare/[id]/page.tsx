'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Building2, Globe, Layout, Users } from 'lucide-react';
import { ChildcareDetails } from '@/components/childcare/childcare-details';
import { ChildcarePrograms } from '@/components/childcare/childcare-programs';
import { ChildcareWebPages } from '@/components/childcare/childcare-webpages';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import type { ChildcareCenter } from '@/lib/types/childcare';

export default function ChildcarePage() {
  const [childcare, setChildcare] = useState<ChildcareCenter | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const { toast } = useToast();

  useEffect(() => {
    async function fetchChildcare() {
      try {
        const response = await fetch(`/api/childcare/${params.id}`);
        if (!response.ok) throw new Error('Failed to fetch childcare');
        const data = await response.json();
        setChildcare(data);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to load childcare information',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    }

    fetchChildcare();
  }, [params.id, toast]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner />
      </div>
    );
  }

  if (!childcare) return <div>Childcare center not found</div>;

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">{childcare.name}</h1>

      <Tabs defaultValue="details" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
          <TabsTrigger value="details" className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            Details
          </TabsTrigger>
          <TabsTrigger value="programs" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Programs
          </TabsTrigger>
          <TabsTrigger value="website" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Website
          </TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-6">
          <ChildcareDetails childcare={childcare} setChildcare={setChildcare} />
        </TabsContent>

        <TabsContent value="programs" className="space-y-6">
          <ChildcarePrograms
            programs={childcare.programs}
            childcareId={childcare.id}
          />
        </TabsContent>

        <TabsContent value="website" className="space-y-6">
          <ChildcareWebPages
            childcareId={childcare.id}
            webPages={childcare.webPages || []}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}