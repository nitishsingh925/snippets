"use client";
import React from "react";
import { useFormState } from "react-dom";
import * as actions from "@/actions";

const SnippetCreatePage = () => {
  const [formState, action] = useFormState(actions.createSnippet, {
    message: "",
  });
  return (
    <form action={action}>
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
        {/* 1st way */}

        {/* <div className="my-2 p-2 bg-red-200 border rounded border-red-400">{formState?.message}</div> */}

        {/* 2nd way */}

        {/* {formState.message ? (
          <div className="my-2 p-2 bg-red-200 border rounded border-red-400">
            {formState.message}
          </div>
        ) : null} */}

        {/* 3rd way */}

        {formState.message && (
          <div className="my-2 p-2 bg-red-200 border rounded border-red-400">
            {formState.message}
          </div>
        )}
        <button type="submit" className=" p-2 rounded bg-blue-200">
          Create
        </button>
      </div>
    </form>
  );
};

export default SnippetCreatePage;
