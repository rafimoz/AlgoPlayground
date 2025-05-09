import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function BubbleSortVisualizer() {
  const [array, setArray] = useState([5, 3, 8, 4, 2]);
  const [newValue, setNewValue] = useState("");
  const [i, setI] = useState(0);
  const [j, setJ] = useState(0);
  const [swappedIndex, setSwappedIndex] = useState(null);
  const [iteration, setIteration] = useState(0);
  const [isSorted, setIsSorted] = useState(false);
  const navigate = useNavigate();

  const resetSortState = () => {
    setI(0);
    setJ(0);
    setSwappedIndex(null);
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

    let newArr = [...array];
    let newI = i;
    let newJ = j;
    let didSwap = false;

    setSwappedIndex(null);
    setIteration(prev => prev + 1);

    if (newI < newArr.length) {
      if (newJ < newArr.length - newI - 1) {
        if (newArr[newJ] > newArr[newJ + 1]) {
          [newArr[newJ], newArr[newJ + 1]] = [newArr[newJ + 1], newArr[newJ]];
          setSwappedIndex(newJ);
          didSwap = true;
        }
        setJ(newJ + 1);
      } else {
        setJ(0);
        setI(newI + 1);
        if (!didSwap && newI >= newArr.length - 1) setIsSorted(true);
      }
      setArray(newArr);
    } else {
      setIsSorted(true);
    }
  };

  return (
    <div className="space-y-6 p-4 text-white">
      <button
        onClick={() => navigate("/")}
        className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
      >
        ← Back
      </button>

      <h2 className="text-2xl font-semibold">Bubble Sort Visualizer</h2>

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

      <p className="text-emerald-200">Iteration: {iteration}</p>

      <div className="flex gap-2 items-end h-40">
        {array.map((num, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <input
              type="number"
              value={num}
              onChange={(e) => handleValueChange(idx, e.target.value)}
              className="mb-1 w-12 text-center border-[0.5px] border-neutral-400 text-neutral-400 rounded"
            />
            <div
              className={`transition-all duration-500 ease-in-out w-12 text-white text-sm rounded-md flex items-end justify-center ${
                isSorted
                  ? "bg-green-500"
                  : swappedIndex === idx || swappedIndex === idx - 1
                  ? "bg-red-500"
                  : "bg-blue-500"
              }`}
              style={{ height: `${num * 15}px` }}
            >
              {num}
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={nextStep}
        disabled={isSorted}
        className={`text-white p-4 rounded-2xl transition ${
          isSorted
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-600 hover:bg-blue-800"
        }`}
      >
        {isSorted ? "Sorted" : "Next Step"}
      </button>
    </div>
  );
}