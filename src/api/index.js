//包含n个接口请求函数的模块
// 函数的返回值 promise
// [1、根据经纬度获取位置详情]
// const BASE_URL = 'http://localhost:4000'
const BASE_URL = '/api'
import ajax from './ajax'
export const reqAddress = (geohash)=> ajax(`${BASE_URL}/position/${geohash}`)  //这里返回的是promise对象
// [2、获取食品分类列表]
export const reqFoodscategorys = ()=> ajax(BASE_URL+'/index_category')
// [3、根据经纬度获取商铺列表]
export const reqShops = (longitude,latitude)=> ajax(BASE_URL+'/shops',{longitude,latitude})
// [4、根据经纬度和关键字搜索商铺列表]
// [6、用户名密码登陆]
// [7、发送短信验证码]
// [8、手机号验证码登陆]
// [9、根据会话获取用户信息]
// [10、用户登出]


