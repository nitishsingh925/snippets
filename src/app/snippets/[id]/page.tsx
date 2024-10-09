import { db } from "@/db";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";
import * as actions from "@/actions";

interface ISnippetShowPageProps {
  params: {
    id: string;
  };
}

const SnippetShowPage = async (props: ISnippetShowPageProps) => {
  // This show only take some time to show loding data
  await new Promise((resolve) => setTimeout(resolve, 1000));
  //   find the snippet by id
  const snippet = await db.snippet.findFirst({
    where: {
      id: parseInt(props.params.id, 10),
    },
  });

  if (!snippet) {
    return notFound();
  }

  const deleteSnippetAction = actions.deleteSnippet.bind(null, snippet.id);
  return (
    <div>
      <div className="flex m-4 justify-between items-center">
        <h1 className="text-xl font-bold">{snippet?.title}</h1>
        <div className="flex gap-2">
          <Link
            href={`/snippets/${snippet.id}/edit`}
            className="p-2 border rounded"
          >
            Edit
          </Link>

          <form action={deleteSnippetAction}>
            <button className="p-2 border rounded">Delete</button>
          </form>
        </div>
      </div>
      <pre className="p-3 border rounded bg-gray-200 border-gray-200">
        <code>{snippet.code}</code>
      </pre>
    </div>
  );
};

export const generateStaticParams = async () => {
  const snippets = await db.snippet.findMany();

  return snippets.map((snippet) => {
    id: snippet.id.toString();
  });
};

export default SnippetShowPage;
