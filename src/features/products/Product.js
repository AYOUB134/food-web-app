import React, { useState, useEffect } from 'react';

const ProductComponent = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data.products);
        setFilteredProducts(data.products);
        const allCategories = [...new Set(data.products.map(product => product.category))];
        setCategories(allCategories);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchData();
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    filterProducts(e.target.value, selectedCategory);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    filterProducts(searchQuery, category);
  };

  const toggleShowAllCategories = () => {
    setShowAllCategories(!showAllCategories);
  };

  const filterProducts = (query, category) => {
    let filtered = products;
    if (query) {
      filtered = filtered.filter(product => product.title.toLowerCase().includes(query.toLowerCase()));
    }
    if (category && category !== 'all') {
      filtered = filtered.filter(product => product.category === category);
    }
    setFilteredProducts(filtered);
  };

  const handleAddToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const handleShowDetails = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseDetails = () => {
    setSelectedProduct(null);
  };

  const toggleShowCart = () => {
    setShowCart(!showCart);
  };

  return (
    <div className="relative p-4">
      <div className="w-full mb-4 flex items-center">
        <div className="relative w-full">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full pl-10 p-2 border border-gray-300 rounded-full"
            placeholder="Search Dish"
          />
        </div>
      </div>
      <div className="flex items-center justify-end mb-4 overflow-x-auto">
        <div className="flex items-center">
          {categories.map(category => (
            <button
              key={category}
              className={`px-4 py-2 rounded-full text-left ${selectedCategory === category ? 'text-white bg-blue-500' : 'bg-gray-200'} ml-2`}
              onClick={() => handleCategoryClick(category)}
            >
              {category}
            </button>
          ))}
        </div>
        <button
          className="px-4 py-2 rounded-full bg-gray-200 ml-2"
          onClick={toggleShowAllCategories}
        >
          All
        </button>
      </div>
      {showAllCategories && (
        <div className="fixed inset-0 flex justify-center items-end z-50 bg-black bg-opacity-50 transition-transform transform duration-300">
          <div className="bg-white rounded-t-lg shadow-lg max-w-screen w-full md:max-w-md" style={{ maxHeight: '80vh' }}>
            <div className="p-4 flex justify-between items-center border-b">
              <button
                className="text-gray-600 hover:text-gray-800 focus:outline-none absolute top-2 left-2"
                onClick={toggleShowAllCategories}
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M3.293 3.293a1 1 0 011.414 0L10 8.586l5.293-5.293a1 1 0 111.414 1.414L11.414 10l5.293 5.293a1 1 0 01-1.414 1.414L10 11.414l-5.293 5.293a1 1 0 01-1.414-1.414L8.586 10 3.293 4.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <h3 className="text-lg font-bold text-center flex-1">Categories</h3>
            </div>
            <div className="flex flex-col items-center p-4 overflow-y-auto">
              {categories.map((category, index) => (
                <React.Fragment key={category}>
                  <button
                    className={`w-full text-left py-2 ${selectedCategory === category ? 'font-bold' : ''}`}
                    onClick={() => handleCategoryClick(category)}
                  >
                    {category}
                  </button>
                  {index < categories.length - 1 && <hr className="border-gray-300 my-2" />}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      )}
      <div>
        {filteredProducts.map(product => (
          <div key={product.id} className="flex justify-between items-center mb-4 p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center">
              <img src={product.thumbnail} alt={product.title} className="w-16 h-16 rounded-full mr-4" />
              <div>
                <h2 className="text-sm font-bold truncate w-40">{product.title}</h2>
                <p className="text-gray-700">${product.price}</p>
                <button
                  className="underline text-blue-500"
                  onClick={() => handleShowDetails(product)}
                >
                  Detail
                </button>
              </div>
            </div>
            <button
              className="text-white bg-red-500 rounded-full w-8 h-8 flex items-center justify-center"
              onClick={() => handleAddToCart(product)}
            >
              +
            </button>
          </div>
        ))}
      </div>
      {cartItems.length > 0 && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-11/12 bg-red-500 text-white py-2 px-4 rounded-full flex justify-between items-center transition-transform transform duration-300">
          <div className="relative mb-2">
            <span className="absolute left-0 top-0 -mt-2 flex items-center justify-center w-6 h-6 bg-white text-red-500 rounded-full">
              {cartItems.length}
            </span>
          </div>
          <span className="mx-auto" onClick={toggleShowCart}>View Cart</span>
        </div>
      )}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-4 relative">
            <button
              className="absolute top-2 left-2 text-gray-600 hover:text-gray-800 focus:outline-none"
              onClick={handleCloseDetails}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M3.293 3.293a1 1 0 011.414 0L10 8.586l5.293-5.293a1 1 0 111.414 1.414L11.414 10l5.293 5.293a1 1 0 01-1.414 1.414L10 11.414l-5.293 5.293a1 1 0 01-1.414-1.414L8.586 10 3.293 4.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <div className="text-center">
              <img src={selectedProduct.thumbnail} alt={selectedProduct.title} className="w-32 h-32 rounded-full mx-auto mb-4" />
              <h2 className="text-lg font-bold">{selectedProduct.title}</h2>
              <p className="text-gray-700 mb-2">${selectedProduct.price}</p>
              <p className="text-gray-600">{selectedProduct.description}</p>
            </div>
          </div>
        </div>
      )}
      {showCart && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-4 overflow-y-auto relative" style={{ maxHeight: '80vh' }}>
            <button
              className="absolute top-2 left-2 text-gray-600 hover:text-gray-800 focus:outline-none"
              onClick={toggleShowCart}
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M3.293 3.293a1 1 0 011.414 0L10 8.586l5.293-5.293a1 1 0 111.414 1.414L11.414 10l5.293 5.293a1 1 0 01-1.414 1.414L10 11.414l-5.293 5.293a1 1 0 01-1.414-1.414L8.586 10 3.293 4.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            <div className="text-center">
              <h2 className="text-lg font-bold mb-4">Cart Items</h2>
              {cartItems.map((product) => (
                <div key={product.id} className="flex justify-between items-center mb-4 p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center">
                    <img src={product.thumbnail} alt={product.title} className="w-16 h-16 rounded-full mr-4" />
                    <div>
                      <h2 className="text-sm font-bold truncate w-40">{product.title}</h2>
                      <p className="text-gray-700">${product.price}</p>
                    </div>
                  </div>
                  <button
                    className="text-white bg-red-500 rounded-full w-8 h-8 flex items-center justify-center"
                  >
                    +
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductComponent;
