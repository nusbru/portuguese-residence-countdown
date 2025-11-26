import React from 'react';
import { Header, SetupCard, CountdownCard, InfoCard, useCountdown } from './presentation';
import './App.css';

/**
 * Main App component
 * Acts as the composition root, orchestrating all other components
 * Follows the Dependency Inversion Principle - depends on abstractions (hooks)
 */
function App() {
  const {
    countdownData,
    stats,
    status,
    isEditing,
    saveCountdown,
    editSettings,
  } = useCountdown();

  return (
    <div className="container">
      <Header />
      <main className="main-content">
        {isEditing ? (
          <SetupCard onSave={saveCountdown} initialData={countdownData} />
        ) : (
          <CountdownCard stats={stats} status={status} onEdit={editSettings} />
        )}
        <InfoCard />
      </main>
    </div>
  );
}

export default App;
