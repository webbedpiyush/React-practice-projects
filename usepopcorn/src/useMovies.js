import { useState, useEffect } from "react";

const KEY = "9cc0e563";
//  the key for omdb api

export function useMovies(query) {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [er, setEr] = useState("");

  useEffect(
    function () {
      const controller = new AbortController();

      async function fetchMovies() {
        try {
          setIsLoading(true);
          setEr("");
          const res = await fetch(
            `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
            { signal: controller.signal }
          );
          if (!res.ok) {
            throw new Error("Something is wrong ");
          }
          const data = await res.json();
          if (data.Response === "false") {
            throw new Error("Movie not Found");
          }
          setMovies(data.Search);
          setEr("");
        } catch (error) {
          if (error.name !== "AbortError") {
            setEr(error.message);
          }
        } finally {
          // this code will always execute
          setIsLoading(false);
        }
      }
      if (query.length < 3) {
        setMovies([]);
        setEr("");
        return;
      }
      // handleCloseMovie();
      // callback?.(); can't add callback to the dependency array because that will cause infinite re render
      fetchMovies();

      // cleanup function to cancel the prev http request
      return function () {
        controller.abort();
      };
    },
    [query]
  );

  return {movies,isLoading,er};
}