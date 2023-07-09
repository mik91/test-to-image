import Image from 'next/image'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <header className='flex justify-between items-center mb-4'>
        <h1 className='text-4xl'>Text to image AI</h1>
      </header>
      <div>
        {/* <img src="https://www.w3schools.com/images/w3schools_green.jpg" alt="W3Schools.com"/> */}
        <div
  className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
  role="status">
  <span
    className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
    >Loading...</span>
</div>
      </div>
      <div>
        <form action="" method="get" className='flex gap-2 flex-col'>
          
          <label htmlFor="Prompt">Enter a prompt to transform to an Image:</label>
          <input type="text" name="prompt" id="prompt" placeholder='Enter a prompt...' />
          <div className='flex gap-1 justify-end'>
            <button type="reset" className='bg-slate-900 border border-slate-900 rounded px-7'>Reset</button>
            <button type="submit" className='bg-slate-900 border border-slate-900 rounded px-7'>Submit</button>
          </div>
        </form>
      </div>
    </main>
  )
}
