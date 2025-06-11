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