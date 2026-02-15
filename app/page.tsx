'use client';
import React, { useState } from 'react';
import { Beaker, Thermometer, Zap, Layers, Activity } from 'lucide-react';

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
      // REPLACE the URL below with your actual Render link
      const res = await fetch('https://nano-backend-nh71.onrender.com/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setPrediction(data);
    } catch (err) {
      alert("Error connecting to AI Brain. Check if Render is awake!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8 font-sans">
      <header className="mb-12 border-b border-slate-700 pb-6">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
          Nanotech Properties Predictor v1.0
        </h1>
        <p className="text-slate-400 mt-2">AI-Powered Material Analysis Dashboard</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Input Form */}
        <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 shadow-xl">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Beaker className="text-blue-400" /> Material Parameters
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm text-slate-400 mb-1">Chemical Formula</label>
              <input 
                type="text" 
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 text-white focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.formula}
                onChange={(e) => setFormData({...formData, formula: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-400 mb-1">Crystal Structure</label>
                <select 
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 outline-none"
                  value={formData.crystal_structure}
                  onChange={(e) => setFormData({...formData, crystal_structure: e.target.value})}
                >
                  <option>Monoclinic</option><option>Cubic</option><option>Tetragonal</option><option>Hexagonal</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-slate-400 mb-1">Shape</label>
                <select 
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-3 outline-none"
                  value={formData.shape}
                  onChange={(e) => setFormData({...formData, shape: e.target.value})}
                >
                  <option>Nanosphere</option><option>Nanorod</option><option>Nanowire</option><option>Thin Film</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm text-slate-400 mb-1">Size (nm): {formData.size_nm}</label>
              <input 
                type="range" min="1" max="100" 
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-blue-500"
                value={formData.size_nm}
                onChange={(e) => setFormData({...formData, size_nm: parseFloat(e.target.value)})}
              />
            </div>
            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-900/20"
            >
              {loading ? 'AI Computing...' : 'Run Prediction Engine'}
            </button>
          </form>
        </div>

        {/* Results Panel */}
        <div className="space-y-6">
          <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700 h-full min-h-[400px] flex flex-col justify-center items-center relative overflow-hidden">
            {!prediction ? (
              <div className="text-center text-slate-500">
                <Activity size={64} className="mx-auto mb-4 opacity-20" />
                <p>Waiting for material input...</p>
              </div>
            ) : (
              <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <ResultCard icon={<Zap className="text-yellow-400" />} label="Bandgap" value={prediction.bandgap} />
                <ResultCard icon={<Layers className="text-emerald-400" />} label="Density" value={prediction.density} />
                <ResultCard icon={<Activity className="text-rose-400" />} label="Formation Energy" value={prediction.formation_energy} />
                <ResultCard icon={<Thermometer className="text-orange-400" />} label="Specific Heat" value={prediction.specific_heat} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ResultCard({ icon, label, value }: { icon: any, label: string, value: string }) {
  return (
    <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-700/50 backdrop-blur-sm">
      <div className="flex items-center gap-3 mb-2">
        {icon}
        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{label}</span>
      </div>
      <div className="text-2xl font-mono text-white">{value}</div>
    </div>
  );
}
