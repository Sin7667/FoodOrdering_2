import { View, Text } from 'react-native';
import React from 'react';
import { useLocalSearchParams , Stack} from 'expo-router';
 

const ProductDetailsScreen = () => {
    const { id } = useLocalSearchParams();
    return (
        <View>
            <Stack.Screen options={{ title: 'Product Details' + id }}/>
            <Text>ProductListItem for id : {id} </Text>
        </View>
    )
};
export default ProductDetailsScreen;
