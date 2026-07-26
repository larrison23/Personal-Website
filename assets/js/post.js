const urlParams = new URLSearchParams(window.location.search);
const fileName = urlParams.get('file');

if (fileName) {
    const decodedName = decodeURIComponent(fileName);

    const titleElement = document.querySelector('.project__title__banner h3');
    if (titleElement) {
        titleElement.innerHTML = decodedName.replace('.md','');
    }
    
    const container = document.getElementById('markdown-container');
    container.setAttribute('data-file', 'content/blog/' + fileName);
} else {
    document.getElementById('markdown-container').innerText = "Post not found.";
}