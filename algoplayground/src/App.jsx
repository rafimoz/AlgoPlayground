import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import BubbleSortVisualizer from "./pages/BubbleSortVisualizer";
import SelectionSortVisualizer from "./pages/SelectionSortVisualizer";
import InsertionSortVisualizer from "./pages/InsertionSortVisualizer";
import TwoSumVisualizer from "./pages/TwoSumVisualizer";

const problems = [
  { id: "bubble-sort", name: "Bubble Sort Visualizer", description: "Watch how Bubble Sort works step by step." },
  { id: "selection-sort", name: "Selection Sort Visualizer", description: "Watch how Selection Sort works step by step." },
  { id: "insertion-sort", name: "Insertion Sort Visualizer", description: "Watch how Insertion Sort works step by step." },
  { id: "two-sum", name: "Two Sum Finder", description: "Find pairs in an array that add up to a target." },
];

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-neutral-900 p-8 pt-4">
        <h1 className="text-5xl text-white font-bold mb-8 text-center">AlgoPlayground</h1>
        <Routes>
          <Route 
            path="/" 
            element={
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-[80vh]">
                {problems.map((p) => (
                  <Link key={p.id} to={`/${p.id}`} className="p-6 text-white bg-neutral-600 rounded-2xl shadow-md shadow-neutral-600 hover:bg-neutral-800 hover:shadow-xl transition cursor-pointer">
                    <h2 className="text-3xl font-bold">{p.name}</h2>
                    <p className=" mt-2">{p.description}</p>
                  </Link>
                ))}
              </div>
            }
          />
          <Route path="/bubble-sort" element={<BubbleSortVisualizer />} />
          <Route path="/selection-sort" element={<SelectionSortVisualizer />} />
          <Route path="/insertion-sort" element={<InsertionSortVisualizer />} />
          <Route path="/two-sum" element={<TwoSumVisualizer />} />
        </Routes>
      </div>
    </Router>
  );
}