export interface Movie {
  id: number;
  title: string;
  posterPath: string | null;
  releaseDate: string;
  voteAverage: number;
}

export interface MovieDetails extends Movie {
  overview: string;
  backdropPath: string | null;
  runtime: number;
  genres: string[];
  cast: {
    id: number;
    name: string;
    character: string;
    profilePath: string | null;
  }[];
}
