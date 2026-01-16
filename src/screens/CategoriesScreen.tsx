import {
  ActivityIndicator,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import colors from "../theme/colors";
import CATEGORIES from "../constant/categories";
import { s, vs } from "react-native-size-matters";
import { useState } from "react";
import searchMovies, { OmdbSearchItem } from "../api/omdb";
import MovieCard from "../components/MovieCard";

const CategoriesScreen = () => {
  const [active, setActive] = useState(CATEGORIES[0]);
  const [movies, setMovies] = useState<OmdbSearchItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchMovies = async () => {
    setLoading(true);

    try {
      const res = await searchMovies(active.query, 1);
      setMovies(res.Search || []);
    } catch (error) {
      setError("Failed to fetch movies");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [active]);

  return (
    <SafeAreaView style={styles.container} edges={[]}>
      <ScrollView
        horizontal
        contentContainerStyle={{ padding: s(12), gap: s(8) }}
      >
        {CATEGORIES.map((c) => (
          <Pressable
            onPress={() => setActive(c)}
            key={c.key}
            style={[
              styles.categoryItem,
              {
                backgroundColor:
                  active.key == c.key
                    ? colors.buttonColor
                    : colors.inactiveColor,
              },
            ]}
          >
            <Text style={styles.categoryText}>{c.label}</Text>
          </Pressable>
        ))}
      </ScrollView>
      {loading ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size={"large"} />
        </View>
      ) : error ? (
        <Text style={{ color: "red", textAlign: "center" }}>{error}</Text>
      ) : (
        <FlatList
          data={movies}
          renderItem={({ item }) => <MovieCard movie={item} />}
          keyExtractor={(item, index) => `${item.imdbID}-${index}`}
          numColumns={2}
        />
      )}
    </SafeAreaView>
  );
};

export default CategoriesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgorundColor,
  },
  categoryItem: {
    height: vs(30),
    justifyContent: "center",
    alignItems: "center",
    borderWidth: s(1),
    borderColor: colors.borderColor,
    borderRadius: 999,
    paddingHorizontal: s(16),
  },
  categoryText: {
    color: colors.textColor,
    lineHeight: vs(15),
    fontWeight: "700",
  },
});
