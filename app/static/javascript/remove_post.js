function remove_post(id) {
    let current_post = document.querySelector(`#post-${id}`)


    $.post('/remove_post', {
        'id': id
    }).done(function (response) {
        if (response['status'] === 'error') {
            alert(response['response'])
        } else if (response['status'] === 'successfully') {
            current_post.remove()
        }
    })
}
