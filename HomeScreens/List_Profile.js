import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image } from "react-native";
import { List } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import firebase from "../config";

const database = firebase.database();
const auth = firebase.auth();

export default function List_Profil() {
  const [data, setData] = useState([]);
  const ref_profils = database.ref("contacts");

  useEffect(() => {
    const getCurrentUserEmail = async () => {
      const user = auth.currentUser;
      if (user) {
        const loggedInEmail = user.email;

        const onDataChange = (snapshot) => {
          let d = [];
          snapshot.forEach((un_profil) => {
            const key = un_profil.key;
            const val = un_profil.val();
            // Check if the email matches the logged-in user's email
            if (val.Email === loggedInEmail) {
              d.push({ key, ...val });
            }
          });
          setData(d);
        };

        // Attach the onDataChange callback to the event
        ref_profils.on("value", onDataChange);

        // Detach the onDataChange callback when the component unmounts
        return () => {
          ref_profils.off("value", onDataChange);
        };
      }
    };

    getCurrentUserEmail();
  }, []);

  const renderItem = ({ item, index }) => (
    <List.Item
      title={`${item.Name} ${item.Surname}`}
      description={`Email: ${item.Email}`}
      left={() => (
        <View style={{ marginRight: 10 }}>
          {item["ProfileImage"] ? (
            <Image
              source={{ uri: item["ProfileImage"] }}
              style={{ width: 50, height: 50, borderRadius: 25 }}
            />
          ) : (
            <Icon
              name="account-circle"
              size={50}
              color={index % 2 === 0 ? "#64B5F6" : "#81C784"}
            />
          )}
        </View>
      )}
      right={() => (
        <Icon
          name="chevron-right"
          size={25}
          color="#555"
          style={{ alignSelf: "center" }}
        />
      )}
      onPress={() => {
        // Handle item press if needed
      }}
      style={{
        backgroundColor: index % 2 === 0 ? "#64B5F6" : "#81C784",
        margin: 5,
        borderRadius: 10,
      }}
    />
  );

  return (
    <View style={{ flex: 1, backgroundColor: "#f0f0f0" }}>
      <Text style={{ fontSize: 30, textAlign: "center", padding: 20 }}>
        List Profils
      </Text>
      <FlatList
        style={{ flex: 1 }}
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.key}
      />
    </View>
  );
}
