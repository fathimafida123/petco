import { getCart } from "../services/cartService";
import { getProducts } from "../services/product services";
import { setCart } from "../redux/slice/cartSlice";

export const loadUserCart = async (userId, dispatch) => {
  if (!userId) return;

  try {
    const products = await getProducts();
    const cartData = await getCart(userId);

    const completeCart = [];

    cartData.forEach((cartItem) => {
      const product = products.find(
        (product) => String(product.id) === String(cartItem.productId)
      );

      if (!product) return;

      const existingItem = completeCart.find(
        (item) => String(item.id) === String(product.id)
      );

      if (existingItem) {
        existingItem.quantity += Number(cartItem.quantity);
      } else {
        completeCart.push({
          ...product,
          cartId: cartItem.id,
          quantity: Number(cartItem.quantity),
        });
      }
    });

    dispatch(setCart(completeCart));
  } catch (error) {
    console.log("Failed to load cart:", error);
  }
};