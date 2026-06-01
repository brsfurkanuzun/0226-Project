import { Link } from 'react-router-dom';
import { ArrowLeft, Box, GitBranch, Wind, Server, Bell, Layers } from 'lucide-react';

const stack = [
  { icon: <Box className="w-5 h-5" />, name: 'React + Vite', color: 'text-cyan-400' },
  { icon: <Layers className="w-5 h-5" />, name: 'Redux Toolkit', color: 'text-purple-400' },
  { icon: <GitBranch className="w-5 h-5" />, name: 'React Router v5', color: 'text-pink-400' },
  { icon: <Wind className="w-5 h-5" />, name: 'Tailwind CSS', color: 'text-sky-400' },
  { icon: <Server className="w-5 h-5" />, name: 'Axios', color: 'text-green-400' },
  { icon: <Bell className="w-5 h-5" />, name: 'React Toastify', color: 'text-yellow-400' },
];

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-lg w-full space-y-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-xl">
          <h2 className="text-3xl font-bold text-white mb-2">About this Project</h2>
          <p className="text-slate-400 mb-8">
            A modern React starter built with best-in-class tooling.
          </p>

          <ul className="space-y-4">
            {stack.map(({ icon, name, color }) => (
              <li key={name} className="flex items-center gap-3">
                <span className={color}>{icon}</span>
                <span className="text-white font-medium">{name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
