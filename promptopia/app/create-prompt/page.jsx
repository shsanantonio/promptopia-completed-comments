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
    e.preventDefault(); //prevents the page from reloading and redirecting to url
    setIsSubmitting(true); //loader

    try {
      console.log(`session: ${session}`)
      const response = await fetch("/api/prompt/new", {  // calls api, passing data to api endpoint using POST request
        method: "POST",
        body: JSON.stringify({
          prompt: post.prompt,
          userId: session?.user.id,
          tag: post.tag,
        }),
      });

      if (response.ok) {
        router.push("/"); // goes to homepage if post is successfully created
      }
    } catch (error) {
      console.log(error);
    } finally { // hapens whether post is successfully created or not
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
