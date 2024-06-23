import { Appbar } from "../components/Appbar";
import { BlogCard } from "../components/blogcard";
import { useBlogs } from "../hooks/hooks";

export const Blogs = () => {
  const { loading, blogs } = useBlogs();

  if (loading) {
    return <div>loading....</div>;
  }
  return (
    <div>
      <Appbar />
      <div className=" flex justify-center">
        <div className=" max-w-xl">
          {blogs.map((blog) => (
            <BlogCard
              id={blog.id}
              authorName={blog.author.name || "Anonmyous"}
              title={blog.title}
              content={blog.content}
              publishedDate={"2nd Feb 2024"}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
