import { View, Text , Image, StyleSheet, Pressable} from 'react-native';
import React from 'react';
import { useLocalSearchParams , Stack, useRouter} from 'expo-router';
import products from '@assets/data/products';
import { defualtPizzaImage } from '@/components/ProductListItem';
import { useState } from 'react';
import Button from '@/components/Button';
import { useCart } from '@/providers/CartProvider';
import { PizzaSize } from '@/types';



const sizes: PizzaSize[] = ['S', 'M', 'L', 'XL']; 


const ProductDetailsScreen = () => {
    const { id } = useLocalSearchParams();

    const[selectedSize,setSelectedSize] = useState<PizzaSize>('M');

    const {addItem} = useCart();

    const router = useRouter();

    const product = products.find((p) => p.id.toString() === id);

    const addToCart = () => {
        if(!product) {
            return;}
        addItem(product, selectedSize);
        router.push('/cart');}

    if (!product) {
        return <Text>Product not found</Text>};

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: product?.name }}/>

            <Image
             source={{ uri: product.image || defualtPizzaImage }} 
             style={styles.image}
             />

            
             
            <Text style={styles.price}>${product.price} </Text>
            <Text style={styles.title}>{product.name} </Text>


        </View>
    )
};
const styles = StyleSheet.create({
    container: {

        backgroundColor: 'white',
        alignItems: 'center',
        flex: 1, //all page white
        padding: 15,
    },
    image: {

        width:'50%',
        aspectRatio:  1,
    },
    price: {

        fontSize: 24,
        fontWeight: 'bold',
        
    },
    title:
    {
        fontSize: 20,
        fontWeight: 'bold',
    }
});
export default ProductDetailsScreen;
