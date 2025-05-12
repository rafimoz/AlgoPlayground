import { useState } from "react";
import { useNavigate } from 'react-router-dom';

export default function SelectionSortVisualizer() {
  const [array, setArray] = useState([29, 10, 14, 37, 13]);
  const [newValue, setNewValue] = useState("");
  const [i, setI] = useState(0);
  const [j, setJ] = useState(1);
  const [minIdx, setMinIdx] = useState(0);
  const [iteration, setIteration] = useState(0);
  const [isSorted, setIsSorted] = useState(false);
  const navigate = useNavigate();

  const resetSortState = () => {
    setI(0);
    setJ(1);
    setMinIdx(0);
    setIteration(0);
    setIsSorted(false);
  };

  const handleAddValue = () => {
    const num = parseInt(newValue, 10);
    if (!isNaN(num)) {
      setArray([...array, num]);
      setNewValue("");
      resetSortState();
    }
  };

  const handleValueChange = (index, value) => {
    const newArr = [...array];
    newArr[index] = parseInt(value, 10) || 0;
    setArray(newArr);
    resetSortState();
  };

  const nextStep = () => {
    if (isSorted) return;
    setIteration(prev => prev + 1);
    let arr = [...array];

    if (i < arr.length - 1) {
      if (j < arr.length) {
        if (arr[j] < arr[minIdx]) {
          setMinIdx(j);
        }
        setJ(j + 1);
      } else {
        if (minIdx !== i) {
          [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
        }
        setI(i + 1);
        setJ(i + 2);
        setMinIdx(i + 1);
      }
      setArray(arr);
    } else {
      setIsSorted(true);
    }
  };

  return (
    <div className="space-y-8 p-4 text-white">
      <button
        onClick={() => navigate('/')}
        className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
      >
        ← Back
      </button>

      <h2 className="text-2xl font-semibold">Selection Sort</h2>

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

      <p className="text-gray-400">Iteration: {iteration}</p>

      <div className="flex gap-2 items-end">
        {array.map((num, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <input
              type="number"
              value={num}
              onChange={(e) => handleValueChange(idx, e.target.value)}
              className="mb-1 w-12 text-center border-[0.5px] border-neutral-400 rounded"
            />
            <div
              className={`transition-all duration-500 ease-in-out w-12 text-white text-sm rounded-md flex items-end justify-center ${isSorted
                ? "bg-green-500"
                : idx === minIdx
                  ? "bg-red-500"
                  : "bg-yellow-500"
                }`}
              style={{ height: `${num * 5}px` }}
            >
              {num}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={nextStep}
        disabled={isSorted}
        className={`text-white px-4 py-2 rounded transition ${isSorted
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-yellow-600 hover:bg-yellow-700"
          }`}
      >
        {isSorted ? "Sorted" : "Next Step"}
      </button>
    </div>
  );
}