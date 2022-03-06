import React, { useEffect, useState } from "react";
import { Blog, UserInfo } from "./interface";
import { config } from "./config"
import BlogCard from "./BlogCard";

function Blogs(props: UserInfo): JSX.Element {
  let [blogContent, setBlogContent] = useState<string>('');
  let [blogList, setBlogList] = useState<Blog[]>([]);

  let handleText = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const newValue = event.currentTarget.value
    setBlogContent(newValue)
  }

  useEffect((): void => {
    let userData = {
      username: props.username
    }
    const requestOptions: RequestInit  = {
      method: 'POST',
      body: JSON.stringify(userData),
      headers: new Headers({'Content-Type': 'application/json'})
    }
    let url: string = `${config.api_address}/blog/get`
    fetch(url, requestOptions)
    .then(response => response.json())
    .then(blog_list => {
      setBlogList(blog_list)
    }).catch(() => window.alert('Blog could not be added'))
  }, [])

  function addBlog(event: React.FormEvent): void {
    event.preventDefault()
    let blogData = {
      username: props.username,
      blog_content: blogContent
    }

    const requestOptions: RequestInit  = {
      method: 'POST',
      body: JSON.stringify(blogData),
      headers: new Headers({'Content-Type': 'application/json'})
    }
    let url: string = `${config.api_address}/blog/add`

    fetch(url, requestOptions)
    .then(response => response.json())
    .then(response_data => {
      window.location.reload()
      console.log(response_data)
    }).catch(() => window.alert('Blog could not be added'))
  }

  return (
    <div>
      <form className="flex w-full" onSubmit={addBlog}>
        <textarea id="blog-content" name="blog-content" rows={10} className="bg-zinc-200 px-2 py-1 rounded-l-lg w-full" onChange={handleText} />
        <button type="submit" className="bg-zinc-300 hover:bg-zinc-400 px-3 rounded-r-lg">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 rotate-90 scale-125" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
          </svg>
        </button>
      </form>
      <h1 className="mt-4 mb-2 text-zinc-600 font-bold text-3xl">Blogs</h1>
      <hr />
      {blogList.map((item) => {
        return <BlogCard blog_id={item['blog_id']} blog_content={item['blog_content']} />
      })}
    </div>
  )
}

export default Blogs;

