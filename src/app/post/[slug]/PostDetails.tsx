"use server";

import { supabaseClient } from "@/lib/supabase";
import { auth, clerkClient } from "@clerk/nextjs";
import dayjs from "dayjs";
import { HelpDialog } from "./HelpDialog";
import { PostImages } from "./PostImages";
dayjs.locale("no");

interface Post {
  id: number;
  caption: string;
  images: string[];
  username: string;
  avatar: string;
  created_at: string;
  phone_number: string;
  user_id: string;
}

export async function PostDetails({ slug }: { slug: string }) {
  const { userId } = auth();

  const client = await supabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_KEY as string,
  );

  const { data } = await client
    .from("post")
    .select()
    .eq("id", slug)
    .single<Post>();

  if (!data) {
    return <p>Post not found</p>;
  }

  const user = await clerkClient.users.getUser(data.user_id);

  const formattedPost: Partial<Post> = {
    ...data,
    username: user.username ?? "",
    avatar: user.imageUrl ?? "",
  };

  if (!data) {
    return <p>Post not found</p>;
  }

  return (
    <div className="px-4 md:px-0 py-4">
      <div>
        <p className="text-sm text-gray-500">
          {dayjs(formattedPost.created_at).format("DD.MM.YYYY")}
        </p>
      </div>
      <div className="flex flex-col space-y-4 sm:flex-row md:items-center justify-between mt-4">
        <div className="flex items-center space-x-3">
          <span>
            <img
              src={formattedPost.avatar}
              alt="avatar"
              className="w-8 h-8 rounded-full"
            />
          </span>
          <h3 className="text-lg font-medium">{formattedPost.username}</h3>
        </div>
      </div>
      <div className="mt-4">
        {userId ? (
          <p className="font-medium">
            Telefon:{" "}
            <span className="font-normal">
              {!formattedPost.phone_number
                ? "Ikke oppgitt"
                : formattedPost.phone_number}
            </span>
          </p>
        ) : (
          <p>Logg inn for å se telefonnummer</p>
        )}
      </div>
      <div className="mt-4">
        <HelpDialog />
      </div>
      <div className="py-8">
        <p className="text-md">{data.caption}</p>
      </div>

      {/* Need some sort of grid here if we have multiple images */}
      <div>
        <PostImages imageUrls={data.images} />
      </div>
    </div>
  );
}
