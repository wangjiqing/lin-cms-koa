import { LinRouter } from 'lin-mizar';
import { AddContentValidator, DeleteContentValidator, EditContentValidator } from '../../validators/content';
import { ContentService } from '../../service/content';
import { groupRequired } from '../../middleware/jwt';
import { logger } from '../../middleware/logger';

const contentApi = new LinRouter({
  prefix: '/v1/content'
});

/**
 * 新增期刊内容（加权控）
 */
contentApi.linPost(
  'addContent',
  '/', {
    permission: '添加期刊内容',
    module: '内容管理',
    mount: true
  },
  groupRequired,
  logger('{user.username}新增了一个期刊内容'),
  async ctx => {
    // 1. 参数校验
    const v = await new AddContentValidator().validate(ctx);
    // 2. 执行业务逻辑 && 3. 插入数据库
    await ContentService.addContent(v.get('body'));
    // 4. 返回成功
    ctx.success({
      msg: '期刊内容新增成功'
    });
  });

/**
 * 查看期刊列表
 */
contentApi.get('/', async ctx => {
  const contentList = await ContentService.getContentList();
  return ctx.json(contentList);
});

/**
 * 编辑期刊内容
 */
contentApi.linPut(
  'editContent',
  '/:id',
  {
    permission: '编辑期刊内容',
    module: '内容管理',
    mount: true
  },
  groupRequired,
  async ctx => {
    const v = await new EditContentValidator().validate(ctx);
    const id = v.get('path.id');
    const params = v.get('body');

    await ContentService.editContent(id, params);
    ctx.success({
      msg: '期刊内容更新成功'
    });
  });

/**
 * 删除期刊内容
 */
contentApi.delete('/:id', async ctx => {
  const v = await new DeleteContentValidator().validate(ctx);
  const id = v.get('path.id');
  const type = v.get('query.type');
  await ContentService.deleteContent(id, type);
  ctx.success({
    msg: '期刊删除成功'
  });
});

module.exports = { contentApi };
