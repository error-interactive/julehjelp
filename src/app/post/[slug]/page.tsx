import { Suspense } from "react";
import { PostDetails } from "./PostDetails";

export default function PostPage({
  params: { slug },
}: {
  params: { slug: string };
}) {
  return (
    <div>
      <Suspense fallback={<p>Loading posts</p>}>
        <PostDetails slug={slug} />
      </Suspense>
    </div>
  );
}
