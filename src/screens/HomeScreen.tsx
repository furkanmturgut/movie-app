import { Pressable, StyleSheet, TextInput, View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { s } from "react-native-size-matters";
import colors from "../theme/colors";
import { useState } from "react";
import searchMovies from "../api/omdb";

const HomeScreen = () => {
  const [query, setQuery] = useState("Batman");

  const onSubmit = () => {
    searchMovies(query);
  };

  return (
    <SafeAreaView style={styles.container} edges={[]}>
      <View style={styles.searchContainer}>
        <TextInput
          value={query}
          style={styles.searchInput}
          placeholder="Search (e.g., Batman)"
          placeholderTextColor={colors.inactiveColor}
          returnKeyType="search"
          onChangeText={setQuery}
        />
        <Pressable onPress={onSubmit} style={styles.searchButton}>
          <Text style={styles.searchButtonText}>Search</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgorundColor,
  },
  searchContainer: {
    padding: s(12),
    flexDirection: "row",
    gap: s(8),
  },
  searchInput: {
    flex: 1,
    borderWidth: s(1),
    borderColor: colors.borderColor,
    color: colors.textColor,
    backgroundColor: colors.backgorundColor,
    borderRadius: s(8),
    paddingHorizontal: s(10),
    fontWeight: "700",
  },
  searchButton: {
    backgroundColor: colors.buttonColor,
    paddingHorizontal: s(16),
    borderRadius: s(8),
    justifyContent: "center",
  },
  searchButtonText: {
    color: colors.textColor,
    fontWeight: "700",
  },
});
