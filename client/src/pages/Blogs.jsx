import React, { useEffect, useState } from 'react';

const Blogs = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('https://dashboard.freeimagebackgroundremover.com/wp-json/wp/v2/posts')
      .then(response => response.json())
      .then(data => setPosts(data))
      .catch(error => console.error('Error fetching posts:', error));
  }, []);

  return (
    <div>
      <h1>Blog Posts</h1>
      {posts.map(post => (
        <div key={post.id}>
          <h2 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
          <div dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
        </div>
      ))}
    </div>
  );
};

export default Blog;
