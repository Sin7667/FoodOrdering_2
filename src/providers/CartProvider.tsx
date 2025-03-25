import { CartItem, Product } from "@/types";
import { createContext, PropsWithChildren, useContext, useState } from "react";
import { randomUUID } from 'expo-crypto';

type CartType = {
    items: CartItem[],
    addItem: (product: Product, size: CartItem['size']) => void;
    updateQuantity: (itemId: string, amount: 1 | -1 ) => void;
};

const CartContext = createContext<CartType>({
    items: [], // default value
    addItem: () => {},
    updateQuantity: () => {}
});

// Render Provider = Value
const CartProvider = ({ children }: PropsWithChildren) => {
    const [items, setItems] = useState<CartItem[]>([]);

    const addItem = (product: Product, size: CartItem['size']) => {


        const existingItem = items.find(item => item.product == product && item.size == size);
            if (existingItem){
            updateQuantity(existingItem.id, 1);
            return;
            }

        const newCartItem: CartItem = {
            id: randomUUID(),
            product,
            product_id: product.id,
            size,
            quantity: 1,
        };

        setItems([newCartItem, ...items]);
    
    };
    const updateQuantity= (itemId: string, amount: 1 | -1 ) => {
    
        setItems(items.map(
            item => item.id !== itemId
             ? item 
             : {...item, quantity: item.quantity + amount} ).filter((item)=> item.quantity >0) );};


    return (
        <CartContext.Provider value={{ items, addItem, updateQuantity }}>
            {children}
        </CartContext.Provider> // all the children of CartProvider will have access to the value/CartContext
    );
};

export default CartProvider;
export const useCart = () => useContext(CartContext); // useCart is a custom hook that will return the value of the CartContext