"use client";

import { supabaseClient } from "@/lib/supabase";
import React, { useEffect, useState } from "react";

export const PostImages: React.FC<{ imageUrls: string[] }> = ({
  imageUrls,
}) => {
  const [images, setImages] = useState<File[]>([]);

  const fetchImages = async () => {
    const client = await supabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_KEY as string,
    );

    console.log(imageUrls);

    const { data: storageData, error: storageError } = await client.storage
      .from("images")
      .createSignedUrls(imageUrls, 3600);

    if (storageError) {
      console.error("Error fetching signed urls", storageError);
    }

    if (!storageData) return;

    for (const image of storageData) {
      const response = await fetch(image.signedUrl);
      const blob = await response.blob();

      const file = new File([blob], new Date().toISOString());

      setImages((prev) => [...prev, file]);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  if (images.length === 0) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div>
        <img
          className="w-full sm:w-auto"
          alt="post image"
          src={URL.createObjectURL(images[0])}
        />
      </div>
    </div>
  );
};
