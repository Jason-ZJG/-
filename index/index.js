//防止别人直接进入index
if (!localStorage.getItem('token')) {
    location.href = '../login.html';
}

//获取用户信息
$.ajax({
    type: 'get',
    url: 'http://ajax.frontend.itheima.net/my/userinfo',
    headers: {
        Authorization: localStorage.getItem('token')
    },
    success: function (res) {
        if (res.status == 0) {
            var name = res.data.nickname || res.data.username;
            $('.username').html(name);
            if (res.data.user_pic) {
                $('.layui-nav-img').attr('src', res.data.user_pic);
                $('.avatar').hide();
            } else {
                var first = name.substr(0, 1).toUpperCase();
                $('.layui-nav-img').hide();
                $('.avatar').show().html(first).css('display', 'inline-block');

            }
        }

    }
});
//退出
$('#logout').on('click', function () {
    layer.confirm('确定退出？', function (index) {
        localStorage.removeItem('token');
        location.href = '../login.html';
        layer.close(index);
    })
})