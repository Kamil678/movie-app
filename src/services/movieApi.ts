import axios, { AxiosError } from "axios";
import type { Movie, MovieDetails } from "../types/Movie";
import type {
  ApiResponse,
  ApiGenresResponse,
  ApiMovieResponse,
} from "../types/ApiResponses";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL =
  import.meta.env.VITE_TMDB_BASE_URL || "https://api.themoviedb.org/3";
const DEFAULT_LANGUAGE = import.meta.env.VITE_TMDB_LANGUAGE || "pl-PL";
const IMAGE_BASE_URL =
  import.meta.env.VITE_TMDB_IMAGE_BASE_URL || "https://image.tmdb.org/t/p";

if (!API_KEY) {
  throw new Error(
    "TMDB API key is missing. Please add VITE_TMDB_API_KEY to your .env file"
  );
}

const IMAGE_SIZES = {
  poster: {
    small: "w185",
    medium: "w342",
    large: "w500",
  },
  backdrop: {
    small: "w780",
    medium: "w640",
    large: "original",
  },
  profile: {
    small: "w45",
    medium: "w185",
    large: "h632",
  },
} as const;

const api = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
    language: DEFAULT_LANGUAGE,
  },
});

class MovieApiError extends Error {
  constructor(message: string, public readonly originalError?: unknown) {
    super(message);
    this.name = "MovieApiError";
  }
}

function getImageUrl(
  path: string | null,
  type: keyof typeof IMAGE_SIZES = "poster",
  size: keyof (typeof IMAGE_SIZES)[typeof type] = "medium"
): string | null {
  if (!path) return null;
  return `${IMAGE_BASE_URL}/${
    IMAGE_SIZES[type][size as keyof (typeof IMAGE_SIZES)[typeof type]]
  }${path}`;
}

function formatMovie(movie: ApiMovieResponse): Movie {
  return {
    id: movie.id,
    title: movie.title,
    posterPath: getImageUrl(movie.poster_path, "poster", "medium"),
    releaseDate: movie.release_date,
    voteAverage: movie.vote_average,
  };
}

function formatMovieDetails(movie: ApiMovieResponse): MovieDetails {
  return {
    id: movie.id,
    title: movie.title,
    overview: movie.overview,
    posterPath: getImageUrl(movie.poster_path, "poster", "large"),
    backdropPath: getImageUrl(movie.backdrop_path, "backdrop", "large"),
    releaseDate: movie.release_date,
    runtime: movie.runtime,
    voteAverage: movie.vote_average,
    genres: movie.genres.map((genre) => genre.name),
    cast:
      movie.credits?.cast.slice(0, 10).map((actor) => ({
        id: actor.id,
        name: actor.name,
        character: actor.character,
        profilePath: getImageUrl(actor.profile_path, "profile", "medium"),
      })) || [],
  };
}

function handleApiError(error: unknown): never {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;

    if (axiosError.response) {
      switch (axiosError.response.status) {
        case 401:
          throw new MovieApiError("Nieprawidłowy klucz API.");
        case 404:
          throw new MovieApiError("Nie znaleziono zasobu.");
        case 429:
          throw new MovieApiError(
            "Przekroczono limit żądań. Spróbuj ponownie później."
          );
        default:
          throw new MovieApiError(
            `Błąd serwera (${axiosError.response.status}). Spróbuj ponownie później.`
          );
      }
    } else if (axiosError.request) {
      throw new MovieApiError(
        "Brak połączenia z serwerem. Sprawdź połączenie z internetem."
      );
    }
  }

  console.error("Unexpected error:", error);
  throw new MovieApiError(
    "Wystąpił nieoczekiwany błąd. Spróbuj ponownie później.",
    error
  );
}

async function fetchMovies(
  endpoint: string,
  params: Record<string, any> = {},
  errorMessage: string
): Promise<{ results: Movie[]; totalPages: number; totalResults?: number }> {
  try {
    const response = await api.get<ApiResponse<ApiMovieResponse>>(endpoint, {
      params,
    });

    return {
      results: response.data.results.map(formatMovie),
      totalPages: response.data.total_pages,
      totalResults: response.data.total_results,
    };
  } catch (error) {
    console.error(`Error in ${endpoint}:`, error);
    handleApiError(error);
  }
}

export async function searchMovies(
  query: string,
  page = 1
): Promise<{ results: Movie[]; totalPages: number }> {
  return fetchMovies(
    "/search/movie",
    { query, page },
    "Nie udało się wyszukać filmów."
  );
}

export async function getPopularMovies(
  page = 1
): Promise<{ results: Movie[]; totalPages: number }> {
  return fetchMovies(
    "/movie/popular",
    { page },
    "Nie udało się pobrać popularnych filmów."
  );
}

export async function getTopRatedMovies(
  page = 1
): Promise<{ results: Movie[]; totalPages: number }> {
  return fetchMovies(
    "/movie/top_rated",
    { page },
    "Nie udało się pobrać najlepiej ocenianych filmów."
  );
}

export async function getUpcomingMovies(
  page = 1
): Promise<{ results: Movie[]; totalPages: number }> {
  return fetchMovies(
    "/movie/upcoming",
    { page },
    "Nie udało się pobrać nadchodzących filmów."
  );
}

export async function getMoviesByGenre(
  genreId: number,
  page = 1
): Promise<{ results: Movie[]; totalPages: number }> {
  return fetchMovies(
    "/discover/movie",
    { with_genres: genreId, page, sort_by: "popularity.desc" },
    "Nie udało się pobrać filmów z wybranego gatunku."
  );
}

export async function getMovieRecommendations(
  movieId: number,
  page = 1
): Promise<{ results: Movie[]; totalPages: number }> {
  return fetchMovies(
    `/movie/${movieId}/recommendations`,
    { page },
    "Nie udało się pobrać rekomendacji."
  );
}

export async function getFilteredMovies(filterParams: {
  page?: number;
  perPage?: number;
  search?: string;
  categoryId?: number;
  sort?: string;
  year?: number;
  minRating?: number;
}): Promise<{ results: Movie[]; totalPages: number; totalResults: number }> {
  const {
    page = 1,
    search,
    categoryId,
    sort = "popularity.desc",
    year,
    minRating,
  } = filterParams;

  if (search?.trim()) {
    const searchResult = await searchMovies(search, page);
    return {
      ...searchResult,
      totalResults: searchResult.results.length * searchResult.totalPages,
    };
  }

  const params: Record<string, any> = {
    page,
    sort_by: sort,
  };

  if (categoryId) params.with_genres = categoryId;
  if (year) params.primary_release_year = year;
  if (minRating) params["vote_average.gte"] = minRating;

  const result = await fetchMovies(
    "/discover/movie",
    params,
    "Nie udało się pobrać przefiltrowanych filmów."
  );

  return {
    results: result.results,
    totalPages: result.totalPages,
    totalResults: result.totalResults!,
  };
}

export async function getMovieDetails(id: number): Promise<MovieDetails> {
  try {
    const response = await api.get<ApiMovieResponse>(`/movie/${id}`, {
      params: {
        append_to_response: "credits,videos",
      },
    });

    return formatMovieDetails(response.data);
  } catch (error) {
    console.error("Error getting movie details:", error);
    handleApiError(error);
  }
}

export async function getCategories(): Promise<
  Array<{ id: number; name: string }>
> {
  try {
    const response = await api.get<ApiGenresResponse>("/genre/movie/list");
    return response.data.genres;
  } catch (error) {
    console.error("Error fetching genres:", error);
    handleApiError(error);
  }
}
