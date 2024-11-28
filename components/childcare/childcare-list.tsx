'use client';

import Link from 'next/link';
import { MapPin, Phone, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import type { ChildcareCenter } from '@/lib/types/childcare';

interface ChildcareListProps {
  centers: ChildcareCenter[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function ChildcareList({ 
  centers, 
  currentPage, 
  totalPages, 
  onPageChange 
}: ChildcareListProps) {
  if (centers.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No childcare centers found.</p>
        <Button asChild className="mt-4">
          <Link href="/childcare/new">Add Your First Center</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {centers.map((center) => (
          <Card key={center.id} className="flex flex-col">
            <CardHeader>
              <CardTitle className="line-clamp-1">{center.name}</CardTitle>
              {center.tagline && (
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {center.tagline}
                </p>
              )}
            </CardHeader>
            <CardContent className="flex-grow space-y-3">
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
                <p className="text-sm line-clamp-2">{center.address}</p>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <p className="text-sm">{center.contact}</p>
              </div>
              {center.businessHours && (
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <p className="text-sm">{center.businessHours}</p>
                </div>
              )}
            </CardContent>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/childcare/${center.id}`}>
                  View Details
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              href="#"
              onClick={() => onPageChange(currentPage - 1)}
              className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>
          
          {[...Array(totalPages)].map((_, i) => {
            const page = i + 1;
            // Show first page, current page, last page, and pages around current
            if (
              page === 1 ||
              page === totalPages ||
              (page >= currentPage - 1 && page <= currentPage + 1)
            ) {
              return (
                <PaginationItem key={page}>
                  <PaginationLink
                    href="#"
                    onClick={() => onPageChange(page)}
                    isActive={currentPage === page}
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              );
            }
            // Show ellipsis for gaps
            if (
              page === currentPage - 2 ||
              page === currentPage + 2
            ) {
              return (
                <PaginationItem key={page}>
                  <PaginationEllipsis />
                </PaginationItem>
              );
            }
            return null;
          })}

          <PaginationItem>
            <PaginationNext 
              href="#"
              onClick={() => onPageChange(currentPage + 1)}
              className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}