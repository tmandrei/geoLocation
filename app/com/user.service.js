class userService {
    userLogin() {
        $.post('http://localhost/geoLocation/api/userApi.php', { data: 'test' }, function (res) {
            console.log('Response Login', res)
            return 'res'
        })
        return 'ewrfasdfasdfasdfsa'
    }
}

