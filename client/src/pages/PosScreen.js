import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../features/product/productSlice";
import api from "../services/api";
import MainLayout from "../components/MainLayout/MainLayout";
import ProductCard from "../components/ProductCard/ProductCard";
import Cart from "../components/Cart/Cart";
import './PosScreen.css';

const PosScreen = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const [cart, setCart] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All Items');

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const categories = ['All Items', 'Fresh Produce', 'Beverages', 'Bakery', 'Snacks', 'Household'];

  const addToCart = (product) => {
    const exist = cart.find((item) => item.productId === product._id);

    if (exist) {
      setCart(
        cart.map((item) =>
          item.productId === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          productId: product._id,
          name: product.name,
          price: product.sellingPrice || product.price,
          quantity: 1,
        },
      ]);
    }
  };

  const removeFromCart = (index) => {
    setCart(cart.filter((_, i) => i !== index));
  };

  const updateQuantity = (index, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(index);
    } else {
      const updatedCart = [...cart];
      updatedCart[index].quantity = newQuantity;
      setCart(updatedCart);
    }
  };

  const handleCheckout = async () => {
    try {
      await api.post("/sales", {
        items: cart,
        paymentMethod: "cash",
      });

      alert("✅ Sale recorded successfully");
      setCart([]);
    } catch (err) {
      console.error(err);
      alert("Payment error");
    }
  };

  return (
    <MainLayout>
      <div className="pos-screen">
        <div className="pos-container">
          {/* PRODUCTS SECTION */}
          <div className="products-section">
            {/* Category Filter */}
            <div className="category-filter">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`category-btn ${activeCategory === category ? 'active' : ''}`}
                  onClick={() => setActiveCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Products Grid */}
            <div className="products-grid">
              {products.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  onAddToCart={addToCart}
                />
              ))}
            </div>
          </div>

          {/* CART SIDEBAR */}
          <div className="cart-section">
            <Cart
              items={cart}
              onRemoveItem={removeFromCart}
              onUpdateQuantity={updateQuantity}
              onCheckout={handleCheckout}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default PosScreen;