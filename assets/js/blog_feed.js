document.addEventListener("DOMContentLoaded", () => {
    fetch('assets/js/feed.txt')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error. Status: ${response.status}`);
            }
            return response.json();
        })
        .then(posts => {
            const feed = document.getElementById('blog-feed');
            feed.innerHTML = '';
            
            posts.forEach((post, index) => {
                const li = document.createElement('li');
                li.innerHTML = `<a href="post.html?file=${encodeURIComponent(post.file)}">${post.title}</a>`;
                feed.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Error loading blog posts:', error);
            document.getElementById('blog-feed').innerHTML = '<li>Unable to load posts at this time.</li>';
        });
});