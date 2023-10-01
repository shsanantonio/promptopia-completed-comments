"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const PromptCard = ({ post, handleEdit, handleDelete, handleTagClick }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const [copied, setCopied] = useState("");

  const handleProfileClick = () => {
    console.log(post);

    if (post.creator._id === session?.user.id) return router.push("/profile");// will redirect to own' profile page if clicked owns's username

    router.push(`/profile/${post.creator._id}?name=${post.creator.username}`); // will redirect to the clicked username's profile page 
  };

  const handleCopy = () => {
    setCopied(post.prompt); // copies prompt
    navigator.clipboard.writeText(post.prompt); // allows user to paste to any text field or text file
    setTimeout(() => setCopied(false), 3000); // resets copy state back to copy.svg in 3 seconds
  };

  return (
    <div className='prompt_card'>
      <div className='flex justify-between items-start gap-5'>
        <div /* covers the whole span of profile image, username and email that allows user to redirect to creator's profile page */
          className='flex-1 flex justify-start items-center gap-3 cursor-pointer'
          onClick={handleProfileClick} // will redirect to the prompt's creator's profile page
        >
          <Image // displays user image
            src={post.creator.image}
            alt='user_image'
            width={40}
            height={40}
            className='rounded-full object-contain'
          />

          <div className='flex flex-col'>
            <h3 className='font-satoshi font-semibold text-gray-900'>
              {post.creator.username} {/* displays user's username */}
            </h3>
            <p className='font-inter text-sm text-gray-500'>
              {post.creator.email} {/* displays user email  */}
            </p>
          </div>
        </div>

        <div className='copy_btn' onClick={handleCopy}>
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg" // will change the icon svg to check if prompt is already copied
                : "/assets/icons/copy.svg" // initial icon svg if prompt not yet copied
            }
            alt={copied === post.prompt ? "tick_icon" : "copy_icon"}
            width={12}
            height={12}
          />
        </div>
      </div>

      <p className='my-4 font-satoshi text-sm text-gray-700'>{post.prompt}</p>
      <p
        className='font-inter text-sm blue_gradient cursor-pointer'
        onClick={() => handleTagClick && handleTagClick(post.tag)} /* will filter/search prompts that start with the clicked tag(#) name */
      >
        #{post.tag} {/* clickable tag  */}
      </p>

      {session?.user.id === post.creator._id && pathName === "/profile" && (
        <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
          <p
            className='font-inter text-sm green_gradient cursor-pointer'
            onClick={handleEdit}
          >
            Edit {/* shows edit button if the user created the prompt */}
          </p>
          <p
            className='font-inter text-sm orange_gradient cursor-pointer'
            onClick={handleDelete}
          >
            Delete {/* shows delete button if the user created the prompt */}
          </p>
        </div>
      )}
    </div>
  );
};

export default PromptCard;
