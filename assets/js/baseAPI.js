$.ajaxPrefilter(function(option) {
    console.log(option.url);
    // 发起真正的ajax请求之后,统一拼接请求地址
    option.url = 'http://api-breakingnews-web.itheima.net' + option.url;
})