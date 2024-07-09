import MessageItem from "../shared/MessageItem";
import {
  ChatScreenNavigationProp,
  ChatScreenRouteProp,
} from "../types/navigation";
import React, { useState } from "react";
import { View, Text, TextInput, FlatList } from "react-native";
import { Input, Button } from "react-native-elements";

interface Props {
  route: ChatScreenRouteProp;
  // navigation: ChatScreenNavigationProp;
}

const ChatScreen: React.FC<Props> = ({ route }) => {
  const { chatName } = route.params;
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    "Hello! This is a hardcoded message.",
  ]);

  const handleSendMessage = () => {
    if (message) {
      setMessages([...messages, message]);
      setMessage("");
    }
  };

  return (
    <View>
      <Text>Chat - {chatName}</Text>
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <MessageItem message={item} />}
      />
      <Input
        placeholder="Type a message"
        value={message}
        onChangeText={setMessage}
      />
      <Button title="Send" onPress={handleSendMessage} />
    </View>
  );
};

export default ChatScreen;
