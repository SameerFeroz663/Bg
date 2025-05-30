import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Blogs = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch('https://dashboard.freeimagebackgroundremover.com/wp-json/wp/v2/posts')
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="px-4 py-20 lg:px-44 my-8">
      <h1 className="text-3xl font-bold mb-6">Blog Posts</h1>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map(post => (
          <div key={post.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-all">
            <h2
              className="text-xl font-semibold mb-3"
              dangerouslySetInnerHTML={{ __html: post.title.rendered }}
            />
            <p
              className="text-gray-600 line-clamp-3 mb-4"
              dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
            />
            <Link to={`/blogs/${post.id}`} className="text-blue-600 hover:underline">
              Read More →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blogs;
