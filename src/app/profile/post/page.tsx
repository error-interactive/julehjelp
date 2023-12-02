"use client";

import { supabaseClient } from "@/lib/supabase";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";

export default function ProfilePostPage() {
  const [postId, setPostId] = useState<number | null>(null);
  const [description, setDescription] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [images, setImages] = useState<File[]>([]);

  const [loading, setLoading] = useState<boolean>(true);

  const { getToken, userId } = useAuth();

  const handleOnFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    if (!file) return;

    setImages((prev) => [...prev, file]);
  };

  const fetchProfilePost = async () => {
    const token = await getToken({ template: "supabase" });
    if (!token) return;

    const client = await supabaseClient(token);

    const { data, error } = await client
      .from("post")
      .select()
      .eq("user_id", userId)
      .single();

    if (error) {
      console.error("Error fetching profile post", error);
    }

    const { data: storageData, error: storageError } = await client.storage
      .from("images")
      .createSignedUrls(data.images, 3600);

    if (storageError) {
      console.error("Error fetching signed urls", error);
    }

    console.log(storageData);

    if (data) {
      setPostId(data.id);
      setDescription(data.caption);
      setPhoneNumber(data.phone_number);

      if (!storageData) return;

      for (const image of storageData) {
        const response = await fetch(image.signedUrl);
        const blob = await response.blob();

        const file = new File([blob], new Date().toISOString());

        setImages((prev) => [...prev, file]);
      }
    }
  };

  const updateProfilePost = async () => {
    if (!description.trim()) return;

    const token = await getToken({ template: "supabase" });
    if (!token) return;

    const client = await supabaseClient(token);

    let imageUrls = [];
    for (const image of images) {
      const { data, error } = await client.storage
        .from("images")
        .upload(`profile/${image.name}`, image);

      if (error) {
        console.error("Error uploading image", error);
      }

      if (data) {
        imageUrls.push(data.path);
      }
    }

    const { error } = await client.from("post").upsert({
      id: postId,
      caption: description,
      user_id: userId,
      phone_number: phoneNumber,
      images: imageUrls,
    });

    if (error) {
      console.error("Error inserting/updating profile post", error);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchProfilePost().then(() => setLoading(false));
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="py-12">
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="font-medium text-sm">
            Beskrivelse av deg eller situasjonen din
          </label>
          <textarea
            className="bg-slate-200 rounded p-2 w-full outline-none border border-slate-300 h-40"
            placeholder="Beskrivelse"
            value={description}
            onChange={(e) => setDescription(e.currentTarget.value)}
          />
        </div>

        <div className="w-full max-w-sm space-y-2">
          <label className="font-medium text-sm">
            Telefonnummer (valgfritt) - slik at andre kan kontakte deg eller
            bidra på andre måter. Dette vil bli synlig for alle innloggede
            brukere.
          </label>
          <input
            type="tel"
            className="bg-slate-200 rounded p-2 w-full outline-none border border-slate-300"
            value={phoneNumber}
            placeholder="Telefonnummer"
            onChange={(e) => setPhoneNumber(e.currentTarget.value)}
          />
        </div>
        <div className="space-y-2 flex flex-col">
          <label className="font-medium text-sm">
            Last opp bilder du vil dele (valgfritt)
          </label>
          <label
            htmlFor="image_upload"
            className="bg-sky-600 text-sm max-w-sm text-center cursor-pointer px-4 py-1.5 font-medium rounded-md text-white hover:bg-sky-700"
          >
            Last opp bilde
          </label>
          <input
            id="image_upload"
            className="hidden"
            type="file"
            onChange={handleOnFileChange}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          {images.map((image) => (
            <div key={image.name} className="aspect-sqaure">
              <img
                className="w-40"
                src={URL.createObjectURL(image)}
                alt="uploaded image"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4">
        <button
          onClick={updateProfilePost}
          className="bg-sky-600 px-4 py-2 font-medium rounded-md text-white hover:bg-sky-700"
        >
          Lagre
        </button>
      </div>
    </div>
  );
}
