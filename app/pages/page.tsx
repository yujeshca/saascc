'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { WebPageList } from '@/components/webpage/webpage-list';
import { useToast } from '@/hooks/use-toast';
import type { WebPage } from '@prisma/client';
import Test from '@/components/test/test';

export default function WebPagesPage() {
  const [pages, setPages] = useState<WebPage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchPages() {
      try {
        const response = await fetch('/api/pages');
        if (!response.ok) throw new Error('Failed to fetch pages');
        const data = await response.json();
        setPages(data);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to load web pages',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    }

    fetchPages();
  }, [toast]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto py-8 px-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Web Pages</h1>
        <Button asChild>
          <Link href="/pages/new">
            <Plus className="mr-2 h-4 w-4" />
            Create Page
          </Link>
        </Button>
      </div>
      <WebPageList pages={pages} />
    </div>
  );
}