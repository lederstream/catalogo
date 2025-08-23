import React from 'react';
import Image from 'next/image';

const ProductCard = ({ product, isAdmin, onEdit, onDelete }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 hover:shadow-2xl hover:border-blue-500 transition-all duration-300">
      <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden">
        {/* Usamos el componente Image de Next.js para optimización */}
        {product.photo_url ? (
          <Image
            src={product.photo_url}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        ) : (
          <div className="bg-gray-700 h-full w-full flex items-center justify-center text-gray-400">
            Sin imagen
          </div>
        )}
      </div>
      <span className="inline-block bg-blue-900 text-blue-400 text-xs font-semibold px-3 py-1 rounded-full mb-3">
        {product.category}
      </span>
      <h3 className="text-2xl font-bold text-white mb-2">{product.name}</h3>
      <p className="text-gray-400 text-sm mb-4">{product.description}</p>
      
      {/* Sección de precios */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-2xl font-extrabold text-green-400">
          S/{product.price_soles}
        </span>
        <span className="text-xl font-bold text-green-400/80">
          ${product.price_dollars}
        </span>
      </div>

      {/* Planes del servicio */}
      {product.plans && product.plans.length > 0 && (
        <div className="mt-4">
          <p className="text-sm font-semibold text-gray-300 mb-2">Planes:</p>
          <ul className="space-y-2">
            {product.plans.map((plan, index) => (
              <li key={index} className="flex items-center text-gray-400 text-sm">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                {plan}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Botones de administración si es admin */}
      {isAdmin && (
        <div className="mt-6 flex space-x-4">
          <button
            onClick={() => onEdit(product)}
            className="flex-1 bg-yellow-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-yellow-700 transition-colors duration-200"
          >
            Editar
          </button>
          <button
            onClick={() => onDelete(product.id)}
            className="flex-1 bg-red-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors duration-200"
          >
            Eliminar
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
