import React, { useState, useRef, useEffect } from "react";
import { Swipeable } from "react-native-gesture-handler";

import { AntDesign } from "@expo/vector-icons";
import {
  Button,
  Checkbox,
  CheckIcon,
  Box,
  Text,
  Badge,
  BadgeIcon,
  BadgeText,
} from "@gluestack-ui/themed";
import { GlobeIcon } from "@gluestack-ui/themed";

import { useAccount } from "@/context/AccountProvider";
import useHabits from "@/hooks/useHabits";

import DifficuityBadge from "./DifficultyBadge";
import { Hoverable } from "./Hoverable";
import { MyCheckbox } from "./MyCheckbox";
import { useThemeColor } from "./Themed";

type SwipeableContainerType = {
  todo: any;
  // todos: any,
  // setTodos: any,
  swipedItemId: any;
  setSwipedItemId: any;
};

const SwipeableContainer = ({
  todo,
  // todos,
  // setTodos,
  swipedItemId,
  setSwipedItemId,
}: SwipeableContainerType) => {
  // const [isOpen, setIsOpen] = useState(false);
  const { savings, updateSavings } = useAccount();
  const [lastTap, setLastTap] = useState(null);
  const swipeableRef = useRef(null);
  const inputRef = useRef(null);
  const { removeHabit } = useHabits();

  useEffect(() => {
    if (swipedItemId !== null && swipedItemId !== todo.id) {
      swipeableRef?.current?.close();
    }
  });

  // const handleDelete = (id: any) => {
  //   const updatedTodos = todos.filter((todo) => todo.id !== id);
  //   setTodos(updatedTodos);
  // };
  // const toggleCheckbox = (id: any) => {
  //   const updatedTodos = todos.map((todo) =>
  //     todo.id === id ? { ...todo, completed: !todo.completed } : todo
  //   );
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
  const handleComplete = (habitId: string) => {
    updateSavings(savings + 5);
  };

  const handleSwipeStart = () => {
    if (todo.id !== swipedItemId) setSwipedItemId(todo.id);
    // setIsOpen(true);
  };

  const handleSwipeClose = () => {
    setSwipedItemId(null);
    // setIsOpen(false);
  };

  const renderRightActions = () => {
    if (swipedItemId !== null && swipedItemId !== todo.id) {
      return null;
    }
    return (
      <Box flexDirection="row" minWidth={44}>
        <Button
          zIndex={9999}
          h="$full"
          p="$3"
          bg="$error600"
          borderRadius="$none"
          onPress={() => removeHabit(todo.id)}
          // focusable={false}
        >
          <AntDesign name="delete" size={21} color="white" />
        </Button>
      </Box>
    );
  };

  return (
    <Swipeable
      key={todo.id}
      onSwipeableWillOpen={handleSwipeStart}
      onSwipeableWillClose={handleSwipeClose}
      renderRightActions={renderRightActions}
      // rightThreshold={30}
      overshootRight={false}
      ref={swipeableRef}
      friction={1}
    >
      <Hoverable
        px="$6"
        py="$2"
        minWidth={400}
        minHeight={48}
        flexDirection="row"
        // bg={isOpen ? "$backgroundDark700" : "$backgroundDark900"}
        bg="$backgroundWhite900"
        key={todo.id}
        alignItems="center"
        focusable={false}
        onPress={() => handleComplete(todo.id)}
      >
        {/* <Checkbox
          // aria-label={todo.id} // DO NOT USE THIS!!!!!!
          // isChecked={todo.completed}
          value={todo.description}
          // onChange={() => toggleCheckbox(todo.id)}
          size="sm"
          w="$full"
          borderColor="transparent"
        >
          <Checkbox.Indicator>
            <Checkbox.Icon color="$backgroundDark900" as={CheckIcon} />
          </Checkbox.Indicator> */}
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
          {todo.description}
        </Text>
        <DifficuityBadge level={todo.difficulty} />
        {/* </Checkbox> */}
        {/* <Input
          //   sx={{
          //     ":focus": {
          //       _web: {
          //         boxShadow: "none",
          //       },
          //     },
          //   }}
          //   borderWidth="$0"
          //   w="$full"
          //   h={22}
          // >
          //   <InputField
          //     pl="$2"
          //   //   editable={!isOpen && editItemId === todo.id}
          //     editable={false}
          //     value={editItem}
          //     color="$textDark50"
          //     fontSize="$sm"
          //     fontWeight="$normal"
          //     textDecorationLine={todo.completed ? "line-through" : "none"}
          //     onChangeText={(val) => setEditItem(val)}
          //     onSubmitEditing={() => handleEdit(todo.id)}
          //     onBlur={() => handleEdit(todo.id)}
          //     autoComplete="off"
          //   //   ref={inputRef}
          //   />
          // </Input> */}
      </Hoverable>
    </Swipeable>
  );
};
export { SwipeableContainer };
