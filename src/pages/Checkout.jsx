

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { User, Mail, Phone, MapPin, Truck, ShieldCheck } from "lucide-react";
import { calculateTotal } from "../utils/priceCalculator";
import { deleteCart } from "../services/cartService";
import { setCart } from "../redux/slice/cartSlice";
import { addOrder } from "../services/order services";
import toast from "react-hot-toast";
import { Banknote,Smartphone,CreditCard } from "lucide-react";


function Checkout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const[upiId,setUpiId]=useState("")
const[paymentMethod,setPaymentMethod]=useState("cod")
  const cartItems = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.auth.user);

  const subTotal = calculateTotal(cartItems);
  const deliveryFee = subTotal > 500 ? 0 : 40;
  const discount = subTotal > 3000 ? 100 : 40;
  const grandTotal = subTotal + deliveryFee - discount;

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });
const[errors,setErrors]=useState({})
  const [isPlacing, setIsPlacing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if(errors[name]){
      setErrors({...errors,[name]:""}) //remove error when the user start type
    }
  };
    
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = "Enter a valid 10-digit phone number";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    }

    if (!formData.state.trim()) {
      newErrors.state = "State is required";
    }

    if (!formData.pincode.trim()) {
      newErrors.pincode = "Pincode is required";
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = "Enter a valid 6-digit pincode";
    }
    if (paymentMethod === "upi" && !upiId.trim()) {
  newErrors.upiId = "Enter your UPI ID";
}

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;   // true = errors illa
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!user) {
      navigate("/login");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    if (!validateForm()) {   
      toast.error("Please fix the errors in the form");
      return;
    }
    setIsPlacing(true);

    try {
      const orderData = {
        userId: user.id,
        items: cartItems.map((item) => ({
          productId: String(item.id),
          name: item.name,
          image: item.image,
          price: item.price,
          quantity: item.quantity,
        })),
        ...formData,
        paymentMethod,
        upiId:paymentMethod==="upi" ?upiId:null,
        subTotal,
        deliveryFee,
        discount,
        grandTotal,
        status: "Placed",
        createdAt: new Date().toISOString(),
      };

      await addOrder(orderData);
      await Promise.all(cartItems.map((item) => deleteCart(item.cartId)));
      dispatch(setCart([]));

      toast.success("Order placed successfully!");
      navigate("/orders");
    } catch (error) {
      console.log("failed to place order:", error);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setIsPlacing(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#F8F5EC] flex items-center justify-center px-5">
        <div className="text-center max-w-sm">
          <h1 className="text-2xl font-bold text-[#2F5D50] mb-2">
            Nothing to check out yet
          </h1>
          <p className="text-gray-500 mb-6">
            Your cart is empty. Add a few things you love, then come back here.
          </p>
          <Link
            to="/product"
            className="inline-block bg-[#2F5D50] text-white px-8 py-3 rounded-xl font-semibold hover:bg-[#244a40] transition"
          >
            Browse products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F5EC] py-10 px-5">
      <div className="max-w-6xl mx-auto mb-8">
        <h1 className="text-3xl font-bold text-[#2F5D50]">Checkout</h1>
        <p className="text-gray-500 mt-1">
          {cartItems.length} {cartItems.length === 1 ? "item" : "items"} ready for delivery
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-6xl mx-auto items-start">

        <div className="order-1 lg:order-2 lg:col-span-2 lg:sticky lg:top-24">
          <div className="bg-white rounded-2xl shadow">
            <div className="p-6">
              <h2 className="text-lg font-bold text-[#2F5D50] mb-4">
                Order summary
              </h2>

              <div className="space-y-4 max-h-72 overflow-y-auto pr-1">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="relative shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-30 h-30 object-cover rounded-lg"
                      />
                      <span className="absolute -top-1 -right-2 bg-[#2F5D50] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-800 truncate">
                        {item.name}
                      </p>
                      <p className="text-sm text-gray-400">₹{item.price} each</p>
                    </div>

                    <p className="font-semibold text-gray-700">
                      ₹{item.price * item.quantity}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-dashed border-gray-300 mx-6" />

            <div className="p-6 space-y-2.5">
              <div className="flex justify-between text-gray-500 text-sm">
                <span>Subtotal</span>
                <span>₹{subTotal}</span>
              </div>

              <div className="flex justify-between text-gray-500 text-sm">
                <span>Delivery</span>
                <span>{deliveryFee === 0 ? "Free" : `₹${deliveryFee}`}</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-sm text-[#2F5D50]">
                  <span>Discount</span>
                  <span>-₹{discount}</span>
                </div>
              )}

              <div className="flex justify-between items-baseline pt-3 mt-1 border-t">
                <span className="font-semibold text-gray-800">Total</span>
                <span className="text-2xl font-bold text-[#2F5D50]">
                  ₹{grandTotal}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-2 mt-4 px-1 text-sm text-gray-500">
            <ShieldCheck size={16} className="mt-0.5 shrink-0" />
            <span>Your order is protected. Pay on delivery, no card details needed.</span>
          </div>
        </div>

        <div className="order-1 lg:order-1
         lg:col-span-3 bg-white rounded-2xl shadow p-6 sm:p-8">
          <h2 className="text-lg font-bold text-[#2F5D50] mb-6">
            Delivery details
          </h2>

          <form onSubmit={handlePlaceOrder} className="space-y-6 noValidate">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field
                icon={<User size={18} />}
                label="Full name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                error={errors.name}
              />
              <Field
                icon={<Phone size={18} />}
                label="Phone number"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="10-digit number"
                error={errors.phone}
              />
            </div>

            <Field
              icon={<Mail size={18} />}
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="email"
              error={errors.email}
            />

            <div className="pt-2 border-t">
              <p className="flex items-center gap-2 text-sm font-semibold text-gray-500 mt-6 mb-4">
                <MapPin size={16} />
                Shipping address
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1.5">
                    Address
                  </label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    rows="2"
                    placeholder="House no, street, landmark"
                       className={`w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 transition resize-y ${
                      errors.address
                        ? "border-red-400 focus:ring-red-400"
                        : "border-gray-200 focus:ring-[#2F5D50] focus:border-transparent"
                    }`}
                    required
                  />{errors.address && (
                    <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <Field label="City" name="city" value={formData.city} onChange={handleChange} placeholder="City" bare error={errors.city}/>
                  <Field label="State" name="state" value={formData.state} onChange={handleChange} placeholder="State" bare error={errors.state}/>
                  <Field label="Pincode" name="pincode" value={formData.pincode} onChange={handleChange} placeholder="Pincode" bare error={errors.pincode} />
                </div>
              </div>
            </div>
             <div className="pt-2 border-t">
  <p className="text-sm font-semibold text-gray-500 mb-4">
    Payment method
  </p>

  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
    {[
      { value: "cod", label: "Cash on Delivery", icon: <Banknote size={20} /> },
      { value: "upi", label: "UPI", icon: <Smartphone size={20} /> },
      { value: "card", label: "Card", icon: <CreditCard size={20} /> },
    ].map((method) => (
      <button
        key={method.value}
        type="button"
        onClick={() => setPaymentMethod(method.value)}
        className={`flex flex-col items-center gap-2 border rounded-xl py-4 transition ${
          paymentMethod === method.value
            ? "border-[#2F5D50] bg-[#2F5D50]/5 text-[#2F5D50]"
            : "border-gray-200 text-gray-500 hover:border-gray-300"
        }`}
      >
        {method.icon}
        <span className="text-sm font-medium">{method.label}</span>
      </button>
    ))}
  </div>

  {paymentMethod === "upi" && (
    <div className="mt-4">
      <label className="block text-sm font-medium text-gray-600 mb-1.5">
        UPI ID
      </label>
      <input
        type="text"
        value={upiId}
        onChange={(e) => setUpiId(e.target.value)}
        placeholder="yourname@upi"
        className={`w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 transition ${
          errors.upiId
            ? "border-red-400 focus:ring-red-400"
            : "border-gray-200 focus:ring-[#2F5D50] focus:border-transparent"
        }`}
      />
      {errors.upiId && (
        <p className="text-red-500 text-sm mt-1">{errors.upiId}</p>
      )}
    </div>
  )}

  {paymentMethod === "card" && (
    <p className="mt-4 text-sm text-gray-500 bg-[#F8F5EC] rounded-xl px-4 py-3">
      Card payment will be collected securely at the time of delivery.
    </p>
  )}
</div>

            <div className="flex items-center gap-2 text-sm text-gray-500 bg-[#F8F5EC] rounded-xl px-4 py-3">
              <Truck size={18} className="text-[#2F5D50] shrink-0" />
              <span>Usually delivered in 3-5 business days.</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={() => navigate("/cart")}
                className="sm:flex-1 border border-gray-300 text-gray-600 py-3 rounded-xl font-semibold hover:bg-gray-50 transition"
              >
                Back to cart
              </button>

              <button
                type="submit"
                disabled={isPlacing}
                className="sm:flex-[2] bg-[#2F5D50] text-white py-3 rounded-xl font-semibold hover:bg-[#244a40] transition disabled:bg-gray-400"
              >
                {isPlacing ? "Placing order..." : `Place order · ₹${grandTotal}`}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
function Field({ icon, label, bare, error, ...inputProps }) {
  const baseClasses =
    "w-full border rounded-xl py-3 outline-none focus:ring-2 transition";
  const stateClasses = error
    ? "border-red-400 focus:ring-red-400"
    : "border-gray-200 focus:ring-[#2F5D50] focus:border-transparent";

  return (
    <div>
      <label className="block text-sm font-medium text-gray-600 mb-1.5">{label}</label>

      {bare ? (
        <input {...inputProps} className={`${baseClasses} ${stateClasses} px-4`} />
      ) : (
        <div className="relative">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">{icon}</span>
          <input {...inputProps} className={`${baseClasses} ${stateClasses} pl-11 pr-4`} />
        </div>
      )}

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}


export default Checkout;