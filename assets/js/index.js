$(function() {
    var layer = layui.layer;
    // 调用这个函数 获取用户信息
    getUserInfo()

    // 点击按钮实现退出功能
    $('#btnLogout').on('click', function() {
        // console.log('ok');
        layer.confirm('确认退出?', { icon: 3, title: '提示' }, function(index) {
            //do something
            localStorage.removeItem('token');
            location.href = '/login.html'

            // 关闭confirm弹出框
            layer.close(index);
        });
    })
})


// 获取用户基本信息
function getUserInfo() {
    $.ajax({
        type: "GET",
        url: "/my/userinfo",
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function(res) {
            // console.log(res);
            if (res.status !== 0) {
                return console.log(res.message);
            }

            // console.log(res);
            renderAvatar(res.data)
        },
        // complete: function(res) {
        //     // console.log('执行了complete函数');
        //     // console.log(res);
        //     // 可以通过res.responseJSON拿到服务器响应回来的数据
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
        //         localStorage.removeItem('token')
        //         location.href = '/login.html'
        //     }
        // }
    });
}


// 渲染用户头像
function renderAvatar(user) {
    var name = user.nickname || user.username;
    $('#welcome').html('欢迎 &nbsp;&nbsp;' + name)


    // 按需渲染头像
    if (user.user_pic !== null) {
        // 渲染用户头像
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide()
    } else {
        // 渲染文本头像
        $('.layui-nav-img').hide();

        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }

}