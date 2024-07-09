import { addChat, removeChat } from "../core/chatSlice";
import { RootState } from "../core/store";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { View, Text, FlatList, TextInput } from "react-native";
import { HomeScreenNavigationProp } from "../types/navigation";
import { Input, Button } from "react-native-elements";

interface Props {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
  const [newChat, setNewChat] = useState("");
  const chats = useSelector((state: RootState) => state.chat.chats);
  const dispatch = useDispatch();

  const handleAddChat = () => {
    if (newChat) {
      dispatch(addChat(newChat));
      setNewChat("");
    }
  };

  return (
    <View>
      <Input
        placeholder="Enter chat name"
        value={newChat}
        onChangeText={setNewChat}
      />
      <Button title="Add Chat" onPress={handleAddChat} />
      <FlatList
        data={chats}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View>
            <Text>{item}</Text>
            <Button
              title="Go to Chat"
              onPress={() => navigation.navigate("Chat", { chatName: item })}
            />
            <Button
              title="Delete Chat"
              onPress={() => dispatch(removeChat(item))}
            />
          </View>
        )}
      />
    </View>
  );
};

export default HomeScreen;
