import { useState } from "react";
import { StyleSheet } from "react-native";

// import { Text, View } from "@/components/Themed";
import { Text, View, Icon } from "@gluestack-ui/themed";
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
import { AddIcon, ChevronDownIcon } from "@gluestack-ui/themed";
import {
  Select,
  SelectTrigger,
  SelectInput,
  SelectIcon,
  SelectPortal,
  SelectDragIndicator,
  SelectItem,
  SelectContent,
  SelectDragIndicatorWrapper,
  SelectBackdrop,
} from "@gluestack-ui/themed";
import { Link } from "expo-router";

import { StyledGestureHandlerRootView } from "@/components/StyledGestureHandlerRootView";
import { SwipeableContainer } from "@/components/SwipeableContainer";
import useHabits from "@/hooks/useHabits";
import { defaultTodos } from "@/utils";
import type { nativeHabit, Habit } from "@/utils/types";

export default function TabOneScreen() {
  const { habits, addHabit } = useHabits();
  const [swipedItemId, setSwipedItemId] = useState(null);

  // For Add habits
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState("Reading");
  const [description, setDescription] = useState("Read a page");
  const [difficulty, setDifficulty] = useState("0");
  const addHabitButtonAction = async () => {
    const newHabit: nativeHabit = {
      name: name,
      description: description,
      difficulty: difficulty,
      money: 5,
    };
    await addHabit(newHabit);
    console.log(habits);
    setShowModal(false);
  };

  // For Daily Check
  const today = new Date();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          Habits for {today.toLocaleDateString()}
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
        <Text>Habits: {habits.length}</Text>
      </View>
      <View>
        {/* {habits.map((habit, index)=>{
          <Text>habit:</Text>
        })} */}
      </View>
      <StyledGestureHandlerRootView style={{ flex: 1 }}>
        {habits.map((habit: Habit, index: number) => (
          <SwipeableContainer
            key={index}
            todo={habit}
            // todos={habits}
            // setTodos={setHabits}
            swipedItemId={swipedItemId}
            setSwipedItemId={setSwipedItemId}
          />
        ))}
      </StyledGestureHandlerRootView>
      {/** Modal for adding habit */}
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
              <Heading>Add Your Habit</Heading>
              <Text size="sm">Habits can fulfill your potentials.</Text>
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
              <FormControl>
                <FormControlLabel>
                  <FormControlLabelText>Difficulty</FormControlLabelText>
                </FormControlLabel>
                <Select
                  onValueChange={(v) => {
                    setDifficulty(v);
                  }}
                >
                  <SelectTrigger variant="underlined" size="md">
                    <SelectInput placeholder="Select option" />
                    <SelectIcon>
                      <Icon as={ChevronDownIcon} />
                    </SelectIcon>
                  </SelectTrigger>
                  <SelectPortal>
                    <SelectBackdrop />
                    <SelectContent>
                      <SelectDragIndicatorWrapper>
                        <SelectDragIndicator />
                      </SelectDragIndicatorWrapper>
                      <SelectItem label="Easy" value="0" />
                      <SelectItem label="Medium" value="1" />
                      <SelectItem label="Hard" value="2" />
                    </SelectContent>
                  </SelectPortal>
                </Select>
              </FormControl>
            </VStack>
            <Button
              mt="$4"
              onPress={() => {
                addHabitButtonAction();
              }}
            >
              <ButtonText>Add Habit</ButtonText>
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
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
