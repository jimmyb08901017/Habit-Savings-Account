import { StyleSheet } from "react-native";
import { Link } from "expo-router";
import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { Button, ButtonIcon, ButtonText, Divider } from "@gluestack-ui/themed";
import { AddIcon } from "@gluestack-ui/themed";
import { useState } from "react";
import { SwipeableContainer } from "@/components/SwipeableContainer";
import { defaultTodos } from "@/utils";
import { StyledGestureHandlerRootView } from "@/components/StyledGestureHandlerRootView";

export default function TabOneScreen() {

  const [todos, setTodos] = useState(defaultTodos);
  const [swipedItemId, setSwipedItemId] = useState(null);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Habits</Text>
        <View style={styles.title}>
          <Button 
            size="md" 
            borderColor="$backgroundLight300" 
            $dark-borderColor="$backgroundDark700" 
            variant="outline" 
            action="primary" 
            isDisabled={false} 
            isFocusVisible={false}
          >
            <ButtonText color="$textLight300"  $dark-color="$textDark300">Add</ButtonText>
            <ButtonIcon color="$textLight300"  $dark-color="$textDark300" as={AddIcon} />
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
      <StyledGestureHandlerRootView style={{ flex: 1}}>
      {todos.map((todo: any, index: number) => (
        <SwipeableContainer
          key={index}
          todo={todo}
          todos={todos}
          setTodos={setTodos}
          swipedItemId={swipedItemId}
          setSwipedItemId={setSwipedItemId}
          />
          ))}
      </StyledGestureHandlerRootView>
     
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
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
