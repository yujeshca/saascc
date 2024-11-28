'use client';

import { useSession } from 'next-auth/react';
import { Header } from '@/components/layout/header';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { UserCircle, Users, Calendar, Settings } from 'lucide-react';

export default function DashboardPage() {
  const { data: session } = useSession();

  const stats = [
    {
      title: 'Profile',
      icon: UserCircle,
      value: session?.user?.name || 'N/A',
      description: 'Your account',
    },
    {
      title: 'Role',
      icon: Users,
      value: (session?.user as any)?.role || 'user',
      description: 'Access level',
    },
    {
      title: 'Last Login',
      icon: Calendar,
      value: new Date().toLocaleDateString(),
      description: 'Recent activity',
    },
    {
      title: 'Settings',
      icon: Settings,
      value: 'Manage',
      description: 'Account preferences',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}