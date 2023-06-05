// pages/blog/[id].js

import { useState, useEffect } from 'react';
import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';

const BlogPost = () => {
  const [post, setPost] = useState(null);
  const router = useRouter();
  const { id } = router.query; // get the dynamic part of the URL

  useEffect(() => {
    if (id) {
      axios.get(`/api/posts/${id}`) // fetch the data for the specific blog post
        .then((res) => {
          setPost(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [id]);

  if (!post) return <div>Loading...</div>

  return (
    <div className="px-4 md:px-10 py-5">
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1 className="text-4xl font-bold mb-5">{post.title}</h1>
      <p>{post.content}</p>
    </div>
  );
}

export default BlogPost;