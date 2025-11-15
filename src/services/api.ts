export async function fetchProducts() {
  const r = await fetch('https://fakestoreapi.com/products');
  return await r.json();
}