"use server";

import { db } from "@/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

interface IEditeSnippetProps {
  id: number;
  code: string;
}
export const editSnippet = async ({ id, code }: IEditeSnippetProps) => {
  await db.snippet.update({
    where: {
      id,
    },
    data: {
      code,
    },
  });
  revalidatePath(`/snippets/${id}`);
  redirect(`/snippets/${id}`);
};

export const deleteSnippet = async (id: number) => {
  await db.snippet.delete({
    where: {
      id,
    },
  });
  revalidatePath("/");
  redirect("/");
};

export const createSnippet = async (
  formState: { message: string },
  formData: FormData
) => {
  try {
    const title = formData.get("title");
    const code = formData.get("code");
    if (typeof title !== "string" || title.length < 3) {
      return {
        message: "Title must be a string with length greater than 3",
      };
    }
    if (typeof code !== "string" || code.length < 10) {
      return {
        message: "Code must be a string with length greater than 10",
      };
    }
    // Create a new record in the database.
    const snippet = await db.snippet.create({
      data: {
        title,
        code,
      },
    });

    // throw new Error("Failed to create snippet");
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        message: error.message,
      };
    } else {
      return {
        message: "Oops! Something went wrong.",
      };
    }
  }
  revalidatePath("/");
  redirect("/");
};
