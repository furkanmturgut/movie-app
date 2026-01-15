import {
  Pressable,
  StyleSheet,
  TextInput,
  View,
  Text,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { s, vs } from "react-native-size-matters";
import colors from "../theme/colors";
import { useState } from "react";
import searchMovies, { OmdbSearchItem } from "../api/omdb";
import MovieCard from "../components/MovieCard";

const HomeScreen = () => {
  const [query, setQuery] = useState("Batman");
  const [movies, setMovies] = useState<OmdbSearchItem[]>([]);

  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async () => {
    setLoader(true);
    setError("");

    try {
      const res = await searchMovies(query);
      if (res.Response === "True") {
        const incomingMovies = res.Search || [];
        setMovies(incomingMovies);
      } else {
        setMovies([]);
        setError(res.Error || "Failed to fetch movies");
      }
    } catch (error) {
      setError("An unexpected error occurred");
      setMovies([]);
    }

    setLoader(false);
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
      {loader ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <ActivityIndicator size={"large"} />
          <Text style={{ color: colors.textColor, marginTop: vs(4) }}>
            Loading...
          </Text>
        </View>
      ) : (
        <FlatList
          data={movies}
          renderItem={({ item }) => <MovieCard movie={item} />}
          keyExtractor={(item, index) => `${item.imdbID}-${index}`}
          key={`movies-${movies.length}`}
          numColumns={2}
        />
      )}
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
