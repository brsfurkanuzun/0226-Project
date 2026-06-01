import { useDispatch, useSelector } from 'react-redux';
import { increment, decrement, reset } from '../store/slices/counterSlice';
import { Plus, Minus, RotateCcw, Zap } from 'lucide-react';
import { toast } from 'react-toastify';

export default function Home() {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter.value);

  const handleIncrement = () => {
    dispatch(increment());
    toast.success('Incremented!', { autoClose: 1000 });
  };

  const handleDecrement = () => {
    dispatch(decrement());
    toast.info('Decremented!', { autoClose: 1000 });
  };

  const handleReset = () => {
    dispatch(reset());
    toast.warning('Counter reset!', { autoClose: 1000 });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="text-center space-y-8">
        <div className="flex items-center justify-center gap-3 mb-4">
          <Zap className="w-10 h-10 text-purple-400" />
          <h1 className="text-5xl font-bold text-white">Redux Counter</h1>
        </div>

        <p className="text-slate-400 text-lg">
          Powered by Redux Toolkit + React Router v5
        </p>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-10 border border-white/20 shadow-xl">
          <span className="text-8xl font-bold text-white tabular-nums">{count}</span>
        </div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={handleDecrement}
            className="flex items-center gap-2 px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-red-500/30 hover:-translate-y-0.5"
          >
            <Minus className="w-5 h-5" />
            Decrement
          </button>

          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-6 py-3 bg-slate-600 hover:bg-slate-500 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg hover:-translate-y-0.5"
          >
            <RotateCcw className="w-5 h-5" />
            Reset
          </button>

          <button
            onClick={handleIncrement}
            className="flex items-center gap-2 px-6 py-3 bg-purple-500 hover:bg-purple-600 text-white rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-purple-500/30 hover:-translate-y-0.5"
          >
            <Plus className="w-5 h-5" />
            Increment
          </button>
        </div>
      </div>
    </div>
  );
}
