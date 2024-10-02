"use server";

import { db } from "@/db";
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

  redirect(`/snippets/${id}`);
};

export const deleteSnippet = async (id: number) => {
  await db.snippet.delete({
    where: {
      id,
    },
  });

  redirect("/");
};
