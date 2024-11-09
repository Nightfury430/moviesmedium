const API_URL = 'https://wookie.codesubmit.io/movies';
const AUTH_HEADER = {
  Authorization: 'Bearer Wookie2021',
};

export const fetchMovies = async () => {
  try {
    const response = await fetch(API_URL, {
      headers: AUTH_HEADER,
    });
    if (!response.ok) {
      throw new Error('Failed to fetch movies');
    }
    const data = await response.json();
    return data.movies;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error;
  }
};

export const searchMovies = async (query) => {
  try {
    const response = await fetch(`${API_URL}?q=${query}`, {
      headers: AUTH_HEADER,
    });
    if (!response.ok) {
      throw new Error('Failed to search movies');
    }
    const data = await response.json();
    return data.movies;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw error;
  }
};

export const fetchMovieDetail = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      headers: AUTH_HEADER,
    });
    if (!response.ok) {
      throw new Error('Failed to fetch movie details');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw error;
  }
};
