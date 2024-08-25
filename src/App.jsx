import { useState, useCallback, useEffect, useRef } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [allowNumber, setAllowNumber] = useState(false);
  const [allowChar, setAllowChar] = useState(false);
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIGKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    if (allowNumber) str += '0123456789';
    if (allowChar) str += '@#!$%&*+-{}~`';

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(name + pass);
  }, [length, allowNumber, allowChar, name]);

  useEffect(() => {
    passwordGenerator();
  }, [length, allowNumber, allowChar, passwordGenerator]);

  // useRef hook
  const passwordRef = useRef(null);

  // copy password
  const copyPassword = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 99);
    window.navigator.clipboard.writeText(password);
  }, [password]);

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setName(newName);
  };

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-lg rounded-lg px-6 py-8 my-10 text-orange-500 bg-gray-800">
        <div className="shadow-md rounded-lg overflow-hidden mb-6 bg-gray-900">
          <h1 className="text-white text-center text-2xl font-semibold py-4">Password Generator</h1>
          <input
            type="text"
            className="outline-none py-2 px-4 bg-gray-700 text-white rounded-lg my-5 ml-24"
            placeholder="Enter your name"
            onChange={handleNameChange}
          />
          <div className="flex">
            <input
              type="text"
              value={password}
              className="outline-none py-2 px-4 bg-gray-700 text-white rounded-lg my-5 ml-24"
              placeholder="Generated Password"
              readOnly
              ref={passwordRef}
            />
            <button className="px-1 py-2 rounded-md" onClick={(e) => {
              copyPassword()
              e.target.style.color = "blue";
              setTimeout(() => {
                e.target.style.color = "";
              }, 1000);
              }}>
              Copy
            </button>
          </div>
        </div>

        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-2">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(Number(e.target.value));
              }}
            />
            <label htmlFor="">Length {length}</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              checked={allowNumber}
              id="numberInput"
              onChange={() => {
                setAllowNumber((prev) => !prev);
              }}
            />
            <label htmlFor="">Number</label>
          </div>

          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              checked={allowChar}
              id="charInput"
              onChange={() => {
                setAllowChar((prev) => !prev);
              }}
            />
            <label htmlFor="">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
