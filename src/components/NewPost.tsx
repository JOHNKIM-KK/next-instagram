"use client";

import type { AuthUser } from "@/model/authUser";
import PostUserAvatar from "@/components/PostUserAvatar";
import FilesIcon from "@/components/ui/icons/FilesIcon";
import { Button } from "@/components/ui/Button";
import {
  type ChangeEvent,
  useState,
  type DragEvent,
  type FormEvent,
  useRef,
} from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import GridSpinner from "@/components/GridSpinner";

type Props = {
  user: AuthUser;
};
export const NewPost = ({ user: { username, image } }: Props) => {
  const [dragging, setDragging] = useState<boolean>(false);
  const [file, setFile] = useState<File>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const textRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const files = e.target?.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };
  const handleDrag = (e: DragEvent) => {
    if (e.type === "dragenter") {
      setDragging(true);
    } else if (e.type === "dragleave") {
      setDragging(false);
    }
  };
  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
  };
  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const files = e.dataTransfer?.files;
    if (files && files[0]) {
      setFile(files[0]);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("text", textRef.current?.value ?? "");

    fetch("/api/posts/", {
      method: "POST",
      body: formData,
    })
      .then((res) => {
        if (!res.ok) {
          setError(`Error: ${res.status} - ${res.statusText}`);
          return;
        }
        router.push("/");
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  return (
    <section className="w-full max-w-xl flex flex-col items-center mt-6">
      {loading && (
        <div
          className={
            "absolute inset-0 z-20 text-center pt-[30%] bg-sky-500/20 "
          }
        >
          <GridSpinner />
        </div>
      )}
      {error && (
        <p
          className={
            "w-full bg-red-100 text-red-600 text-center p-4 m-4 font-bold"
          }
        >
          dskad;lakd;laldasd
        </p>
      )}
      <PostUserAvatar image={image ?? ""} username={username} />
      <form className={"w-full flex flex-col mt-2"} onSubmit={handleSubmit}>
        <input
          className={"hidden"}
          name={"input"}
          id={"input-upload"}
          type={"file"}
          accept={"image/*"}
          onChange={handleChange}
        />
        <label
          className={`w-full h-60 flex flex-col items-center justify-center ${
            !file && "border-2 border-sky-500 border-dashed"
          }`}
          htmlFor="input-upload"
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          {dragging && (
            <div className="absolute inset-0 z-10 bg-sky-500/20 pointer-events-none" />
          )}
          {!file && (
            <div className="flex flex-col items-center pointer-events-none">
              <FilesIcon />
              <p>Drag and Drop your image here or click</p>
            </div>
          )}
          {file && (
            <div className="relative h-60 w-full aspect-square">
              <Image
                className="object-cover"
                src={URL.createObjectURL(file)}
                alt="local file"
                fill
                sizes="650px"
              />
            </div>
          )}
        </label>
        <textarea
          className={"outline-none text-lg border border-neutral-300"}
          name="text"
          id="input-text"
          required
          rows={10}
          placeholder={"Write a caption..."}
          ref={textRef}
        />
        <Button text={"publish"} onClick={() => {}} />
      </form>
    </section>
  );
};
