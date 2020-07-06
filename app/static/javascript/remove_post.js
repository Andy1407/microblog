function remove_post(id) {
    let current_post = $(`#post-${id}`)
    // let current_post2 = $(`#post-${id}`)
     // let posts = Array.from(document.getElementById('posts').children)


    $.post('/remove_post', {
        'id': id
    }).done(function (response) {
        if (response['status'] === 'error') {
            alert(response['response'])
        } else if (response['status'] === 'successfully') {
            // current_post2.replaceWith("<table><a href='/user/Andrey'>hello</a></table>")
            current_post.remove()
        }
    })
    // $(`#post-${id}`).hide()
    // remove_elem(`#post-${id}`)


    // let div = document.createElement("div")
    // div.id = 'wall'
    // div.style.background = "red"
    // div.style.width = "100px"
    // div.style.height = "100px"
    // div.style.position = 'absolute; >top: 0px; left: 0px;'
    //
    //
    // let a = false
    // let last_local = current_post.getBoundingClientRect().top
    // posts.forEach(post => {
    //     if (a) {
    //         anim(post, null, last_local, 2000)
    //         last_local = post.getBoundingClientRect().top
    //     }
    //
    //     if (post === current_post) {
    //         a = true
    //     }
    // })
    //
    // anim(current_post, 0, null, 400, function () {
    //     current_post.remove()
    // })
}


function anim(element, x, y, time, onFinish=null) {

    let local_x = element.getBoundingClientRect().right
    let local_y = element.getBoundingClientRect().top


    let result_x = x - local_x

    let result_y = y - local_y

    if (x == null) {
        result_x = 0
    }

    if (y == null) {
        result_y = 0
    }

    let animate = element.animate({
        transform: `translate(${result_x}px, ${result_y}px)`
    }, time)

    animate.addEventListener('finish', onFinish)
}