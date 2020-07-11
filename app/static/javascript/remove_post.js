$(document).ready(function () {
    let a = setTimeout(function () {
        let elem = Array.from(document.getElementsByClassName('alert alert-info'))
        elem.forEach(elem => {
            elem.remove()
        })

    }, 10000)
})

function remove_post(id, message) {
    let current_post = $(`#thisPost${id}`)
    let current_post2 = document.getElementById(`post-${id}`)
    let posts = Array.from(document.getElementById('posts').children)

    document.getElementById(`thisPost${id}`).style.overflow = 'hidden'

    animation(current_post2, posts, id, function () {
        current_post.hide()

        $.post('/remove_post', {
            'id': id
        }).done(function (response) {
            if (response['status'] === 'error') {
                current_post.show()
                alert(response['response'])
            } else if (response['status'] === 'successfully') {
                current_post.remove()
                toast(message, undefined, undefined, '#323232', '#ffffff')
            }
        })
    })


}

function animation(current_post, posts, id, onFinish = function () {
}) {

    let anim = current_post.animate({transform: `translate(0px, -${current_post.clientHeight}px)`}, 400)

    anim.addEventListener('finish', onFinish)

    let afterPost = false
    let lastPost = current_post
    posts.forEach(post => {
        if (afterPost && lastPost.style.display !== 'none' && $(post).is(":visible")) {
            let distance = post.getBoundingClientRect().top - lastPost.getBoundingClientRect().top
            lastPost = post
            let animate = post.animate({transform: `translate(0px, -${distance}px)`}, 400)

        }
        if (post.id === `thisPost${id}`) {
            afterPost = true
        }
    })


}
