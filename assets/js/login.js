$(function() {
    var form = layui.form;
    var layer = layui.layer;
    // 登录表单
    $('#link_reg').on('click', function() {
        $('.login-box').hide();
        $('.reg-box').show();
    })

    // 注册表单
    $('#link_login').on('click', function() {
        $('.login-box').show();
        $('.reg-box').hide();
    })


    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repwd: function(value) {
            var pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致'
            }
        }
    })

    // 注册表单事件
    $('#form_reg').on('submit', function(e) {
        e.preventDefault();
        var data = {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: data,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }

                layer.msg('注册成功,请登录', { time: 1000 }, function() {
                    $('#link_login').click()
                })
            }
        })


    })


    // 注册登录事件
    $('#form-login').on('submit', function(e) {
        var data = {
            username: $('#form-login [name=username]').val(),
            password: $('#form-login [name=password]').val()
        }
        e.preventDefault();
        $.post('/api/login', data,
            function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('登录成功');
                location.href = '/index.html'
            })
    })
})