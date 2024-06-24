import { useParams } from "react-router-dom";
import { useBlog } from "../hooks/hooks";
import { FullBlog } from "../components/FullBlog";
import { Appbar } from "../components/Appbar";
import { Spinner } from "../components/spinner";

// atomFamilies/selectorFamilies
export const Blog = () => {
  const { id } = useParams();
  const { loading, blog } = useBlog({
    id: id || "",
  });

  if (loading || !blog) {
    return (
      <>
        <Appbar />
        <div className=" h-screen flex flex-col justify-center">
          <div className=" flex justify-center">
            <Spinner />
          </div>
        </div>
      </>
    );
  }
  return (
    <div>
      <FullBlog blog={blog} />
    </div>
  );
};
