import { FlowModel } from '../models/flow';

class Flow {
  static async createFlow (v) {
    return FlowModel.create({
      index: v.get('body.index'),
      type: v.get('body.type'),
      art_id: v.get('body.art_id'),
      status: v.get('body.status')
    });
  }
}

export { Flow as FlowDao };
