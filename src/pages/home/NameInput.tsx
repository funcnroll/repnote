import { JSX, useState } from "react";
import { changeName } from "../../app/homeSlice";
import { useDispatch } from "react-redux";
import Error from "../../components/reusable/Error";

function NameInput(): JSX.Element {
  const [input, setInput] = useState<string>("");
  const [error, setError] = useState<string>("");

  const dispatch = useDispatch();

  function handleSubmit(e: React.FormEvent<HTMLElement>) {
    e.preventDefault();

    if (input.trim().length < 2) {
      setError("Name must be at least 2 characters.");
      return;
    }

    setError("");
    dispatch(changeName(input.trim()));
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-64 flex flex-col gap-4"
    >
      <input
        type="text"
        placeholder="Your name"
        className="w-full px-4 py-3 rounded-xl bg-slate-700 text-white placeholder-gray-400"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setInput(e.target.value)
        }
        value={input}
      />

      {error && <Error msg={error} />}
    </form>
  );
}

export default NameInput;
