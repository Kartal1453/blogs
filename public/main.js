const blogDelete = document.querySelector('a.delete');
blogDelete.addEventListener('click', (e) => {
    const endpoint = `/blogs/${blogDelete.dataset.doc}`;
    fetch(endpoint, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => window.location.href = data.redirect)
        .catch(err => console.log(err));
});