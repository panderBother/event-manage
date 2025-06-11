import request from '@/utils/request'
export const artArticleListService = () => {
  return request.get('/my/cate/list')
}
export const artArticleDeleteService = (id) => {
  return request.delete('/my/cate/del', {
    params: { id }
  })
}
export const artArticleAddService = (data) => {
  return request.post('/my/cate/add', data)
}
export const artArticleEditService = (data) => {
  return request.put('/my/cate/info', data)
}
export const artGetListService = (params) => {
  return request.get('/my/article/list', { params })
}
// 文章删除
export const artArticleDelService = (id) => {
  return request.delete('/my/article/info', {
    params: { id }
  })
}
//添加文章
export const artArticleInsertService = (data) => {
  return request.post('/my/article/add', data)
}
//  修改文章
export const artArticleUploadService = (data) => {
  return request.put('/my/article/info', data)
}
//  文章列表
export const artArticlesService = (obj) => {
  return request.get('/my/article/list', {
    params:{
      page: obj.page,
      query: obj.query,
      cate_id: obj.cate_id,
      state: obj.state
    }
  })
}
//  获取文章详情
export const artArticleDetailService = (id) => {
  return request.get('/my/article/info', {
    params:{
      id
    }
  })
}