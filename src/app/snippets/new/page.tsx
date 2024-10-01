import { db } from "@/db";
import { redirect } from "next/navigation";
import React from "react";

const createSnippet = async (formData: FormData) => {
  // This need to be a server action!
  "use server";

  // Check the user's input and make sure they're valid.
  const title = formData.get("title") as string;
  const code = formData.get("code") as string;

  if (!title || !code) {
    console.error("Title and code are required.");
    return;
  }

  // Create a new record in the database.
  const snippet = await db.snippet.create({
    data: {
      title,
      code,
    },
  });
  redirect("/");
};

const SnippetCreatePage = () => {
  return (
    <form action={createSnippet}>
      <h3 className="font-bold m-3">Create a Snippet</h3>
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <label htmlFor="title" className="w-12">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            className="border rounded p-2 w-full"
          />
        </div>
        <div className="flex gap-4">
          <label htmlFor="code" className="w-12">
            Code
          </label>
          <textarea
            id="code"
            name="code"
            className="border rounded p-2 w-full"
            rows={10}
          />
        </div>
        <button type="submit" className=" p-2 rounded bg-blue-200">
          Create
        </button>
      </div>
    </form>
  );
};

export default SnippetCreatePage;
