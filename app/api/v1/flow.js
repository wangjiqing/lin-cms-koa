import { LinRouter } from 'lin-mizar';
import { groupRequired } from '../../middleware/jwt';
import { logger } from '../../middleware/logger';
import { AddFlowValidator } from '../../validators/flow';
import { FlowDao } from '../../dao/flow';

const flowApi = new LinRouter({
  prefix: '/v1/flow'
});

/**
 * 新增期刊内容（加权控）
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

module.exports = { flowApi };
