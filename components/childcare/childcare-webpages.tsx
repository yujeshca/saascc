'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { WebPageForm } from '@/components/webpage/webpage-form';
import { WebPageList } from '@/components/webpage/webpage-list';
import { WebPageTitleForm } from '@/components/webpage/webpage-title-form';
import type { WebPage } from '@prisma/client';

interface ChildcareWebPagesProps {
  childcareId: number;
  webPages: WebPage[];
}

export function ChildcareWebPages({ childcareId, webPages: initialPages }: ChildcareWebPagesProps) {
  const [webPages, setWebPages] = useState(initialPages);
  const [isAddingPage, setIsAddingPage] = useState(false);
  const [pageData, setPageData] = useState<{
    title: string;
    pageType: string;
    content: string;
  } | null>(null);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Website Pages</CardTitle>
        <Button onClick={() => setIsAddingPage(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Page
        </Button>
      </CardHeader>
      <CardContent>
        {isAddingPage && !pageData ? (
          <WebPageTitleForm
            childcareId={childcareId}
            onSuccess={(data) => {
              setPageData(data);
            }}
            onCancel={() => setIsAddingPage(false)}
          />
        ) : pageData ? (
          <WebPageForm
            childcareId={childcareId}
            initialData={pageData}
            onSuccess={(newPage) => {
              setWebPages([...webPages, newPage]);
              setIsAddingPage(false);
              setPageData(null);
            }}

            onCancel={() => {
              setIsAddingPage(false);
              setPageData(null);
            }}
          />
        ) : (
          <WebPageList
            pages={webPages}
            onPageUpdate={(updatedPage) => {
              setWebPages(webPages.map(p =>
                p.id === updatedPage.id ? updatedPage : p
              ));
            }}
            onPageDelete={(deletedId) => {
              setWebPages(webPages.filter(p => p.id !== deletedId));
            }}
          />
        )}
      </CardContent>
    </Card>
  );
}