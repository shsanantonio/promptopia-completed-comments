"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";

const CreatePrompt = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [submitting, setIsSubmitting] = useState(false);
  const [post, setPost] = useState({ prompt: "", tag: "" });

  const createPrompt = async (e) => { 
    e.preventDefault(); //prevents the link from redirecting to a URL
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/prompt/new", {  //
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form
      type='Create'
      post={post} //{ prompt: "", tag: "" }
      setPost={setPost}
      submitting={submitting} //false
      handleSubmit={createPrompt}  //passes the function to be called when the user submits forms in Form component
    />
  );
};

export default CreatePrompt;
