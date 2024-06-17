document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('post-form');
    const postsContainer = document.getElementById('posts');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;

        const response = await fetch('/post', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, content })
        });

        if (response.ok) {
            loadPosts();
        }
    });

    async function loadPosts() {
        const response = await fetch('/posts');
        const posts = await response.json();

        postsContainer.innerHTML = posts.map(post => `
            <div class="post">
                <h2>${post.title}</h2>
                <p>${post.content}</p>
                <small>Postado por ${post.author.username} em ${new Date(post.createdAt).toLocaleString()}</small>
            </div>
        `).join('');
    }

    loadPosts();
});