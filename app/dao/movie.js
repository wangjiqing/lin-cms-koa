import { MovieModel } from '../models/movie';
import { NotFound } from 'lin-mizar';

class Movie {
  static async getMovieList () {
    return MovieModel.findAll();
  }
  static async addMovie (v) {
    return MovieModel.create(v);
  }

  static async editMovie (id, params) {
    const movie = await MovieModel.findByPk(id);
    if (!movie) {
      throw new NotFound();
    }
    // 利用 ES6 的析构语法对参数进行解析
    return movie.update({ ...params });
  }

  static async deleteMovieById (id) {
    return MovieModel.destroy({
      where: { id }
    });
  }
}

export { Movie as MovieDao };
