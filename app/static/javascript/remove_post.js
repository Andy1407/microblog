function remove_post(id) {
    let current_post = $(`#post-${id}`)
    let current_post2 = document.getElementById(`post-${id}`)
    let posts = Array.from(document.getElementById('posts').children)

    document.getElementById(`thisPost${id}`).style.overflow = 'hidden'

    let anim = current_post2.animate({transform: `translate(0px, -${current_post2.clientHeight}px)`}, 400)

    anim.addEventListener('finish', function () {
        current_post.hide()

        $.post('/remove_post', {
            'id': id
        }).done(function (response) {
            if (response['status'] === 'error') {
                current_post.show()
                alert(response['response'])
            } else if (response['status'] === 'successfully') {
                $(`#thisPost${id}`).remove()
            }
        })
    })

    let afterPost = false
    let lastPost = current_post2
    posts.forEach(post => {
        if (afterPost) {
            let distance = post.getBoundingClientRect().top - lastPost.getBoundingClientRect().top
            let animate = post.animate({transform: `translate(0px, -${distance}px)`}, 400)
            lastPost = post
        }
        if (post.id === `thisPost${id}`) {
            afterPost = true
        }
    })



}

function cancel() {


}
