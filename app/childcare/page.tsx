'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ChildcareList } from '@/components/childcare/childcare-list';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { useToast } from '@/hooks/use-toast';
import type { ChildcareCenter } from '@/lib/types/childcare';

const ITEMS_PER_PAGE = 6;

export default function ChildcarePage() {
  const [childcareCenters, setChildcareCenters] = useState<ChildcareCenter[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchChildcareCenters() {
      try {
        const response = await fetch('/api/childcare');
        if (!response.ok) throw new Error('Failed to fetch childcare centers');
        const data = await response.json();
        setChildcareCenters(data);
      } catch (error) {
        toast({
          title: 'Error',
          description: 'Failed to load childcare centers',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    }

    fetchChildcareCenters();
  }, [toast]);

  const totalPages = Math.ceil(childcareCenters.length / ITEMS_PER_PAGE);
  const paginatedCenters = childcareCenters.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Childcare Centers</h1>
        <Button asChild>
          <Link href="/childcare/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Center
          </Link>
        </Button>
      </div>

      <ChildcareList
        centers={paginatedCenters}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}