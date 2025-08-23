'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { CogIcon, ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/solid';

const Navbar = () => {
  const router = useRouter();

  // Verifica el estado de autenticación del usuario
  const [session, setSession] = React.useState(null);

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
      }
    );
    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  const isAdmin = session && session.user && session.user.role === 'admin';

  return (
    <nav className="bg-gray-900 border-b border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <Link href="/" className="text-white font-extrabold text-2xl tracking-wider text-glow">
              Catálogo Futura
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {isAdmin && (
              <Link href="/admin" className="text-blue-400 hover:text-blue-200 px-3 py-2 rounded-md font-medium flex items-center transition-colors duration-200">
                <CogIcon className="h-5 w-5 mr-1" />
                Admin
              </Link>
            )}
            {session ? (
              <button
                onClick={handleLogout}
                className="bg-red-700 text-white px-4 py-2 rounded-md font-medium hover:bg-red-800 transition-colors duration-200 flex items-center"
              >
                <ArrowRightStartOnRectangleIcon className="h-5 w-5 mr-2" />
                Salir
              </button>
            ) : (
              <Link href="/login" className="bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors duration-200 flex items-center">
                <UserIcon className="h-5 w-5 mr-2" />
                Ingresar
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
