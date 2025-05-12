import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function TwoSumVisualizer() {
  const [array, setArray] = useState([2, 7, 11, 15]);
  const [newValue, setNewValue] = useState("");
  const [target, setTarget] = useState(9);
  const [result, setResult] = useState(null);
  const [iteration, setIteration] = useState(0);
  const navigate = useNavigate();

  const resetState = () => {
    setResult(null);
    setIteration(0);
  };

  const handleAddValue = () => {
    const num = parseInt(newValue, 10);
    if (!isNaN(num)) {
      setArray([...array, num]);
      setNewValue("");
      resetState();
    }
  };

  const handleValueChange = (index, value) => {
    const updated = [...array];
    updated[index] = parseInt(value, 10) || 0;
    setArray(updated);
    resetState();
  };

  const handleTargetChange = (value) => {
    setTarget(parseInt(value, 10) || 0);
    resetState();
  };

  const findTwoSum = () => {
    const map = {};
    for (let i = 0; i < array.length; i++) {
      setIteration(i + 1);
      const complement = target - array[i];
      if (map[complement] !== undefined) {
        setResult([map[complement], i]);
        return;
      }
      map[array[i]] = i;
    }
    setResult([]);
  };

  return (
    <div className="space-y-8 p-4 text-white">
      <button
        onClick={() => navigate("/")}
        className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
      >
        ← Back
      </button>

      <h2 className="text-2xl font-semibold">Two Sum</h2>

      <div className="flex items-center gap-4">
        <input
          type="number"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          className="border p-4 rounded-2xl w-45"
          placeholder="New number"
        />
        <button
          onClick={handleAddValue}
          className="bg-green-600 text-white p-4 rounded-2xl hover:bg-green-700 transition"
        >
          Add Value
        </button>
      </div>

      <div className="flex items-center gap-4">
        <label className="text-gray-400 font-medium">Target:</label>
        <input
          type="number"
          value={target}
          onChange={(e) => handleTargetChange(e.target.value)}
          className="border p-2 rounded-2xl w-32"
        />
      </div>

      <p className="text-gray-400">Iterations: {iteration}</p>

      <div className="flex gap-2 items-end">
        {array.map((num, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <input
              type="number"
              value={num}
              onChange={(e) => handleValueChange(idx, e.target.value)}
              className="mb-1 w-12 text-center border-[0.5px] border-gray-400 rounded"
            />
            <div
              className={`transition-all duration-300 ease-in-out w-12 text-white text-sm rounded-md p-3 text-center ${
                result && result.includes(idx)
                  ? "bg-blue-600 scale-110"
                  : "bg-blue-400"
              }`}
            >
              {num}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={findTwoSum}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
      >
        Find Pair
      </button>

      {result && (
        <p className="text-gray-800 font-medium">
          {result.length === 0
            ? "No pair found."
            : `Pair found at indices ${result[0]} and ${result[1]}`}
        </p>
      )}
    </div>
  );
}