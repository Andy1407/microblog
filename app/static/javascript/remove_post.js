function remove_post(id) {
    let current_post = $(`#post-${id}`)

    current_post.hide()

    $.post('/remove_post', {
        'id': id
    }).done(function (response) {
        if (response['status'] === 'error') {
            current_post.show()
            alert(response['response'])
        } else if (response['status'] === 'successfully') {
            current_post.remove()
        }
    })
}
