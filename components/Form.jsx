import Link from "next/link";

const Form = ({ type, post, setPost, submitting, handleSubmit }) => {
  return (
    <section className='w-full max-w-full flex-start flex-col'> {/* full width of container */}
      <h1 className='head_text text-left'>
        <span className='blue_gradient'>{type} Post</span> {/* this is going to be the heading, type is "create" as passed from createPrompt component */}
      </h1>
      <p className='desc text-left max-w-md'>
        {type} and share amazing prompts with the world, and let your
        imagination run wild with any AI-powered platform
      </p>

      <form
        onSubmit={handleSubmit} //when a form is submitted, it will call async createPrompt function inside CreatePrompt component
        className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism' // margin top 10, full width
      >
        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Your AI Prompt
          </span>

          <textarea
            value={post.prompt} //post.prompt is initially empty from { prompt: "", tag: "" }

            // the textarea field when typed in, passes its current value to the setPost hook and stores the value to hook but not saved in db yet
            onChange={(e) => setPost({ ...post, prompt: e.target.value })} //updates post, the post.prompt = typed in text on form, spread operator (...) enumerates the properties of an object
            placeholder='Write your post here'
            required
            className='form_textarea '
          />
        </label>

        <label>
          <span className='font-satoshi font-semibold text-base text-gray-700'>
            Field of Prompt{" "}
            <span className='font-normal'>
              (#product, #webdevelopment, #idea, etc.)
            </span>
          </span>
          <input
            value={post.tag}
            // the textarea field when typed in, passes its current value to the setPost hook and stores the value to hook but not saved in db yet
            onChange={(e) => setPost({ ...post, tag: e.target.value })} //post.tag = typed in text on form, spread operator (...) enumerates the properties of an object
            type='text'
            placeholder='#Tag'
            required
            className='form_input'
          />
        </label>

        <div className='flex-end mx-3 mb-5 gap-4'>
          <Link href='/' className='text-gray-500 text-sm'>
            Cancel {/* cancel button to go back to homepage with href '/' */}
          </Link>

          <button
            type='submit'
            disabled={submitting} // if we're currently submitting, it has to be disabled so user can't click the button again and mess with the request
            className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
          >
            {submitting ? `${type}ing...` : type} {/* the button itself is checking if we're submitting */}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;
