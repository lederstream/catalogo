import React from 'react';
import Navbar from '@/components/Navbar';
import ProductCard from '@/components/ProductCard';
import { supabase } from '@/lib/supabaseClient';

async function getProducts() {
  const { data: products, error } = await supabase.from('products').select('*');
  if (error) {
    console.error('Error fetching products:', error);
    return [];
  }
  return products;
}

export default async function HomePage() {
  const products = await getProducts();

  return (
    <>
      <Navbar />
      <main className="min-h-screen container mx-auto px-4 py-12">
        <h1 className="text-5xl md:text-6xl font-extrabold text-center text-white mb-10 tracking-tight text-glow animate-fadeIn">
          Catálogo de Servicios Digitales
        </h1>
        
        {products.length === 0 ? (
          <p className="text-center text-gray-400 text-2xl mt-20">
            No hay productos disponibles en este momento.
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
    </>
  );
}
