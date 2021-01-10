$.ajaxPrefilter(function(option) {
    // console.log(option.url);
    // 发起真正的ajax请求之后,统一拼接请求地址
    option.url = 'http://api-breakingnews-web.itheima.net' + option.url;

    // 统一为有权限的接口 设置header请求头
    if (option.url.indexOf('/my/') !== -1) {
        option.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    // 全局统一挂载complete回调函数
    option.complete = function(res) {
        // 可以通过res.responseJSON拿到服务器响应回来的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            localStorage.removeItem('token')
            location.href = '/login.html'
        }
    }

})