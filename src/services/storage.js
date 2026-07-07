const SESSIONS_KEY = "sessions";

export function loadSessions() {
  const saved = localStorage.getItem(SESSIONS_KEY);
  return saved ? JSON.parse(saved) : [];
}

export function saveSession(session) {
  const sessions = loadSessions();

  const newSession = {
    ...session,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
  };

  localStorage.setItem(SESSIONS_KEY, JSON.stringify([...sessions, newSession]));
  return newSession;
}

export function deleteSession(sessionId) {
  const sessions = loadSessions();
  const updated = sessions.filter((session) => session.id !== sessionId);
  localStorage.setItem(SESSIONS_KEY, JSON.stringify(updated));
  return updated;
}

export function getLastExercisePerformance(exerciseName, excludeSessionId = null) {
  const sessions = loadSessions()
    .filter((session) => session.id !== excludeSessionId)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  for (const session of sessions) {
    const exercise = session.exercises.find((ex) => ex.name === exerciseName);

    if (exercise) {
      return {
        date: session.date,
        workoutTitle: session.workoutTitle,
        sets: exercise.sets,
      };
    }
  }

  return null;
}

export function exportAllData() {
  return {
    sessions: loadSessions(),
    workouts: JSON.parse(localStorage.getItem("workouts") || "{}"),
    exportedAt: new Date().toISOString(),
  };
}

export function importAllData(data) {
  if (!data || typeof data !== "object") {
    throw new Error("Ungültige Datei");
  }

  if (Array.isArray(data.sessions)) {
    localStorage.setItem(SESSIONS_KEY, JSON.stringify(data.sessions));
  }

  if (data.workouts && typeof data.workouts === "object") {
    localStorage.setItem("workouts", JSON.stringify(data.workouts));
  }
}