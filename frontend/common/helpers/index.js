export const decodeHtml = (name) => {
    let txt = document.createElement('textarea')
    txt.innerHTML = name
    return txt.value
}
