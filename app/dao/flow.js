import { FlowModel } from '../models/flow';
import { NotFound } from 'lin-mizar';

class Flow {
  static async createFlow (v) {
    return FlowModel.create({
      index: v.get('body.index'),
      type: v.get('body.type'),
      art_id: v.get('body.art_id'),
      status: v.get('body.status')
    });
  }

  static async getFlowList () {
    return FlowModel.findAll({
      order: ['index'] // index 排序
    });
  }

  static async editFlow (id, index, type, art_id, status) {
    const flow = await FlowModel.findByPk(id);
    if (!flow) {
      throw new NotFound();
    }

    await flow.update({ index, type, art_id, status });
  }

  static async delFlow (id) {
    const flow = await FlowModel.findByPk(id);
    if (!flow) {
      throw new NotFound();
    }

    await flow.destroy(id);
  }
}

export { Flow as FlowDao };
