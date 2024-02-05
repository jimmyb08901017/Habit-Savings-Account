import { useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function MyCheckbox() {
  const [checked, setChecked] = useState(false);
  return (
    <Pressable
    style={[styles.checkboxBase, checked && styles.checkboxChecked]}
    onPress={() => setChecked(!checked)}>
    {checked && <Ionicons name="checkmark" size={24} color="white" />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  checkboxBase: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 2,
    borderColor: 'coral',
    backgroundColor: 'transparent',
  },
  checkboxChecked: {
    backgroundColor: 'coral',
  },
  // checkboxContainer: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  // },
  // checkboxLabel: {
  //   marginLeft: 8,
  //   fontWeight: 500,
  //   fontSize: 18,
  // },
});

export { MyCheckbox };

