import request from '../utils/request'

//发送验证码
export const getCode =(data) =>{
    return request.post('/get/code',data)
}
//注册用户
export const userAuthentication = (data) =>{
    return request.post('user/authentication',data)
}
//登录
export const login = (data) =>{
    return request.post('/login',data)
}
//账号权限管理列表
export const authAdmin = (params) =>{
    return request.get('/auth/admin',{params})
}
//菜单权限数据
export const userGetMenu = () =>{
    return request.get('/user/getmenu')
}

//菜单权限修改   没有data会报参数不对，检查string类型  
export const userSetMenu = (data) =>{
    return request.post('/user/setmenu',data)
}

//菜单权限列表
export const menuList = (params) =>{
    return request.get('/menu/list',{params})
}

//权限下拉列表
export const menuSelectList = () =>{
    return request.get('/menu/selectlist')
}
//用户数据修改
export const updateUser = (data) =>{
    return request.post('/update/user',data)
}
export const menuPermissions = () =>{
    return request.get('/menu/permissions')
}

