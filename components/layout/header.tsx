'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function Header() {
  const { data: session } = useSession();

  return (
    <header className="border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/dashboard" className="text-xl font-bold">
          Dashboard
        </Link>
        <div className="flex items-center gap-4">
          {session?.user?.name && (
            <span className="text-sm text-gray-600">
              Welcome, {session.user.name}
            </span>
          )}
          <Button
            variant="outline"
            onClick={() => signOut({ callbackUrl: '/auth/login' })}
          >
            Logout
          </Button>
        </div>
      </div>
    </header>
  );
}