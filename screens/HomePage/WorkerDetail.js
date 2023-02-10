import React from "react";
import { View } from "react-native";
import ViewWorker from "../../components/workers/ViewWorker";

export default function WorkerDetail({ route, navigation }) {
  return (
    <View>
      <ViewWorker route={route} navigation={navigation} />
    </View>
  );
}
