/**
 * [file] useProducts.ts
 * [description] This file serve as database for managing products.
 * [author] Jimmy Yang
 */

import { useState, useEffect } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import type { Product, nativeProduct } from "@/utils/types";

export default function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    // Retrieve original value
    const RetrieveVal = async () => {
      const updateVal = await getProduct();
      if (!updateVal) return;
      setProducts(updateVal);
      if (updateVal !== products) setProducts(updateVal);
    };
    RetrieveVal();
  }, []);

  const addProduct = async (newProduct: nativeProduct) => {
    const newId = Math.floor(Math.random() * Date.now()).toString(32); // should be random
    const newH = { id: newId, ...newProduct };
    setProducts([...products, newH]); // frontend
    await storeProduct([...products, newH]); // backend
  };

  // This function is a little ugly. Can be changed if I
  // use realm.js instead.
  const updateProduct = async (updateH: Product) => {
    // const oldProduct = products.filter((h)=>{h.id === updateH.id})[0];
    // if(!oldProduct) return;
    const newProducts = products.map((product) =>
      product.id === updateH.id ? updateH : product,
    );
    setProducts(newProducts); // frontend
    await storeProduct(newProducts); // backend
  };

  const removeProduct = async (removeId: string) => {
    const newProducts = products.filter((product) => product.id !== removeId);
    setProducts(newProducts); // frontend
    await storeProduct(newProducts); // backend
  };

  const getProduct = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("products");
      if (jsonValue !== null) {
        const json = JSON.parse(jsonValue);
        // value previously stored
        return json;
      }
      return null;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  const storeProduct = async (products: Product[]) => {
    try {
      const jsonValue = JSON.stringify(products);
      await AsyncStorage.setItem("products", jsonValue);
      return true;
    } catch (error) {
      // saving error
      console.log(error);
      return false;
    }
  };

  return {
    products,
    addProduct,
    removeProduct,
  };
}
