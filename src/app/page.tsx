import { db } from "@/db";

export default async function Home() {
  const snippets = await db.snippet.findMany();

  const renderSnippets = snippets.map((snippet) => {
    return (
      <div key={snippet.id} className="m-3">
        <h1 className="font-bold">Title : {snippet.title}</h1>
        <p> code : {snippet.code}</p>
      </div>
    );
  });

  return <div>{renderSnippets}</div>;
}
