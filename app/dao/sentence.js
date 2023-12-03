import { SentenceModel } from '../models/sentence';

class Sentence {
  static async getSentenceList () {
    return SentenceModel.findAll();
  }

  static async addSentence (v) {
    return SentenceModel.create(v);
  }
}

export { Sentence as SentenceDao };
