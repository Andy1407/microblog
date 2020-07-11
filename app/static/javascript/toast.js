let current_toast = null

function toast(text,
               buttonText = null,
               buttonAction = null,
               background = 'red',
               textColor = 'black',
               onFinish=null,
               indentLeft = 24,
               indentBottom = 24,
               indentInsideH = '10px',
               indentInsideV = '7px',
               margin = "5px",
               fontSize = "15px") {

    if (current_toast != null) {
        remove_toast(current_toast, indentBottom, function () {
            create_toast(text,
                buttonText,
                buttonAction,
                background,
                textColor,
                onFinish,
                indentLeft,
                indentBottom,
                indentInsideH,
                indentInsideV,
                margin,
                fontSize)


        })
    } else {
        create_toast(text,
            buttonText,
            buttonAction,
            background,
            textColor,
            onFinish,
            indentLeft,
            indentBottom,
            indentInsideH,
            indentInsideV,
            margin,
            fontSize)
    }


}

function create_toast(text,
                      buttonText,
                      buttonAction,
                      background,
                      textColor,
                      onFinish,
                      indentLeft,
                      indentBottom,
                      indentInsideH,
                      indentInsideV,
                      margin,
                      fontSize) {

    let content = ""
    if (buttonText == null) {
        content = `<span id="text">${text}</span>`
    } else {
        content = `<span id="textToast" style="margin-right: ${indentInsideH}">${text}</span><span id="buttonToast"><a href="${buttonAction}">${buttonText}</a></span>`
    }

    let toast = document.createElement("div")
    toast.className = "toast"
    toast.id = 'toast'
    toast.style.background = background
    toast.innerHTML = content
    let html = document.getElementById('toasts')
    html.style.bottom = `-40px`
    html.style.left = `${indentLeft}px`
    toast.style.padding = `${indentInsideV} ${indentInsideH} ${indentInsideV} ${indentInsideH}`
    toast.style.display = "inline-block"
    toast.style.fontSize = fontSize
    toast.style.color = textColor

    html.appendChild(toast)

    let time = setTimeout(function () {
        remove_toast(toast, indentBottom)
        if (onFinish != null) {
            onFinish()
        }
    }, 10000)


    current_toast = toast

    let animate = toast.animate({transform: `translate(0px, -${40 + indentBottom - 4}px)`}, 500)
    animate.addEventListener('finish', function () {
        let html = document.getElementById('toasts')
        html.style.bottom = `${indentBottom - 4}px`

    })

}

function remove_toast(toast, indentBottom, onFinish = null) {
    let anim = toast.animate({transform: `translate(0px, ${40 + indentBottom - 4}px)`}, 400)

    anim.addEventListener('finish', function () {
        if (onFinish != null) {
            onFinish()
        }
        toast.remove()
    })


}



