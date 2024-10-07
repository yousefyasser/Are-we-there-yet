import React, { useState, useRef } from 'react';
import { Product } from '../types/product';
import { Minus, Plus } from 'lucide-react';
import Modal, { ModalRef } from './modal';
import ProductForm, { ProductFormData } from './ProductForm';
import defaultPhoto from '../assets/defaultPhoto.png';

interface ProductListProps {
  products: Product[]; // All products
  role: 'admin' | 'seller' | 'tourist'; // Define user roles
  onEdit?: (product: Product) => void; // Admin/Seller functionality
  onDelete?: (productId: string) => void; // Admin/Seller functionality
  onCreate?: (productData: ProductFormData) => void; // Admin/Seller functionality
}

const defaultImage = defaultPhoto;

const ProductList: React.FC<ProductListProps> = ({ products, role, onCreate, onEdit, onDelete }) => {
  const [searchQuery, setSearchQuery] = useState(''); // State for search input
  const [minPrice, setMinPrice] = useState<number | ''>(''); // State for minimum price filter
  const [maxPrice, setMaxPrice] = useState<number | ''>(''); // State for maximum price filter
  const [sortByRating, setSortByRating] = useState<'none' | 'asc' | 'desc'>('none'); // State for sorting by rating
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null); // State to store the clicked product

  const EditmodalRef = useRef<ModalRef>(null); // Reference for modal
  const AddmodalRef = useRef<ModalRef>(null); // Reference for modal

  // Function to toggle between sorting orders
  const toggleSortByRating = () => {
    if (sortByRating === 'none') {
      setSortByRating('asc');
    } else if (sortByRating === 'asc') {
      setSortByRating('desc');
    } else {
      setSortByRating('none');
    }
  };

  // Open the modal and set the selected product
  const handleOpenModal = (product: Product) => {
    setSelectedProduct(product);
    EditmodalRef.current?.open(); // Open the modal
  };
  // Filter and sort products
  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice =
        (minPrice === '' || product.price >= minPrice) && (maxPrice === '' || product.price <= maxPrice);
      return matchesSearch && matchesPrice;
    })
    .sort((a, b) => {
      const averageRatingA =
        a.reviews.length > 0 ? a.reviews.reduce((sum, review) => sum + review.rating, 0) / a.reviews.length : 0;
      const averageRatingB =
        b.reviews.length > 0 ? b.reviews.reduce((sum, review) => sum + review.rating, 0) / b.reviews.length : 0;
      if (sortByRating === 'asc') {
        return averageRatingA - averageRatingB;
      }
      if (sortByRating === 'desc') {
        return averageRatingB - averageRatingA;
      }
      return 0; // No sorting
    });

  return (
    <div className={customStyles.container}>
      {/* Search and Filter Controls */}
      <div className={customStyles.filterContainer}>
        <input
          type="text"
          placeholder="Search by name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={customStyles.searchBar}
        />
        <div className={customStyles.priceFilters}>
          <input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value) || '')}
            className={customStyles.priceInput}
          />
          <input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value) || '')}
            className={customStyles.priceInput}
          />
        </div>
        {/* Button to toggle sort by rating */}
        <button onClick={toggleSortByRating} className={customStyles.sortButton}>
          Sort by Rating ({sortByRating === 'none' ? 'None' : sortByRating === 'asc' ? 'Asc' : 'Desc'})
        </button>
      </div>

      {/* Product List */}
      <div className={customStyles.sliderContainer}>
        <div className={customStyles.sliderContent}>
          <div className={customStyles.sliderWrapper}>
            {(role === 'admin' || role === 'seller') && (
              <div className={customStyles.slide}>
                <div onClick={() => AddmodalRef.current?.open()} className={customStyles.addSlideDiv}>
                  <Plus className={customStyles.addSlideIcon} />
                </div>
              </div>
            )}
            {filteredProducts.map((product, index) => (
              <div key={index} className={customStyles.slide}>
                <div onClick={() => handleOpenModal(product)} className={customStyles.slideContent}>
                  {(role === 'admin' || role === 'seller') && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent the event from bubbling up to the parent
                        if (onDelete) {
                          onDelete(product._id);
                        }
                      }}
                      className={customStyles.removeButton}
                    >
                      <Minus size={16} className="duration-150 group-hover:stroke-black" />
                    </button>
                  )}
                  <img
                    src={product.attachments?.length > 0 ? product.attachments[0] : defaultImage}
                    alt={product.name}
                    className={customStyles.productImage} // Add your styles here
                  />
                  <h3 className={customStyles.slideTitle}>{product.name}</h3>
                  <p className={customStyles.slideText}>{product.description}</p>
                  <p className={customStyles.slideText}>Price: {product.price}</p>
                  <p className={customStyles.slideText}>Quantity: {product.available_quantity}</p>
                  <strong>Rating:</strong>
                  {product.reviews.length > 0
                    ? (
                        product.reviews.reduce((sum, review) => sum + review.rating, 0) / product.reviews.length
                      ).toFixed(1)
                    : '0'}
                  /5
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Modal for showing product details */}
      <Modal
        ref={EditmodalRef}
        title={selectedProduct?.name || 'Product Details'}
        onClose={() => setSelectedProduct(null)}
      >
        {selectedProduct && (
          <div>
            {role === 'tourist' && (
              <>
                <p>
                  <strong>Description:</strong> {selectedProduct.description}
                </p>
                <p>
                  <strong>Price:</strong> {selectedProduct.price}
                </p>
                <p>
                  <strong>Quantity:</strong> {selectedProduct.available_quantity}
                </p>
                <p>
                  <strong>Rating:</strong>
                  {selectedProduct.reviews.length > 0
                    ? (
                        selectedProduct.reviews.reduce((sum, review) => sum + review.rating, 0) /
                        selectedProduct.reviews.length
                      ).toFixed(1)
                    : '0'}
                  /5
                </p>
                <p>
                  <strong>reviews:</strong>
                </p>
                {selectedProduct.reviews.map((review, index) => (
                  <>
                    <p key={index}>
                      {index + 1}.Rating : {review.rating}/5
                    </p>
                    <p className="ml-2"> Comment : {review.comment}</p>
                  </>
                ))}
              </>
            )}

            {role === 'admin' || role === 'seller' ? (
              <ProductForm
                addModalRef={EditmodalRef}
                onUpdate={onEdit}
                initialData={{
                  name: selectedProduct.name,
                  description: selectedProduct.description,
                  price: selectedProduct.price,
                  available_quantity: selectedProduct.available_quantity,
                  attachments: [], // Add an empty array or appropriate initial value for attachments
                }}
                selectedProduct={selectedProduct}
              />
            ) : null}
          </div>
        )}
      </Modal>

      {/* Modal for adding a new product */}
      <Modal ref={AddmodalRef} title="Add Product">
        <div>
          <ProductForm addModalRef={AddmodalRef} onSubmit={onCreate} />
        </div>
      </Modal>
    </div>
  );
};

