function remove_post(id) {
            $.post('/remove_post', {
                'id': id
            }).done(function (response) {
                if (response['status'] === 'error') {
                    alert(response['response'])
                } else if (response['status'] === 'successfully') {
                    let post = document.querySelectorAll(`#post-${response['response']}`)
                    post.forEach(post => post.remove())
                }
            })
        }