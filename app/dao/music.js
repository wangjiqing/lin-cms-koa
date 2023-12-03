import { MusicModel } from '../models/music';
import { NotFound } from 'lin-mizar';

class Music {
  static async getMusicList () {
    return MusicModel.findAll();
  }

  static async addMusic (v) {
    return MusicModel.create(v);
  }

  static async editMusic (id, params) {
    const music = await MusicModel.findByPk(id);
    if (!music) {
      throw new NotFound();
    }
    // 利用 ES6 的析构语法对参数进行解析
    return music.update({ ...params });
  }
}

export { Music as MusicDao };
