'use client';

import { Toaster } from "@/components/ui/toaster";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  
  // Don't show logout button on login page
  const isLoginPage = pathname === '/admin/login';
  
  const handleLogout = () => {
    // Clear the authentication cookie
    document.cookie = 'admin_authenticated=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
    // Redirect to login page
    router.push('/admin/login');
  };
  
  return (
    <>
      {!isLoginPage && (
        <div className="fixed top-0 right-0 z-50 p-4">
          <Button variant="outline" onClick={handleLogout} size="sm" className="bg-white shadow-md">
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      )}
      {children}
      <Toaster />
    </>
  );
}
