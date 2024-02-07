import { StyleSheet } from "react-native";
import { useState } from "react";

import { Text, View } from "@gluestack-ui/themed";
import { Button, ButtonIcon, ButtonText, Divider } from "@gluestack-ui/themed";
import {
  Modal,
  ModalBody,
  ModalBackdrop,
  ModalContent,
} from "@gluestack-ui/themed";
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
} from "@gluestack-ui/themed";
import { Input, InputField } from "@gluestack-ui/themed";
import { VStack, Heading } from "@gluestack-ui/themed";
import { AddIcon } from "@gluestack-ui/themed";

import useProducts from "@/hooks/useProducts";
import type { nativeProduct, Product } from "@/utils/types";
import { ProductComponent } from "@/components/Product";
export default function TabTwoScreen() {
  const { products, addProduct } = useProducts();

  // For Add habits
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("Reading");
  const [description, setDescription] = useState("Read a page");
  const addProductButtonAction = async () => {
    const newProduct: nativeProduct = {
      name: name,
      description: description,
      money: 5,
    };
    await addProduct(newProduct);
    setShowModal(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          Purchase
        </Text>
        <View style={styles.title}>
          <Button
            size="md"
            borderColor="$backgroundLight300"
            $dark-borderColor="$backgroundDark700"
            variant="outline"
            action="primary"
            isDisabled={false}
            isFocusVisible={false}
            onPress={() => setShowModal(true)}
          >
            <ButtonText color="$textLight300" $dark-color="$textDark300">
              Add
            </ButtonText>
            <ButtonIcon
              color="$textLight300"
              $dark-color="$textDark300"
              as={AddIcon}
            />
          </Button>
        </View>
      </View>
      {/* <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      /> */}
      <Divider my="$0.5" />
      {/* <EditScreenInfo path="app/(tabs)/index.tsx" /> */}
      {/* <Hoverable 
        px="$6"
        py="$2"
        minHeight={70}
        flexDirection="row"
      /> */}
      {/** Habit Region */}
      <View>
        <Text>Products: {products.length}</Text>
      </View>
      <View>
        {/* {habits.map((habit, index)=>{
          <Text>habit:</Text>
        })} */}
      </View>
      {products.map((product: Product, index: number) => (
        <ProductComponent
          key={index}
          product={product}
        />
      ))}
      {/** Modal for adding product */}
      <Modal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          // addHabit();
        }}
      >
        <ModalBackdrop />
        <ModalContent maxWidth="$96">
          <ModalBody p="$5">
            <VStack space="xs" mb="$4">
              <Heading>Add Product</Heading>
              <Text size="sm">Buy the product using your money!</Text>
            </VStack>
            <VStack py="$2" space="xl">
              <FormControl>
                <FormControlLabel>
                  <FormControlLabelText>Name</FormControlLabelText>
                </FormControlLabel>
                <Input>
                  <InputField value={name} onChangeText={(t) => setName(t)} />
                </Input>
              </FormControl>
              <FormControl>
                <FormControlLabel>
                  <FormControlLabelText>description</FormControlLabelText>
                </FormControlLabel>
                <Input>
                  <InputField
                    value={description}
                    onChangeText={(t) => setDescription(t)}
                  />
                </Input>
              </FormControl>
            </VStack>
            <Button
              mt="$4"
              onPress={() => {
                addProductButtonAction();
              }}
            >
              <ButtonText>Add Product</ButtonText>
            </Button>
          </ModalBody>
        </ModalContent>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    width: "95%",
    flex: 0,
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
    padding: 8,
  },
});
