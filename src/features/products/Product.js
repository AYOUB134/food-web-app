import React, { useState, useEffect } from 'react';
import { FaTimes, FaSearch } from 'react-icons/fa';

const ProductComponent = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [cartItems, setCartItems] = useState({});
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
    setShowAllCategories(false);
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
    setCartItems(prevCartItems => {
      const newCartItems = { ...prevCartItems };
      if (newCartItems[product.id]) {
        newCartItems[product.id].quantity += 1;
      } else {
        newCartItems[product.id] = { ...product, quantity: 1 };
      }
      return newCartItems;
    });
  };

  const handleRemoveFromCart = (product) => {
    setCartItems(prevCartItems => {
      const newCartItems = { ...prevCartItems };
      if (newCartItems[product.id] && newCartItems[product.id].quantity > 0) {
        newCartItems[product.id].quantity -= 1;
        if (newCartItems[product.id].quantity === 0) {
          delete newCartItems[product.id];
        }
      }
      return newCartItems;
    });
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

  // Helper function to get the first product of each category
  const getFirstProductsOfCategories = () => {
    const firstProducts = {};
    filteredProducts.forEach(product => {
      if (!firstProducts[product.category]) {
        firstProducts[product.category] = product.id;
      }
    });
    return firstProducts;
  };

  const firstProductsOfCategories = getFirstProductsOfCategories();

  return (
    <div className="relative">
      <div className="fixed top-8 left-0 right-0 bg-white z-40 p-4 shadow-md">
        <div className="w-full mb-2 flex items-center">
          <div className="relative w-full">
            <FaSearch className="absolute left-3 top-2 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-full pl-10 p-1.5 border border-gray-300 rounded-full"
              placeholder="Search Dish"
              style={{ backgroundColor: '#f5f5f5', fontSize: '12px', outline: 'none' }}
            />
          </div>
        </div>
        <div className="flex items-center justify-end mb-4 overflow-x-auto">
          <div className="flex items-center">
            {categories.map(category => (
              <button
                key={category}
                className={`px-4 py-2 rounded text-left ${selectedCategory === category ? 'text-white bg-black' : 'bg-gray-200'} ml-2`}
                onClick={() => handleCategoryClick(category)}
                style={{ fontSize: '12px' }}
              >
                {category}
              </button>
            ))}
          </div>
          <button
            className="px-4 py-2 rounded bg-gray-200 ml-2"
            onClick={toggleShowAllCategories}
            style={{ fontSize: '12px' }}
          >
            All
          </button>
        </div>
      </div>
      <div className="pt-32">
        {showAllCategories && (
          <div className="fixed inset-0 flex justify-center items-end z-50 bg-black bg-opacity-50 transition-transform transform duration-300">
            <div className="bg-white rounded-t-lg shadow-lg max-w-screen w-full md:max-w-md" style={{ maxHeight: '80vh' }}>
              <div className="p-4 flex justify-between items-center border-b">
                <button
                  className="text-gray-600 hover:text-gray-800 focus:outline-none"
                  onClick={toggleShowAllCategories}
                >
                  <FaTimes className="w-7 h-7" />
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
        {filteredProducts.map(product => {
  const isFirstProduct = firstProductsOfCategories[product.category] === product.id;
  return (
    <div key={product.id} className={`flex justify-between items-center mb-4 p-4 border-b ${isFirstProduct ? 'mt-10 relative' : ''}`}>
      {isFirstProduct && (
        <h1 className="absolute -top-6 left-0 p-4 font-bold mb-5">
          <span className="text-x2 text-bold font-bold pb-5" style={{ fontSize: '20px' }}>
            {product.category}
          </span>
        </h1>
      )}
      <div className={`flex items-center mt-1 ${isFirstProduct ? 'relative w-90' : ''}`}>
        <img
          src="https://api.chowbus.com/api/v2/image_proxy/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBNGcvUWc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--31c201caecc355c8996105144613917432bddc54/%E5%9C%9F%E8%B1%86%E4%B8%9D%E7%89%9B%E8%82%89%E7%9B%96%E6%B5%87%E9%A5%AD.jpeg"
          alt={product.title}
          className={`rounded mr-4 border border-gray-200 ${isFirstProduct ? 'w-100 h-100' : 'w-20 h-20'}`}
          style={isFirstProduct ? { width: '100%', height: '100%' } : {}}
        />
        {!isFirstProduct && (
          <div>
            <h6 className="text-sm font-bold truncate " style={{ fontSize: '13px' }}>{product.title}</h6>
            <p className="text-gray-700" style={{ fontSize: '13px' }}>${product.price}</p>
            <button
              className="text-black underline focus:outline-none block"
              onClick={() => handleShowDetails(product)}
              style={{ fontSize: '13px' }}
            >
              Detail
            </button>
          </div>
        )}
        {isFirstProduct && (
          <div className="absolute top-0 left-0 p-2 text-white">
            <h6 className="text-sm font-bold truncate text-white" style={{ fontSize: '16px' }}>{product.title}</h6>
            <p className=" text-white" style={{ fontSize: '16px' }}>${product.price}</p>
            <button
              className=" underline  focus:outline-none block text-white"
              onClick={() => handleShowDetails(product)}
              style={{ fontSize: '16px' }}
            >
              Detail
            </button>
          </div>
        )}
      </div>
      <div className={`flex items-center mt-5 ${isFirstProduct ? 'absolute bottom-2 right-2' : ''} ${isFirstProduct ? 'mb-8' : ''}`}>
        {cartItems[product.id] && cartItems[product.id].quantity > 0 && (
          <button
            className={`text-white bg-red-500 rounded-full w-9 h-9 flex items-center justify-center ${isFirstProduct ? '' : 'mr-2 '} ${isFirstProduct ? 'mb-0' : ''}`}
            onClick={() => handleRemoveFromCart(product)}
            style={{ backgroundColor: '#e00051', fontSize: '12px' }}
          >
            -
          </button>
        )}
        {cartItems[product.id] && cartItems[product.id].quantity > 0 && (
          <span className={`text-sm text-black bg-white text-center w-9 h-9 flex items-center justify-center rounded-full border border-b-gray-500 ${isFirstProduct ? 'ml-2' : ''}`}>
            {cartItems[product.id].quantity}
          </span>
        )}
        <button
          className={`text-white bg-green-500 rounded-full w-9 h-9 flex items-center justify-center ml-2 ${isFirstProduct ? 'mr-4' : 'ml-0'} ${isFirstProduct ? 'mb-0' : ''}`}
          onClick={() => handleAddToCart(product)}
          style={{ backgroundColor: '#e00051', fontSize: '12px' }}
        >
          +
        </button>
      </div>
    </div>
  );
})}

        </div>

        {Object.keys(cartItems).length > 0 && (
  <div
    className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-11/12 mb-5 text-white py-2 px-4 rounded-t-lg flex justify-between items-center transition-transform duration-300"
    style={{ backgroundColor: '#e00051' }}
  >
    <div className="relative">
      <span className="absolute left-0 top-0 -mt-3 flex items-center justify-center w-7 h-7 bg-white text-red-500 rounded-full">
        {Object.keys(cartItems).length}
      </span>
    </div>
    <span className="mx-auto" onClick={toggleShowCart}>View Cart</span>
  </div>
)}


{selectedProduct && (
  <div className="fixed inset-0 z-50 flex items-end justify-center bg-black bg-opacity-50 animate-slide-up">
    <div className="bg-white rounded-t-lg shadow-lg max-w-md w-full p-5 relative">
      <button
        className="absolute top-2 left-2 text-gray-600 bg-white ml-5 mt-5 rounded-full hover:text-gray-800 focus:outline-none"
        onClick={handleCloseDetails}
      >
        <FaTimes className="w-7 h-7" />
      </button>
      <div>
        <img
          src="https://api.chowbus.com/api/v2/image_proxy/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBNGcvUWc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--31c201caecc355c8996105144613917432bddc54/%E5%9C%9F%E8%B1%86%E4%B8%9D%E7%89%9B%E8%82%89%E7%9B%96%E6%B5%87%E9%A5%AD.jpeg"
          alt={selectedProduct.title}
          className="w-full mx-auto mb-4"
          style={{ width: '100%' }}
        />
        <h2 className="text-lg font-bold">{selectedProduct.title}</h2>
        <p className="text-gray-700 mb-2">${selectedProduct.price}</p>
        <p className="text-gray-600 mb-4">{selectedProduct.description}</p>
        <div className="flex justify-end mt-4">
          {cartItems[selectedProduct.id] ? (
            <>
              <button
                className="text-white bg-red-500 rounded-full w-10 h-10 flex items-center justify-center mr-2"
                onClick={() => handleRemoveFromCart(selectedProduct)}
                style={{ backgroundColor: '#e00051' }}
              >
                -
              </button>
              <span className="text-sm text-black bg-white text-center w-10 h-10 flex items-center justify-center rounded-full border border-b-gray-500">
                {cartItems[selectedProduct.id].quantity}
              </span>
              <button
                className="text-white bg-green-500 rounded-full w-10 h-10 flex items-center justify-center ml-2"
                onClick={() => handleAddToCart(selectedProduct)}
                style={{ backgroundColor: '#e00051' }}
              >
                +
              </button>
            </>
          ) : (
            <button
              className="text-white bg-red-500 rounded-full w-10 h-10 flex items-center justify-center"
              onClick={() => handleAddToCart(selectedProduct)}
              style={{ backgroundColor: '#e00051' }}
            >
              +
            </button>
          )}
        </div>
      </div>
    </div>
  </div>
)}


        {showCart && (
          <div className="fixed inset-0 z-50 flex items-end bg-black bg-opacity-50">
            <div className="bg-white rounded-t-lg shadow-lg max-w-md w-full p-4 overflow-y-auto relative" style={{ maxHeight: '80vh' }}>
              <button
                className="absolute top-2 left-2 text-gray-600 hover:text-gray-800 focus:outline-none"
                onClick={toggleShowCart}
              >
                <FaTimes className="w-7 h-7" />
              </button>
              <div className="text-center">
                <h2 className="text-lg font-bold mb-4">Cart Items</h2>
                {Object.values(cartItems).map((product) => (
                  <div key={product.id} className="flex justify-between items-center mb-4 p-4 border-b">
                    <div className="flex items-center">
                      <img src="https://api.chowbus.com/api/v2/image_proxy/blobs/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBNGcvUWc9PSIsImV4cCI6bnVsbCwicHVyIjoiYmxvYl9pZCJ9fQ==--31c201caecc355c8996105144613917432bddc54/%E5%9C%9F%E8%B1%86%E4%B8%9D%E7%89%9B%E8%82%89%E7%9B%96%E6%B5%87%E9%A5%AD.jpeg"
                        alt={product.title} className="w-16 h-16 rounded mr-4 border border-gray-200" />
                      <div>
                        <h6 className="text-sm font-bold truncate w-40">{product.title}</h6>
                        <p className="text-gray-700">${product.price}</p>
                      </div>
                    </div>
                    <div className="flex items-center mt-5">
                      {product.quantity > 0 && (
                        <button
                          className="text-white rounded-full w-8 h-8 flex items-center justify-center mr-0"
                          onClick={() => handleRemoveFromCart(product)}
                          style={{ backgroundColor: '#e00051' }}
                        >
                          -
                        </button>
                      )}
                      {product.quantity > 0 && (
                        <span className="text-sm text-black bg-white text-center w-7 h-7 flex items-center justify-center rounded-full border border-b-gray-500">
                          {product.quantity}
                        </span>
                      )}
                      <button
                        className="text-white rounded-full w-8 h-8 flex items-center justify-center ml-0"
                        onClick={() => handleAddToCart(product)}
                        style={{ backgroundColor: '#e00051' }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductComponent;
