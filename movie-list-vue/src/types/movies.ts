export interface Movie {
  id: string
  title: string
  backdrop: string
  cast: string[]
  classification: string
  director: string[]
  genres: string[]
  imdb_rating: number
  length: string
  overview: string
  poster: string
  released_on: string
  slug: string
  bookmarked: boolean
  rating: number
}

export interface MovieResponse {
  movies: Movie[]
}

export interface ApiError extends Error {
  status?: number
  code?: string
}
