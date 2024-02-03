import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { useState } from 'react';

type GoalType = {
  name: string,
  value: number,
}

type ActivityType = {
  name: string,
  value: number,
}

const Goals : GoalType[] = [
  {name: "Keyboard", value: 1000},
]

const Activities : ActivityType[] = [
  {name: "Reading", value: 10},
  {name: "Exercise", value: 10},
]

export default function RecordScreen() {
  const [currentMoney, setCurrentMoney] = useState(0);
  const [activeActivityType, setActiveActivitytype] = useState("Reading");

  return (
    <View style={styles.container}>
      <Text style={styles.goal}>Goal: {Goals[0].name} ({Goals[0].value}$)</Text>
      <Text style={styles.currentMoney}>Current Money: {currentMoney}</Text>
      <Text style={styles.progressBar}>Progress: {currentMoney/Goals[0].value * 100}% ({currentMoney} / {Goals[0].value})</Text> 
      <FlatList
      data={Activities}
      renderItem={({ item, index }) => (
        <TouchableOpacity
        // style={styles.items}
        key={index}
        onPress={()=>{
          setActiveActivitytype(item.name);
          setCurrentMoney(currentMoney + item.value);
        }}
        >
          <View>
          <Text>{item.name}: {item.value}$</Text>
          </View>
        </TouchableOpacity>
      )}
      contentContainerStyle={{ columnGap: 3 }}
      />

      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  goal: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  currentMoney: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  progressBar: {
    fontSize: 20,
    fontWeight: 'bold',
  },  
  items: {
    fontSize: 20,
    
  },  
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
