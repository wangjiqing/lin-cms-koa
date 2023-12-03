import { SentenceModel } from '../models/sentence';
import { NotFound } from 'lin-mizar';

class Sentence {
  static async getSentenceList () {
    return SentenceModel.findAll();
  }

  static async addSentence (v) {
    return SentenceModel.create(v);
  }

  static async editSentence (id, params) {
    const sentence = await SentenceModel.findByPk(id);
    if (!sentence) {
      throw new NotFound();
    }
    // 利用 ES6 的析构语法对参数进行解析
    return sentence.update({ ...params });
  }
}

export { Sentence as SentenceDao };
