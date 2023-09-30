"use client";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";


const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className='mt-16 prompt_layout'>
      {/* {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))} */}
    </div>
  );
};

const Feed = () => {

  // Search states
  const [searchText, setSearchText] = useState("");

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce method
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  return (
    <section className='feed'>
      <form className='relative w-full flex-center'>
        <input
          type='text'
          placeholder='Search for a tag or a username' // search engine for tag and username
          value={searchText}
          onChange={handleSearchChange}
          required
          className='search_input peer'
        />
      </form>

      {/* List of prompt that matches the search  */}
      
      <PromptCardList data={[]} handleTagClick={()=>{}} />
    </section>
  );
};

export default Feed;
