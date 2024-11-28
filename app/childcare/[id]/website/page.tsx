'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { WebsiteSettings } from '@/components/website/website-settings';
import { WebsiteHeader } from '@/components/website/website-header';
import { WebsiteFooter } from '@/components/website/website-footer';
import { WebsiteMenu } from '@/components/website/website-menu';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { useToast } from '@/hooks/use-toast';
import type { Website } from '@/lib/types/website';

export default function WebsitePage() {
  const [website, setWebsite] = useState<Website | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const { toast } = useToast();

  useEffect(() => {
    async function fetchWebsite() {
      try {
        const response = await fetch(`/api/childcare/${params.id}/website`);
        if (!response.ok) throw new Error('Failed to fetch website');
        const data = await response.json();
        setWebsite(data);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to load website information',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    }

    fetchWebsite();
  }, [params.id, toast]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner />
      </div>
    );
  }

  if (!website) {
    return <div>Website not found</div>;
  }

  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Website Management</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="settings" className="space-y-6">
            <TabsList>
              <TabsTrigger value="settings">Settings</TabsTrigger>
              <TabsTrigger value="header">Header</TabsTrigger>
              <TabsTrigger value="footer">Footer</TabsTrigger>
              <TabsTrigger value="menu">Menu</TabsTrigger>
            </TabsList>

            <TabsContent value="settings">
              <WebsiteSettings 
                website={website} 
                onUpdate={(updatedWebsite) => setWebsite(updatedWebsite)} 
              />
            </TabsContent>

            <TabsContent value="header">
              <WebsiteHeader 
                website={website} 
                onUpdate={(updatedWebsite) => setWebsite(updatedWebsite)} 
              />
            </TabsContent>

            <TabsContent value="footer">
              <WebsiteFooter 
                website={website} 
                onUpdate={(updatedWebsite) => setWebsite(updatedWebsite)} 
              />
            </TabsContent>

            <TabsContent value="menu">
              <WebsiteMenu 
                website={website} 
                onUpdate={(updatedWebsite) => setWebsite(updatedWebsite)} 
              />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}