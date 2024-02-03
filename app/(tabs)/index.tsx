import { FlatList, StyleSheet, TouchableOpacity, Pressable } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import Colors from '@/constants/Colors';
import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import useAccount from '@/hook/useAccount';
import { useColorScheme } from '@/components/useColorScheme';

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
  // const [activeActivityType, setActiveActivitytype] = useState("Reading");
  const { savings, updateSaving } = useAccount();
  const colorScheme = useColorScheme();

  return (
    <View style={styles.container}>
      <Text style={styles.goal}>Goal: {Goals[0].name} ({Goals[0].value}$)</Text>
      <Text style={styles.progressBar}>Progress: {savings/Goals[0].value * 100}% ({savings} / {Goals[0].value})</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
        <View style={styles.savingBar}> 
        <Text style={styles.currentMoney}>Money in Account: {savings}$</Text>
        <Pressable onPress={()=>updateSaving(0)}>
          {({ pressed }) => (
            <FontAwesome
              name="minus-circle"
              size={25}
              color={Colors[colorScheme ?? 'light'].text}
              style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
            />
          )}
        </Pressable>
        </View> 
      <FlatList
      data={Activities}
      renderItem={({ item, index }) => (
        <TouchableOpacity
        // style={styles.items}
        key={index}
        onPress={()=>{
          // setActiveActivitytype(item.name);
          updateSaving(savings + item.value);
        }}
        >
          <View style={styles.itemBox}>
          <Text style={styles.items}
          >{item.name}: +{item.value}$</Text>
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
  savingBar: {
    flex: 1,
    flexDirection: 'row',
    gap: 8,
    // alignItems: 'center',
    justifyContent: 'center',
  },
  items: {
    fontSize: 20,
    fontWeight: 'bold', 
  },  
  itemBox: {
    borderColor: 'black',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
