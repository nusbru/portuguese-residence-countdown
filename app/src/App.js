import React from 'react';
import { Header, SetupCard, CountdownCard, InfoCard, EmailTemplate, useCountdown } from './presentation';
import { isDeadlineExpired } from './domain';
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

  const showEmailTemplate = stats && isDeadlineExpired(stats.weekDaysLeft);

  return (
    <div className="container">
      <Header />
      <main className="main-content">
        {isEditing ? (
          <SetupCard onSave={saveCountdown} initialData={countdownData} />
        ) : (
          <CountdownCard stats={stats} status={status} onEdit={editSettings} />
        )}
        {showEmailTemplate && <EmailTemplate interviewDate={countdownData.interviewDate} />}
        <InfoCard />
      </main>
    </div>
  );
}

export default App;
