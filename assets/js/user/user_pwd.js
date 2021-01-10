$(function() {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        samePwd: function(value) {
            var oldPwd = $('[name=oldPwd]').val()
            if (value === oldPwd) {
                return ('新旧密码不能相同')
            }
        },
        rePwd: function(value) {
            var newPwd = $('[name=newPwd]').val()
            if (value !== newPwd) {
                return ('两次密码不一致')
            }
        }
    })



    // 为表单添加submit事件
    $('.layui-form').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/updatepwd',
            data: $(this).serialize(),
            success: function(res) {
                console.log(res);
                if (res.status !== 0) {
                    return layer.msg('更新密码失败')
                }

                // 重置表单
                $('.layui-form')[0].reset()
                layer.msg('更新密码成功,请重新登录', { time: 1000 }, function() {
                    localStorage.removeItem('token')
                    window.parent.location.href = '/login.html'
                })


            }
        })

    })
})