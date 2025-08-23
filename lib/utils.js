// Librería de utilidades

/**
 * Convierte un precio de soles a dólares usando un tipo de cambio fijo.
 * @param {number} soles - Precio en soles.
 * @returns {number} Precio en dólares redondeado a dos decimales.
 */
export const convertSolesToDollars = (soles) => {
  const exchangeRate = 3.8; // Tipo de cambio fijo
  return (soles / exchangeRate).toFixed(2);
};
