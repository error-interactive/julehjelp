import { supabaseClient } from "@/lib/supabase";
import { auth, clerkClient } from "@clerk/nextjs";
import Link from "next/link";

export default async function Home() {
  const client = await supabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_KEY as string,
  );

  const { data } = await client.from("post").select();

  const users = await clerkClient.users.getUserList();

  const formattedData = data?.map((post) => {
    const user = users.find((user) => user.id === post.user_id);
    return {
      ...post,
      username: user?.username,
      avatar: user?.imageUrl,
    };
  });

  return (
    <main className="h-full w-full sm:max-w-md md:max-w-full sm:mx-auto sm:py-4 md:container">
      <div className="hidden md:block">
        <h3 className="text-4xl font-bold">Innlegg</h3>
      </div>
      <div className="">
        <div className="sm:grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:gris-cols-5 sm:gap-4 xl:py-10 py-3">
          {formattedData &&
            formattedData.map((post) => (
              <div
                key={post.id}
                className="border border-slate-200 flex flex-col lg:rounded"
              >
                <div className="flex items-center justify-between px-2 py-2">
                  <span className="text-sm">
                    <p className="text-sm font-medium flex items-center">
                      <span className="mr-2">
                        <img
                          src={post.avatar}
                          alt="avatar"
                          className="w-8 h-8 rounded-full"
                        />
                      </span>
                      {post.username}
                    </p>
                  </span>
                  <Link
                    href={`/post/${post.id}`}
                    className="text-sky-600 text-sm font-medium p-0 underline"
                  >
                    Hjelp
                  </Link>
                </div>
                <div className="">
                  <img src={post.image} alt="post image" className="w-full" />
                </div>

                <div className="py-4 px-2">
                  <div className="truncate">
                    <p className="text-sm">{post.caption}</p>
                    <Link
                      href={`/post/${post.id}`}
                      className="text-sky-600 text-sm font-medium p-0 underline"
                    >
                      Se mer
                    </Link>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </main>
  );
}
