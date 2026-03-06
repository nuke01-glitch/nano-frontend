'use client';
import React, { useState } from 'react';
import { Beaker, Cpu, Zap, Layers, Activity, Thermometer, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function NanotechDashboard() {
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState<any>(null);
  const [formData, setFormData] = useState({
    formula: 'Ga2O3',
    crystal_structure: 'Monoclinic',
    material_class: 'Oxide',
    size_nm: 25.0,
    shape: 'Nanosphere'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('https://https://nano-backend-nh71.onrender.com/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setPrediction(data);
    } catch (err) {
      alert("Backend waking up! Try again in 30 seconds.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4 md:p-8 font-sans">
      <header className="mb-12">
        <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent tracking-tighter">
          NANOPREDICT AI
        </h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-white/5 p-8 rounded-3xl border border-white/10 backdrop-blur-xl">
          <h2 className="text-xl font-bold mb-6 flex items-center gap-2"><Beaker className="text-blue-400" /> Parameters</h2>
          <div className="space-y-6">
            <input className="w-full bg-black/40 border border-white/10 p-4 rounded-xl" value={formData.formula} onChange={(e) => setFormData({...formData, formula: e.target.value})} />
            <select className="w-full bg-black/40 p-4 rounded-xl" value={formData.crystal_structure} onChange={(e) => setFormData({...formData, crystal_structure: e.target.value})}>
              <option>Monoclinic</option><option>Cubic</option><option>Hexagonal</option>
            </select>
            <input type="range" className="w-full accent-blue-500" min="1" max="100" value={formData.size_nm} onChange={(e) => setFormData({...formData, size_nm: parseFloat(e.target.value)})} />
            <button disabled={loading} className="w-full bg-blue-600 py-4 rounded-xl font-bold uppercase tracking-widest hover:bg-blue-500 transition-all flex justify-center gap-2">
              {loading ? <><Loader2 className="animate-spin" /> Computing...</> : 'Synthesize Properties'}
            </button>
          </div>
        </form>

        {/* Result Area */}
        <AnimatePresence mode="wait">
          {prediction && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="grid grid-cols-2 gap-4">
              <ResultCard icon={<Zap className="text-yellow-400"/>} label="Bandgap" value={prediction.bandgap} />
              <ResultCard icon={<Layers className="text-emerald-400"/>} label="Density" value={prediction.density} />
              <ResultCard icon={<Activity className="text-rose-400"/>} label="Energy" value={prediction.formation_energy} />
              <ResultCard icon={<Thermometer className="text-orange-400"/>} label="Heat" value={prediction.specific_heat} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function ResultCard({ icon, label, value }: any) {
  return <div className="bg-white/5 p-6 rounded-2xl border border-white/10">
    <div className="mb-2">{icon}</div>
    <div className="text-xs uppercase tracking-widest text-slate-500">{label}</div>
    <div className="text-xl font-mono font-bold">{value}</div>
  </div>
}
