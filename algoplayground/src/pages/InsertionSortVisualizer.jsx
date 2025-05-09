import { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';

export default function InsertionSortVisualizer() {
  const [array, setArray] = useState([9, 5, 3, 4, 7]);
  const [newValue, setNewValue] = useState("");
  const [i, setI] = useState(1);
  const [j, setJ] = useState(-1);
  const [key, setKey] = useState(null);
  const [iteration, setIteration] = useState(0);
  const [isSorted, setIsSorted] = useState(false);
  const [isNewOuterLoop, setIsNewOuterLoop] = useState(true);
  const navigate = useNavigate();

  const arrayRef = useRef(array);
  useEffect(() => {
    arrayRef.current = array;
  }, [array]);

  const resetSortState = () => {
    setI(1);
    setJ(-1);
    setKey(null);
    setIteration(0);
    setIsSorted(false);
    setIsNewOuterLoop(true);
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

  useEffect(() => {
    if (i < arrayRef.current.length && !isSorted && isNewOuterLoop) {
      setKey(arrayRef.current[i]);
      setJ(i - 1);
      setIsNewOuterLoop(false);
    } else if (i >= arrayRef.current.length && !isSorted) {
      setIsSorted(true);
    }
  }, [i, isSorted, isNewOuterLoop, array.length]);

  const nextStep = () => {
    if (isSorted) return;

    setIteration(prev => prev + 1);
    let currentArr = [...arrayRef.current];

    if (j >= 0 && currentArr[j] > key) {
      currentArr[j + 1] = currentArr[j];
      setArray(currentArr);
      setJ(prevJ => prevJ - 1);
    } else {
      currentArr[j + 1] = key;
      setArray(currentArr);
      setI(prevI => prevI + 1);
      setIsNewOuterLoop(true);
      setKey(null);
    }
  };

  const getBarColor = (idx) => {
    if (isSorted) return "bg-green-500";
    if (idx === i) return "bg-yellow-500";
    if (j >= 0 && idx === j) return "bg-red-500";
    if (idx === j + 1) return "bg-blue-500";
    return "bg-purple-500";
  };

  return (
    <div className="space-y-6 p-4">
      <button
        onClick={() => navigate('/')}
        className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
      >
        ← Back
      </button>

      <h2 className="text-2xl font-semibold">Insertion Sort</h2>

      <div className="flex items-center gap-4">
        <input
          type="number"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)}
          className="border p-2 rounded w-32"
          placeholder="New number"
        />
        <button
          onClick={handleAddValue}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
        >
          Add Value
        </button>
      </div>

      <p className="text-gray-700">Iteration: {iteration}</p>
      <p className="text-gray-700">Current Key: {key !== null ? key : 'N/A'}</p>
      <p className="text-gray-700">i: {i}, j: {j}</p>

      <div className="flex gap-2 items-end h-40">
        {array.map((num, idx) => (
          <div key={idx} className="flex flex-col items-center">
            <input
              type="number"
              value={num}
              onChange={(e) => handleValueChange(idx, e.target.value)}
              className="mb-1 w-12 text-center border rounded"
            />
            <div
              className={`transition-all duration-500 ease-in-out w-12 text-white text-sm rounded-md flex items-end justify-center ${getBarColor(idx)}`}
              style={{ height: `${num * 6}px` }}
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
          : "bg-purple-600 hover:bg-purple-700"
        }`}
      >
        {isSorted ? "Sorted" : "Next Step"}
      </button>
    </div>
  );
}