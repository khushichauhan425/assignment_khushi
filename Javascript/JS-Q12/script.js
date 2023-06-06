fetch('https://jsonplaceholder.typicode.com/posts')
  .then(response => response.json())
  .then(data => {
    // Assuming you have a container element with the id "blogs-container"
    const blogsContainer = document.getElementById('blogs-container');

    data.forEach(blog => {
      // Create a new blog element
      const blogElement = document.createElement('div');
      blogElement.innerHTML = `
        <h2>Title: ${blog.title}</h2>
        <p>Description: ${blog.body}</p>
        <button class="delete-btn" data-id="${blog.id}">Delete</button>
      `;

      // Append the blog element to the container
      blogsContainer.appendChild(blogElement);
    });

    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
      button.addEventListener('click', () => {
        const blogId = button.dataset.id;
        deleteBlog(blogId, button.parentNode);
      });
    });
  })
  .catch(error => {
    console.log('Error:', error);
  });

  function addBlog() {
    const title = document.getElementById('blog-title').value;
    const body = document.getElementById('blog-body').value;
  
    // Make a POST request to add the new blog
    fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({ title, body }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then(data => {
        // Assuming you have a container element with the id "blogs-container"
        const blogsContainer = document.getElementById('blogs-container');

    // Create a new blog element
    const blogElement = document.createElement('div');
    blogElement.innerHTML = `
      <h2>${data.title}</h2>
      <p>${data.body}</p>
      <button class="delete-btn" data-id="${data.id}">Delete</button>
    `;

    // Append the new blog element to the container
    blogsContainer.appendChild(blogElement);

    // Clear input fields
    document.getElementById('blog-title').value = '';
    document.getElementById('blog-body').value = '';

    // Add event listener to the delete button of the new blog
    const deleteButton = blogElement.querySelector('.delete-btn');
    deleteButton.addEventListener('click', () => {
      const blogId = deleteButton.dataset.id;
      deleteBlog(blogId, blogElement);
    });
  })
  .catch(error => {
    console.log('Error:', error);
  });
}

// Function to delete a blog
function deleteBlog(blogId, blogElement) {
    // Make a DELETE request to delete the blog
    fetch(`https://jsonplaceholder.typicode.com/posts/${blogId}`, {
      method: 'DELETE',
    })
      .then(response => {
        if (response.ok) {
          // Remove the blog element from the UI
          blogElement.remove();
        } else {
          throw new Error('Failed to delete the blog.');
        }
      })
      .catch(error => {
        console.log('Error:', error);
      });
  }