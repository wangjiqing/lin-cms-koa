import { MovieModel } from '../models/movie';

class Movie {
  static async getMovieList () {
    return MovieModel.findAll();
  }
  static async addMovie (v) {
    return MovieModel.create(v);
  }
}

export { Movie as MovieDao };
