import React, { useState, useRef, useEffect } from "react";

import { AntDesign } from "@expo/vector-icons";
import {
  Button,
  Box,
  Text,
  Badge,
  BadgeIcon,
  BadgeText,
} from "@gluestack-ui/themed";

import { useAccount } from "@/context/AccountProvider";

import DifficuityBadge from "./DifficultyBadge";
import { Hoverable } from "./Hoverable";
import { useThemeColor } from "./Themed";
import type { Product } from "@/utils/types";

type ProductType = {
  product: Product;
  // todos: any,
  // setTodos: any
};

const ProductComponent = ({
  product,
  // todos,
  // setTodos,
}: ProductType) => {
  const { savings, updateSavings } = useAccount();
  // const { purchaseItem } = useStore();

  // const handleDelete = (id: any) => {
  //   const updatedTodos = todos.filter((todo) => todo.id !== id);
  //   setTodos(updatedTodos);
  // };
  // const handleEdit = (id: any) => {
  //   setEditItemId(null);
  //   if (editItem !== "") {
  //     const updatedTodos = todos.map((todo) =>
  //       todo.id === id ? { ...todo, task: editItem } : todo
  //     );
  //     setTodos(updatedTodos);
  //   } else {
  //     setEditItem(todo.task);
  //   }
  // };
  const handlePurchase = () => {
    updateSavings(savings - product.money);
  };

  return (
      <Hoverable
        px="$6"
        py="$2"
        minWidth={400}
        minHeight={48}
        flexDirection="row"
        // bg={isOpen ? "$backgroundDark700" : "$backgroundDark900"}
        bg="$backgroundWhite900"
        key={product.id}
        alignItems="center"
        focusable={false}
        onPress={() => handlePurchase()}
      >
        <Text
          pl="$2"
          pt="$1"
          sx={{
            ":focus": {
              _web: {
                boxShadow: "none",
              },
            },
          }}
          w="$full"
          h="$full"
          // color="$textDark50"
          // textDecorationLine={todo.completed ? "line-through" : "none"}
        >
          {product.description}
        </Text>
        <Text>
          {product.money}$
        </Text>
        {/* <DifficuityBadge level={product.difficulty} /> */}
      </Hoverable>
  );
};
export { ProductComponent };
