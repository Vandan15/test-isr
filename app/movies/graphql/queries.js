import { gql } from '@apollo/client';

export const MOVIES = gql`
  query Query($filter: MoviesFilter!, $sort: ListMoviesSort!) {
    movies(filter: $filter, sort: $sort) {
      count
      data {
        id
        adult
        imageUrl
        originalTitle
        title
        releaseDate
        originalLanguage
        title
      }
    }
  }
`;

export const MOVIE = gql`
  query Movie($movieId: ID!) {
    movie(id: $movieId) {
      message
      data {
        adult
        budget
        id
        originalLanguage
        originalTitle
        overview
        revenue
        runtime
        status
        tagline
        title
        releaseDate
        imageUrl
        movieImages {
          filePath
        }
      }
    }
  }
`;
