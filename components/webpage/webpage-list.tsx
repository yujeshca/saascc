'use client';

import Link from 'next/link';
import { Edit, Globe, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import type { WebPage } from '@prisma/client';
import { useState } from 'react';
import { WebPageForm } from './webpage-form';

interface WebPageListProps {
  pages: WebPage[];
  onPageUpdate: any
}

export function WebPageList({ pages, onPageUpdate }: WebPageListProps) {
  const [editingProgram, setEditingProgram] = useState<WebPage | null>(null);

  // console.log(editingProgram)
  if (editingProgram) {
    return (
      <WebPageForm
        childcareId={editingProgram.childcareCenterId}
        initialData={editingProgram}
        onSuccess={(updatedProgram) => {
          onPageUpdate(updatedProgram);
          setEditingProgram(null);
        }}
        onCancel={() => setEditingProgram(null)}
      />
    );
  }
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {pages.map((page) => (
            <TableRow key={page.id}>
              <TableCell>{page.title}</TableCell>
              <TableCell>{page.pageType}</TableCell>
              <TableCell>
                {new Date(page.updatedAt).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    asChild
                  >
                    <Link href={`/preview/${page.slug}`}>
                      <Globe className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    asChild
                  >
                    {/* <Link href={`/pages/${page.id}/edit`}> */}
                    <button onClick={() => setEditingProgram(page)}>
                      <Edit className="h-4 w-4" />
                    </button>
                    {/* </Link> */}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}