import React from "react";
import { BarChart, School, Database, Shield } from "lucide-react";

export default function LandingVisual() {
  return (
    <div className="relative lg:h-[600px] flex items-center justify-center animate-in slide-in-from-right-10 duration-1000 fade-in delay-200">
      <div className="relative w-full max-w-lg aspect-square">
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse-slow"></div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-96 bg-slate-800/80 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl flex flex-col p-6 rotate-[-6deg] hover:rotate-0 transition-all duration-700 z-20 group">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center text-orange-400">
              <BarChart className="w-6 h-6" />
            </div>
            <div>
              <div className="h-2 w-24 bg-white/20 rounded-full mb-2"></div>
              <div className="h-2 w-16 bg-white/10 rounded-full"></div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="h-24 w-full bg-gradient-to-br from-white/5 to-transparent rounded-xl border border-white/5"></div>
            <div className="h-2 w-full bg-white/10 rounded-full"></div>
            <div className="h-2 w-2/3 bg-white/10 rounded-full"></div>
          </div>
        </div>

        <div className="absolute top-1/2 left-1/2 -translate-x-1/3 -translate-y-2/3 w-72 h-80 bg-slate-800/80 backdrop-blur-xl border border-white/10 rounded-3xl shadow-xl flex flex-col p-6 rotate-[12deg] hover:rotate-[6deg] transition-all duration-700 z-10 animate-float">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400">
              <School className="w-5 h-5" />
            </div>
          </div>
          <div className="flex-1 bg-white/5 rounded-xl border border-white/5"></div>
        </div>

        <div className="absolute -top-10 -right-10 w-20 h-20 bg-slate-800/90 backdrop-blur-md rounded-2xl border border-white/10 flex items-center justify-center shadow-xl animate-bounce delay-700 z-30">
          <Database className="w-8 h-8 text-blue-400" />
        </div>
        <div className="absolute -bottom-10 -left-4 w-16 h-16 bg-slate-800/90 backdrop-blur-md rounded-2xl border border-white/10 flex items-center justify-center shadow-xl animate-bounce delay-100 z-30">
          <Shield className="w-6 h-6 text-indigo-400" />
        </div>
      </div>
    </div>
  );
}
