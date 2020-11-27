export const decodeHtml = (name) => {
    let txt = document.createElement('textarea')
    txt.innerHTML = name
    return txt.value
}

export const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    })
}
