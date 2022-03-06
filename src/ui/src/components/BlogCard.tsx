import { Blog } from "./interface";
import default_user from '../assets/img/default_user.png'

function BlogCard(props: Blog): JSX.Element {
  return (
    <div className="mt-5 flex w-full">
      <img src={default_user} alt="user pic" className="rounded-full max-h-5" />
      <div className="bg-zinc-200 w-full rounded p-4">{props.blog_content}</div>
    </div>
  )
}

export default BlogCard;

