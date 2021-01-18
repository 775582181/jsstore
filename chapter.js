import request from '@/utils/request'

/**
 * 根据分页查询 List
 * @param params
 * @returns  包含分页信息、数据的 json
 */
export function getList(params) {
  // /admin/chapters?page=1&size=0 GET
  console.log('params:', params)
  return request({
    url: '/admin/chapters',
    method: 'get',
    params
  })
}

/**
 * 获取课程列表 根据token，token 在 headers[X-Token]
 */
export function getCourseList() {
  return request({
    url: '/admin/chapters/courses',
    method: 'get'
  })
}

/**
 * 提交编辑数据，然后返回列表
 * @param dataArr
 * @returns
 */
export function edit(dataArr) {
  const { data, uri } = initUriAndData(dataArr)
  return request({
    url: uri,
    method: 'put',
    data
  })
}

export function add(data) {
  return request({
    url: '/admin/chapters',
    method: 'post',
    data
  })
}

export function deleteItem(dataArr) {
  const { data, uri } = initUriAndData(dataArr)
  return request({
    url: uri,
    method: 'delete',
    data
  })
}

function initUriAndData(data, url) {
  let id = ''
  let dataArr = []
  if (data instanceof Array) { // []
    for (const key in data) {
      id = id.concat(data[key].id, ';')
    }
    //去除最后一个 分号
    id = id.substring(0, id.length - 1)
  } else { // 一个对象
    id = data.id
    dataArr = [data] // 将一条数据 转 []
  }
  let uri = url || '/admin/chapters/'
  uri = uri + id
  return { uri: uri, data: dataArr }
}