const customStyles = {
  container: 'h-auto max-h-[85vh] max-w-fit border-2 border-gray-300 pr-14 pt-4 pl-20 pb-10 mx-auto',
  filterContainer: 'flex items-center justify-between gap-4 mb-4',
  searchBar: 'px-4 py-2 border border-gray-300 rounded-lg w-[200px]',
  priceFilters: 'flex gap-4',
  priceInput: 'px-4 py-2 border border-gray-300 rounded-lg w-[50%]',
  sortButton: 'px-4 py-2 border border-gray-300 rounded-lg bg-blue-500 text-white',
  sliderContainer: 'relative',
  sliderContent: 'overflow-hidden',
  sliderWrapper: 'grid grid-cols-3 gap-3 max-h-[65vh] overflow-y-auto', // Set a max height and make it scrollable
  slide: 'w-[22%] h-[100%] flex-shrink-0 px-2 transition-all duration-600 m-6',
  slideContent: 'h-[50vh] w-[35vh] overflow-auto border-2 border-gray-300 bg-white p-6 relative cursor-pointer',
  slideTitle: 'mb-2 font-bold',
  slideText: 'text-sm',
  navButton:
    'absolute top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-white bg-opacity-50 p-2 transition-all hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-black',
  removeButton:
    'absolute group top-2 right-2 z-10 rounded-full border border-gray-500 bg-background-button p-1 hover:bg-red-600 focus:outline-none duration-150',
  addSlideDiv:
    'flex items-center justify-center h-[50vh] w-[35vh] border-2 border-dashed border-gray-300 bg-white cursor-pointer hover:bg-gray-50',
  addSlideIcon: 'text-gray-400 w-16 h-16',
  navigationButtons: 'flex justify-between mt-4',
  endBeginButton:
    'px-4 py-2 rounded hover:opacity-70 focus:outline-none flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed',
  editButton: 'px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600',
  editSection: 'mt-4',
  productImage: 'w-full h-[55%] object-cover mb-4',
};

export default ProductList;