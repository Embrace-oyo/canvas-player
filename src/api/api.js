import request from './interceptor.js'


/* 手机登录 */
export function cellphone(params) {
	return request({
		url: '/login/cellphone',
		method: 'get',
		params
	})
}
/* 登录状态 */
export function refresh(params) {
	return request({
		url: '/login/refresh',
		method: 'get',
		params
	})
}
