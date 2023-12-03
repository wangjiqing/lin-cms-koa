import { MusicModel } from '../models/music';

class Music {
  static async getMusicList () {
    return MusicModel.findAll();
  }

  static async addMusic (v) {
    return MusicModel.create(v);
  }
}

export { Music as MusicDao };
