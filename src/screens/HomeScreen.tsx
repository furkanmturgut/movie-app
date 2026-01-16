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
import { useEffect, useState } from "react";
import { OmdbSearchItem, searchMovies } from "../api/omdb";
import MovieCard from "../components/MovieCard";

const HomeScreen = () => {
  const [query, setQuery] = useState("Batman");
  const [movies, setMovies] = useState<OmdbSearchItem[]>([]);

  const [loader, setLoader] = useState(false);
  const [error, setError] = useState("");

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchMovies = async (pageNumber: number, isNewSearch = false) => {
    if (!query) {
      setMovies([]);
      setHasMore(false);
      return;
    }

    if (isNewSearch) setLoader(true);

    setError("");

    try {
      const res = await searchMovies(query, pageNumber);
      if (res.Response === "True") {
        const incomingMovies = res.Search || [];

        setHasMore(incomingMovies.length === 10);

        setMovies((prev) => {
          if (pageNumber === 1) {
            return incomingMovies;
          }
          return [...prev, ...incomingMovies];
        });
      } else {
        if (pageNumber === 1) {
          setMovies([]);
          setError(res.Error || "Failed to fetch movies");
        }
        setHasMore(false);
      }
    } catch (error) {
      if (pageNumber === 1) {
        setError("An unexpected error occurred");
        setMovies([]);
      }
    } finally {
      if (isNewSearch) setLoader(false);
    }
  };

  const onSubmit = () => {
    setPage(1);
    setMovies([]);
    setHasMore(true);
    fetchMovies(1, true);
  };

  const loadMore = async () => {
    if (!hasMore || loader || loadingMore) return;

    setLoadingMore(true);
    const nextPage = page + 1;

    try {
      await fetchMovies(nextPage, false);
      setPage(nextPage);
    } finally {
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    onSubmit();
  }, []);

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
          onSubmitEditing={onSubmit}
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
      ) : error ? (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Text style={{ color: colors.textColor, fontSize: s(14) }}>
            {error}
          </Text>
        </View>
      ) : (
        <FlatList
          data={movies}
          renderItem={({ item }) => <MovieCard movie={item} />}
          keyExtractor={(item, index) => `${item.imdbID}-${index}`}
          numColumns={2}
          onEndReached={loadMore}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            loadingMore ? (
              <View>
                <ActivityIndicator size={"small"} />
                <Text style={{ color: colors.textColor }}>
                  Loading more movies...
                </Text>
              </View>
            ) : hasMore ? (
              <Text
                style={{
                  color: colors.textColor,
                  textAlign: "center",
                  marginVertical: vs(8),
                }}
              >
                Keep sctrolling to load more movies
              </Text>
            ) : movies.length > 0 ? (
              <Text
                style={{
                  color: colors.textColor,
                  textAlign: "center",
                  marginVertical: vs(8),
                }}
              >
                No more movies to load
              </Text>
            ) : null
          }
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
