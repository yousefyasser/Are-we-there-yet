import React, { useState, useEffect } from 'react';
import ProductList from '../components/ProductList';
import { Product } from '../types/product';
import { createProduct, deleteProduct, getProductBySeller, updateProduct } from '../Api/ProductService';
import { ProductFormData } from '../components/ProductForm';

const SellerPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProductBySeller('60a7d6d2e6e6c40015b3a6d7');
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const handleCreate = async (productData: ProductFormData) => {
    const product = {
      name: productData.name,
      description: productData.description,
      price: productData.price,
      available_quantity: productData.available_quantity,
      attachments: [],
      reviews: [],
      seller: '60a7d6d2e6e6c40015b3a6d7',
    };
    await createProduct(product);
    const Products = await getProductBySeller('60a7d6d2e6e6c40015b3a6d7');
    setProducts(Products);
  };

  const handleEdit = async (productData: Product) => {
    console.log(productData);
    const product = {
      _id: productData._id,
      name: productData.name,
      description: productData.description,
      price: productData.price,
      available_quantity: productData.available_quantity,
      attachments: [],
      reviews: [],
      seller: '60a7d6d2e6e6c40015b3a6d7',
    };
    await updateProduct(product._id, product);
    const products = await getProductBySeller('60a7d6d2e6e6c40015b3a6d7');
    setProducts(products);
  };

  const handleDelete = async (productId: string) => {
    await deleteProduct(productId);
    setProducts(products.filter((p) => p._id !== productId));
  };

  return (
    <div>
      <div className="flex flex-col justify-end divide-y-2 divide-borders-bottomBorder p-2 text-text-primary">
        <h1 className="py-2 text-4xl font-bold">Welcome Seller</h1>
        <h3 className="py-2 text-2xl font-bold">My Products</h3>
      </div>
      {/* <ProductForm onSubmit={handleCreate} /> */}
      <ProductList
        products={products}
        role="seller"
        onCreate={handleCreate}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default SellerPage;
