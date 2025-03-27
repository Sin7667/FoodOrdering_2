import { View, Text, StyleSheet, TextInput, Image , Alert} from "react-native";
import React from "react";
import Button from "@/components/Button";
import { useState } from "react";
import { defualtPizzaImage } from "@/components/ProductListItem";
import Colors from "@/constants/Colors";
import * as ImagePicker from 'expo-image-picker';
import { Stack, useLocalSearchParams } from "expo-router";

const CreateProductScreen = () => {
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [error, setErrors] = useState('');
    const [image, setImage] = useState<string | null> (null);
    const {id} = useLocalSearchParams(); // get id from URL
    const isUpdating= !!id; // check if we are updating a product

    const resetFields = () => {
        setName('');
        setPrice('');
    }

    

    const validateInputs = () => {
        setErrors(''); //reset errors
        if (!name) {
            setErrors('Name is required');
            return false;
        }
        if (!price) {
            setErrors('Price is required');
            return false;
        }
        if (isNaN(parseFloat(price))) {
            setErrors('Price must be a number');
            return false;
        }
        return true;
    }
    const onSubmit = () => {

        if(isUpdating){
            onUpdateCreate();
    
        }
        else{
            onCreate();
        }

    }

    const onUpdateCreate = () => {
        if (!validateInputs()) {
            return;
        }
         console.warn('Updating Product');
        
        resetFields(); // save in Database
    }



    const onCreate = () => {
        if (!validateInputs()) {
            return;
        }

        console.warn('Create Product', name, price);
        resetFields(); // save in Database
    }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ['images'],
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        if (!result.canceled) {
            setImage(result.assets[0].uri);
          }
        };

        const onDelete = () => {
            console.warn('DELETE');
        }
        const confirmDelete = () => {
            Alert.alert("Confirlm Delete", "Are you sure you want to delete this product?", [
                {
                    text: 'Cancel',
                },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: onDelete,
                },
            ]);
        }


    return (
        <View style={styles.container}>
            <Stack.Screen options={{ title: isUpdating? 'Update Product' : 'Create Product' }}/>
            <Image source={{ uri: image || defualtPizzaImage }} style={styles.image} />
            <Text onPress={pickImage} style={styles.textButton}>Select Image</Text>
            <Text style={styles.label}>Name</Text>
            <TextInput value={name} onChangeText={setName} placeholder="Name" style={styles.input} />
            <Text style={styles.label}>Price ($)</Text>
            <TextInput value={price} onChangeText={setPrice} placeholder="9.99" style={styles.input} keyboardType="numeric" />
            
            <Text style={styles.error}>{error}</Text>

            <Button text={isUpdating ?'Update' : 'Create Product'} onPress={onSubmit} />
            {isUpdating && <Text onPress={confirmDelete} style={styles.textButton}>Delete</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
    },
    input: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        marginTop: 5,
        marginBottom: 20,
    },
    label: {
        color: 'gray',
        fontSize: 16,
    },
    error: {
        color: 'red',
        marginBottom: 20,
    },
    image:
    {
    width: '20%',
    aspectRatio: 1,
    alignSelf: 'center',
},
textButton: {
    alignSelf: 'center',
    fontWeight : 'bold',
    color: Colors.light.tint,
    marginTop: 10,
},
});

export default CreateProductScreen;
