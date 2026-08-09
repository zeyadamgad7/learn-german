import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="flex flex-col w-full items-center">
      
      {/* 1. Hero Section */}
      <div className="hero bg-base-200 min-h-[50vh] w-full">
        <div className="hero-content text-center">
          <div className="max-w-xl">
            <h1 className="text-5xl font-bold text-primary">Meistere dein Deutsch</h1>
            <p className="py-6 text-base-content/80 text-lg">
              Elevate your language skills. Seamlessly translate texts, analyze complex grammar structures, and review your progress all in one unified platform.
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/analyze" className="btn btn-primary">Start Analyzing</Link>
              <Link to="/translate" className="btn btn-secondary btn-outline">Translate Now</Link>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Features Section */}
      <div className="w-full max-w-6xl px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-10 text-secondary">Core Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Analyze Card */}
          <div className="card bg-base-100 shadow-xl border border-base-200 hover:shadow-2xl transition-shadow">
            <div className="card-body items-center text-center">
              <h2 className="card-title text-primary">Grammar Analysis</h2>
              <p className="text-base-content/70">Break down complex sentences and understand the underlying grammar rules.</p>
              <div className="card-actions mt-4">
                <Link to="/analyze" className="btn btn-primary btn-sm">Analyze</Link>
              </div>
            </div>
          </div>

          {/* Translate Card */}
          <div className="card bg-base-100 shadow-xl border border-base-200 hover:shadow-2xl transition-shadow">
            <div className="card-body items-center text-center">
              <h2 className="card-title text-primary">Smart Translation</h2>
              <p className="text-base-content/70">Quickly translate words and phrases with context-aware accuracy.</p>
              <div className="card-actions mt-4">
                <Link to="/translate" className="btn btn-primary btn-sm">Translate</Link>
              </div>
            </div>
          </div>

          {/* Review Card */}
          <div className="card bg-base-100 shadow-xl border border-base-200 hover:shadow-2xl transition-shadow">
            <div className="card-body items-center text-center">
              <h2 className="card-title text-primary">Vocabulary Review</h2>
              <p className="text-base-content/70">Test your knowledge and retain what you've learned with active recall.</p>
              <div className="card-actions mt-4">
                <Link to="/review" className="btn btn-primary btn-sm">Review</Link>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}

export default Home;