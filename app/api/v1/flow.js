import { LinRouter } from 'lin-mizar';
import { groupRequired } from '../../middleware/jwt';
import { logger } from '../../middleware/logger';
import { AddFlowValidator } from '../../validators/flow';
import { FlowDao } from '../../dao/flow';
import { FlowService } from '../../service/flow';

const flowApi = new LinRouter({
  prefix: '/v1/flow'
});

/**
 * 新增最新期刊内容（加权控）
 */
flowApi.linPost(
  'addFlow',
  '/', {
    permission: '添加最新期刊',
    module: '最新期刊管理',
    mount: true
  },
  groupRequired,
  logger('{user.username}新增了一个最新期刊'),
  async ctx => {
    const v = await new AddFlowValidator().validate(ctx);
    await FlowDao.createFlow(v);
    ctx.success({
      msg: '最新期刊内容新增成功'
    });
  });

flowApi.linGet('/', async ctx => {
  // 1. flow
  // 2. 根据结果里 art_id，type 字段去查询相应类型的期刊内容
  // 3. 格式化数据
  // 4. 返回数据
  const flowList = await FlowService.getFlowList();
  ctx.json(flowList);
});

module.exports = { flowApi };
