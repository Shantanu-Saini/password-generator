import { useEffect, useState, useCallback, useRef } from "react";

function App() {

  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passGenerator = useCallback(() => {
    let pass = "";

    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "@#$&{}[]()";

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);

  }, [length, numAllowed, charAllowed, setPassword])

  useEffect(() => {
    passGenerator();
  }, [length, numAllowed, charAllowed, passGenerator])


  const passwordRef = useRef(null);
  const handleCopy = () => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password);
  }

  return (
    <>
      {/* Main container */}
      <div className="bg-violet-950 w-screen h-screen text-white flex flex-col items-center justify-center">
        {/* Title */}
        <h1 className="text-4xl mb-8 font-bold">Password Generator</h1>

        {/* Password generator settings container */}
        <div className="w-3/4 bg-white bg-opacity-30 py-10 px-9 rounded-lg shadow-lg">

          {/* Container for input and copy button */}
          <div className="flex items-center mb-4">
            {/* Generated password input */}
            <input type="text" className="flex-1 text-3xl bg-white border-2 border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-indigo-500 text-red-700" readOnly value={password} ref={passwordRef}/>

            {/* Copy button */}
            <button className="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-4 px-4 rounded focus:outline-none focus:shadow-outline" onClick={handleCopy}>
              Copy
            </button>
          </div>

          {/* Password length range input */}
          <div className="flex items-center mb-4 space-x-16">
            <input type="range" name="length" min={8} max={30} value={length} className="text-white w-1/4"
              onChange={(event) => {
                setLength(event.target.value)
              }} />

            <h2 className="text-xl mr-4">Length: {length}</h2>
          </div>

          {/* Checkbox for including numbers */}
          <div className="flex items-center mb-4">
            <input type="checkbox" name="Numbers" className="mr-2"
              defaultChecked={numAllowed}
              onChange={() => {
                setNumAllowed((prev) => !prev)
              }}
            />

            <label htmlFor="Numbers" className="text-lg">Include Numbers</label>
          </div>

          {/* Checkbox for including special characters */}
          <div className="flex items-center mb-4">
            <input type="checkbox" name="Characters" className="mr-2"
              defaultChecked={charAllowed}
              onChange={() => {
                setCharAllowed((prev) => !prev)
              }}
            />
            <label htmlFor="Characters" className="text-lg">Include Special Characters</label>
          </div>

        </div>
      </div>
    </>
  )
}

export default App;
