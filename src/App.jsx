import { useEffect, useState } from "react";
import "./App.css";
import { defaultWorkouts } from "./data/workouts";
import {
  saveSession,
  loadSessions,
  deleteSession,
  getLastExercisePerformance,
  exportAllData,
  importAllData,
} from "./services/storage";

const tabs = [
  { id: "dashboard", label: "Dashboard", icon: "🏠" },
  { id: "training", label: "Training", icon: "💪" },
  { id: "calendar", label: "Kalender", icon: "📅" },
  { id: "stats", label: "Statistik", icon: "📈" },
  { id: "settings", label: "Einstellungen", icon: "⚙️" },
];

function loadWorkouts() {
  const saved = localStorage.getItem("workouts");
  return saved ? JSON.parse(saved) : defaultWorkouts;
}

function App() {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [selectedWorkout, setSelectedWorkout] = useState(null);
  const [workouts, setWorkouts] = useState(loadWorkouts);

  useEffect(() => {
    localStorage.setItem("workouts", JSON.stringify(workouts));
  }, [workouts]);

  function startWorkout() {
    setSelectedWorkout(null);
    setActiveTab("training");
  }

  return (
    <div className="app">
      <header className="header">
        <div>
          <p className="eyebrow">Calisthenics & Gym</p>
          <h1>Training Tracker</h1>
        </div>
        <div className="profileCircle">RS</div>
      </header>

      <main className="content">
        {activeTab === "dashboard" && <Dashboard onStartWorkout={startWorkout} />}
        {activeTab === "training" && (
          <Training
            workouts={workouts}
            selectedWorkout={selectedWorkout}
            setSelectedWorkout={setSelectedWorkout}
          />
        )}
        {activeTab === "calendar" && <Calendar />}
        {activeTab === "stats" && <Stats />}
        {activeTab === "settings" && (
          <Settings workouts={workouts} setWorkouts={setWorkouts} />
        )}
      </main>

      <nav className="bottomNav">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={activeTab === tab.id ? "navItem active" : "navItem"}
            onClick={() => setActiveTab(tab.id)}
          >
            <span>{tab.icon}</span>
            <small>{tab.label}</small>
          </button>
        ))}
      </nav>
    </div>
  );
}

function Dashboard({ onStartWorkout }) {
  const sessions = loadSessions();

  const lastNonCoreSession = [...sessions]
    .reverse()
    .find((session) => session.workoutKey !== "core-hell");

  return (
    <section className="pageFade">
      <div className="dashboardHero">
        <p className="eyebrow">Heute</p>
        <h2>Bereit fürs Training?</h2>
        <p className="muted">Wähle deine Einheit und tracke Satz für Satz.</p>

        <button className="primaryButton" onClick={onStartWorkout}>
          Training starten
        </button>
      </div>

      <div className="card">
        <p className="muted">Letztes Workout</p>

        {lastNonCoreSession ? (
          <>
            <h3>{lastNonCoreSession.workoutTitle}</h3>
            <p>
              {new Date(lastNonCoreSession.date).toLocaleDateString("de-DE")}
            </p>
          </>
        ) : (
          <>
            <h3>Noch kein Training gespeichert</h3>
            <p>Starte dein erstes Workout.</p>
          </>
        )}
      </div>
    </section>
  );
}

function Training({ workouts, selectedWorkout, setSelectedWorkout }) {
  const workout = selectedWorkout ? workouts[selectedWorkout] : null;
  const [randomCoreIndex, setRandomCoreIndex] = useState(null);
  const [sessionData, setSessionData] = useState({});
  const [notes, setNotes] = useState("");

  function formatSets(sets) {
    return sets
      .filter((set) => set.kg || set.reps || set.sec)
      .map((set, index) => {
        const parts = [];
        if (set.kg) parts.push(`${set.kg} kg`);
        if (set.reps) parts.push(`${set.reps} Wdh`);
        if (set.sec) parts.push(`${set.sec} Sek`);
        return `S${index + 1}: ${parts.join(" / ")}`;
      })
      .join(" · ");
  }

  function drawRandomCoreWorkout() {
    if (!workout?.exercises?.length) return;

    let nextIndex = Math.floor(Math.random() * workout.exercises.length);

    if (workout.exercises.length > 1) {
      while (nextIndex === randomCoreIndex) {
        nextIndex = Math.floor(Math.random() * workout.exercises.length);
      }
    }

    setRandomCoreIndex(nextIndex);
    setSessionData({});
  }

  function updateSet(exerciseName, setIndex, field, value) {
    setSessionData((prev) => ({
      ...prev,
      [exerciseName]: {
        ...(prev[exerciseName] || {}),
        [setIndex]: {
          ...(prev[exerciseName]?.[setIndex] || {}),
          [field]: value,
        },
      },
    }));
  }

  function handleSaveSession() {
    if (!workout) return;

    const isCoreHell = workout.type === "random-core";

    const exercisesToSave =
      isCoreHell && randomCoreIndex !== null
        ? [workout.exercises[randomCoreIndex]]
        : workout.exercises;

    const session = {
      date: new Date().toISOString(),
      workoutKey: selectedWorkout,
      workoutTitle: isCoreHell
        ? workout.exercises[randomCoreIndex].name
        : workout.title,
      workoutBaseTitle: workout.title,
      notes,
      exercises: exercisesToSave.map((exercise) => ({
        name: exercise.name,
        target: exercise.target,
        category: exercise.category || "",
        difficulty: exercise.difficulty || "",
        sets: [0, 1, 2, 3, 4].map((setIndex) => ({
          kg: sessionData[exercise.name]?.[setIndex]?.kg || "",
          reps: sessionData[exercise.name]?.[setIndex]?.reps || "",
          sec: sessionData[exercise.name]?.[setIndex]?.sec || "",
        })),
      })),
    };

    saveSession(session);

    alert("Training gespeichert.");
    setSelectedWorkout(null);
    setRandomCoreIndex(null);
    setSessionData({});
    setNotes("");
  }

  if (!workout) {
    return (
      <section className="pageFade">
        <h2>Training</h2>
        <div className="card">
          <p className="muted">Welches Training machst du heute?</p>

          <div className="workoutList">
            {Object.entries(workouts).map(([key, item]) => (
              <button key={key} onClick={() => setSelectedWorkout(key)}>
                <strong>{item.title}</strong>
                <span>{item.subtitle}</span>
              </button>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const isCoreHell = workout.type === "random-core";

  const exercisesToShow =
    isCoreHell && randomCoreIndex !== null
      ? [workout.exercises[randomCoreIndex]]
      : isCoreHell
      ? []
      : workout.exercises;

  return (
    <section className="pageFade">
      <button
        className="backButton"
        onClick={() => {
          setSelectedWorkout(null);
          setRandomCoreIndex(null);
          setSessionData({});
          setNotes("");
        }}
      >
        ← anderes Training wählen
      </button>

      <h2>{workout.title}</h2>
      <p className="muted">{workout.subtitle}</p>

      {isCoreHell && randomCoreIndex === null && (
        <div className="card coreHellCard">
          <p className="eyebrow">Zufallsmodus</p>
          <h3>Bereit für Core Hölle?</h3>
          <p className="muted">
            Es wird zufällig eines von 30 Core-Workouts ausgewählt.
          </p>

          <button className="primaryButton" onClick={drawRandomCoreWorkout}>
            🎲 Core Hölle starten
          </button>
        </div>
      )}

      {isCoreHell && randomCoreIndex !== null && (
        <div className="card coreHellCard">
          <p className="eyebrow">Dein heutiges Workout</p>
          <h3>{workout.exercises[randomCoreIndex].name}</h3>
          <p className="muted">
            Kategorie: {workout.exercises[randomCoreIndex].category} ·
            Schwierigkeit: {workout.exercises[randomCoreIndex].difficulty}
          </p>

          <button className="secondaryButton" onClick={drawRandomCoreWorkout}>
            🔄 anderes zufälliges Workout
          </button>
        </div>
      )}

      {exercisesToShow.map((exercise) => {
        const lastPerformance = getLastExercisePerformance(exercise.name);

        return (
          <div className="card exerciseCard" key={exercise.name}>
            <div>
              <p className="muted">Ziel: {exercise.target}</p>
              <h3>{exercise.name}</h3>

              {lastPerformance && formatSets(lastPerformance.sets) && (
                <div className="lastPerformance">
                  <p>Letztes Mal</p>
                  <span>
                    {new Date(lastPerformance.date).toLocaleDateString(
                      "de-DE"
                    )}{" "}
                    · {lastPerformance.workoutTitle}
                  </span>
                  <strong>{formatSets(lastPerformance.sets)}</strong>
                </div>
              )}
            </div>

            <div className="setGrid">
              {[0, 1, 2, 3, 4].map((setIndex) => (
                <div className="setBox" key={setIndex}>
                  <span>Satz {setIndex + 1}</span>

                  {exercise.fields.includes("kg") && (
                    <input
                      type="number"
                      placeholder="kg"
                      value={sessionData[exercise.name]?.[setIndex]?.kg || ""}
                      onChange={(e) =>
                        updateSet(
                          exercise.name,
                          setIndex,
                          "kg",
                          e.target.value
                        )
                      }
                    />
                  )}

                  {exercise.fields.includes("reps") && (
                    <input
                      type="number"
                      placeholder="Wdh"
                      value={
                        sessionData[exercise.name]?.[setIndex]?.reps || ""
                      }
                      onChange={(e) =>
                        updateSet(
                          exercise.name,
                          setIndex,
                          "reps",
                          e.target.value
                        )
                      }
                    />
                  )}

                  {exercise.fields.includes("sec") && (
                    <input
                      type="number"
                      placeholder="Sek"
                      value={sessionData[exercise.name]?.[setIndex]?.sec || ""}
                      onChange={(e) =>
                        updateSet(
                          exercise.name,
                          setIndex,
                          "sec",
                          e.target.value
                        )
                      }
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}

      {exercisesToShow.length > 0 && (
        <>
          <div className="card">
            <p className="muted">Notizen</p>
            <textarea
              className="notesInput"
              placeholder="z.B. Schulter gut, letzter Satz schwer..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <button className="primaryButton" onClick={handleSaveSession}>
            Training speichern
          </button>
        </>
      )}
    </section>
  );
}

function Calendar() {
  const [monthDate, setMonthDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [sessions, setSessions] = useState(loadSessions());

  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const offset = (firstDay.getDay() + 6) % 7;

  function getDateString(day) {
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  }

  function getSessionsForDate(dateString) {
    return sessions.filter((session) => session.date.slice(0, 10) === dateString);
  }

  function handleDelete(sessionId) {
    if (!confirm("Training wirklich löschen?")) return;
    const updated = deleteSession(sessionId);
    setSessions(updated);
  }

  return (
    <section className="pageFade">
      <div className="calendarHeader">
        <div>
          <p className="eyebrow">Historie</p>
          <h2>
            {monthDate.toLocaleDateString("de-DE", {
              month: "long",
              year: "numeric",
            })}
          </h2>
        </div>

        <div className="monthButtons">
          <button
            className="secondaryButton smallButton"
            onClick={() => setMonthDate(new Date(year, month - 1, 1))}
          >
            ←
          </button>
          <button
            className="secondaryButton smallButton"
            onClick={() => setMonthDate(new Date(year, month + 1, 1))}
          >
            →
          </button>
        </div>
      </div>

      <div className="calendarGrid">
        {["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"].map((day) => (
          <div className="weekday" key={day}>
            {day}
          </div>
        ))}

        {Array.from({ length: offset }).map((_, index) => (
          <div className="calendarDay emptyDay" key={`empty-${index}`} />
        ))}

        {Array.from({ length: lastDay.getDate() }).map((_, index) => {
          const day = index + 1;
          const dateString = getDateString(day);
          const daySessions = getSessionsForDate(dateString);
          const isSelected = selectedDate === dateString;

          return (
            <button
              key={dateString}
              className={
                daySessions.length > 0
                  ? isSelected
                    ? "calendarDay hasSession selectedDay"
                    : "calendarDay hasSession"
                  : isSelected
                  ? "calendarDay selectedDay"
                  : "calendarDay"
              }
              onClick={() => setSelectedDate(dateString)}
            >
              <span>{day}</span>
              {daySessions.length > 0 && <small>{daySessions.length}</small>}
            </button>
          );
        })}
      </div>

      <div className="sessionList">
        {selectedDate ? (
          <>
            <h3>{new Date(selectedDate).toLocaleDateString("de-DE")}</h3>

            {getSessionsForDate(selectedDate).length > 0 ? (
              getSessionsForDate(selectedDate).map((session) => (
                <div className="card" key={session.id}>
                  <p className="muted">{session.workoutBaseTitle}</p>
                  <h3>{session.workoutTitle}</h3>

                  {session.notes && <p>{session.notes}</p>}

                  <div className="sessionExercises">
                    {session.exercises.map((exercise) => (
                      <div className="sessionExercise" key={exercise.name}>
                        <strong>{exercise.name}</strong>
                        <span>
                          {exercise.sets
                            .filter((set) => set.kg || set.reps || set.sec)
                            .map((set, index) => {
                              const parts = [];
                              if (set.kg) parts.push(`${set.kg} kg`);
                              if (set.reps) parts.push(`${set.reps} Wdh`);
                              if (set.sec) parts.push(`${set.sec} Sek`);

                              return `S${index + 1}: ${parts.join(" / ")}`;
                            })
                            .join(" · ")}
                        </span>
                      </div>
                    ))}
                  </div>

                  <button
                    className="dangerButton"
                    onClick={() => handleDelete(session.id)}
                  >
                    Training löschen
                  </button>
                </div>
              ))
            ) : (
              <div className="card">
                <p className="muted">Kein Training an diesem Tag.</p>
              </div>
            )}
          </>
        ) : (
          <div className="card">
            <p className="muted">Wähle einen Tag im Kalender aus.</p>
          </div>
        )}
      </div>
    </section>
  );
}

function Stats() {
  const sessions = loadSessions();

  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - ((now.getDay() + 6) % 7));
  startOfWeek.setHours(0, 0, 0, 0);

  const sessionsThisWeek = sessions.filter(
    (session) => new Date(session.date) >= startOfWeek
  );



  const pullupSessions = sessions
    .map((session) => {
      const exercise = session.exercises.find(
        (e) => e.name.toLowerCase() === "klimmzüge"
      );

      if (!exercise) return null;

      return {
        date: session.date,
        workout: session.workoutTitle,
        sets: exercise.sets,
        totalReps: exercise.sets.reduce(
          (sum, set) => sum + Number(set.reps || 0),
          0
        ),
      };
    })
    .filter(Boolean);

  const lastPullup =
    pullupSessions.length > 0
      ? pullupSessions[pullupSessions.length - 1]
      : null;

  const bestPullup =
    pullupSessions.length > 0
      ? [...pullupSessions].sort((a, b) => b.totalReps - a.totalReps)[0]
      : null;

  function formatSets(sets) {
    return sets
      .filter((set) => set.reps)
      .map((set) => set.reps)
      .join(" | ");
  }

  return (
    <section className="pageFade">
      <p className="eyebrow">Übersicht</p>
      <h2>Statistik</h2>

      <div className="grid">
        <div className="card">
          <p className="muted">Trainings gesamt</p>
          <h3>{sessions.length}</h3>
        </div>

        <div className="card">
          <p className="muted">Diese Woche</p>
          <h3>{sessionsThisWeek.length}</h3>
        </div>

      </div>

      <div className="card">
        <p className="muted">Klimmzüge</p>

        {lastPullup ? (
          <>
            <div className="pullupStat">
              <span>Letztes Ergebnis</span>

              <strong>{formatSets(lastPullup.sets)}</strong>

              <small>
                {new Date(lastPullup.date).toLocaleDateString("de-DE")}
              </small>
            </div>

            <div className="pullupStat">
              <span>Bestes Ergebnis</span>

              <strong>{formatSets(bestPullup.sets)}</strong>

              <small>
                {bestPullup.totalReps} Wiederholungen gesamt
              </small>
            </div>
          </>
        ) : (
          <p>Noch keine Klimmzüge gespeichert.</p>
        )}
      </div>

      <div className="card">
        <p className="muted">Letzte Trainings</p>

        {[...sessions]
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 5)
          .map((session) => (
            <div className="statRow" key={session.id}>
              <strong>{session.workoutTitle}</strong>

              <span>
                {new Date(session.date).toLocaleDateString("de-DE")}
              </span>
            </div>
          ))}
      </div>
    </section>
  );
}

function Settings({ workouts, setWorkouts }) {
  const [editingKey, setEditingKey] = useState(null);

  function createWorkout() {
    const key = `custom-${Date.now()}`;
    setWorkouts({
      ...workouts,
      [key]: {
        title: "Neues Workout",
        subtitle: "Eigene Einheit",
        exercises: [],
      },
    });
    setEditingKey(key);
  }

  function deleteWorkout(key) {
    if (!confirm("Workout wirklich löschen?")) return;
    const copy = { ...workouts };
    delete copy[key];
    setWorkouts(copy);
    setEditingKey(null);
  }

  const workout = editingKey ? workouts[editingKey] : null;

  return (
    <section className="pageFade">
      <h2>Einstellungen</h2>
      <div className="card">
  <p className="muted">Backup</p>

  <button
    className="secondaryButton"
    onClick={() => {
      const data = exportAllData();
      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      });

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `training-backup-${new Date()
        .toISOString()
        .slice(0, 10)}.json`;
      a.click();
      URL.revokeObjectURL(url);
    }}
  >
    Daten exportieren
  </button>

  <input
    type="file"
    accept="application/json"
    onChange={(event) => {
      const file = event.target.files[0];
      if (!file) return;

      const reader = new FileReader();

      reader.onload = () => {
        try {
          const data = JSON.parse(reader.result);
          importAllData(data);
          alert("Backup importiert. Bitte App neu laden.");
        } catch {
          alert("Backup konnte nicht importiert werden.");
        }
      };

      reader.readAsText(file);
    }}
  />
</div>

      {!workout && (
        <>
          <div className="card">
            <p className="muted">Workouts verwalten</p>
            <button className="primaryButton" onClick={createWorkout}>
              Neues Workout hinzufügen
            </button>
          </div>

          <div className="workoutList">
            {Object.entries(workouts).map(([key, item]) => (
              <button key={key} onClick={() => setEditingKey(key)}>
                <strong>{item.title}</strong>
                <span>Bearbeiten</span>
              </button>
            ))}
          </div>
        </>
      )}

      {workout && (
        <WorkoutEditor
          workoutKey={editingKey}
          workout={workout}
          setWorkout={(updated) =>
            setWorkouts({ ...workouts, [editingKey]: updated })
          }
          onBack={() => setEditingKey(null)}
          onDelete={() => deleteWorkout(editingKey)}
        />
      )}
    </section>
  );
}

function WorkoutEditor({ workout, setWorkout, onBack, onDelete }) {
  function updateExercise(index, updatedExercise) {
    const exercises = [...workout.exercises];
    exercises[index] = updatedExercise;
    setWorkout({ ...workout, exercises });
  }

  function moveExercise(index, direction) {
    const exercises = [...workout.exercises];
    const newIndex = index + direction;

    if (newIndex < 0 || newIndex >= exercises.length) return;

    [exercises[index], exercises[newIndex]] = [
      exercises[newIndex],
      exercises[index],
    ];

    setWorkout({ ...workout, exercises });
  }

  function addExercise() {
    setWorkout({
      ...workout,
      exercises: [
        ...workout.exercises,
        { name: "Neue Übung", target: "3×10", fields: ["reps"] },
      ],
    });
  }

  function deleteExercise(index) {
    const exercises = workout.exercises.filter((_, i) => i !== index);
    setWorkout({ ...workout, exercises });
  }

  function toggleField(exercise, index, field, checked) {
    const fields = checked
      ? [...exercise.fields, field]
      : exercise.fields.filter((f) => f !== field);

    updateExercise(index, { ...exercise, fields });
  }

  return (
    <>
      <button className="backButton" onClick={onBack}>
        ← zurück
      </button>

      <div className="card">
        <p className="muted">Workout bearbeiten</p>

        <input
          value={workout.title}
          onChange={(e) => setWorkout({ ...workout, title: e.target.value })}
          placeholder="Workout Titel"
        />

        <input
          value={workout.subtitle}
          onChange={(e) => setWorkout({ ...workout, subtitle: e.target.value })}
          placeholder="Untertitel"
        />
      </div>

      {workout.exercises.map((exercise, index) => (
        <div className="card" key={index}>
          <div className="exerciseHeader">
            <p className="muted">Übung {index + 1}</p>

            <div className="moveButtons">
              <button
                className="moveButton"
                onClick={() => moveExercise(index, -1)}
                disabled={index === 0}
              >
                ↑
              </button>

              <button
                className="moveButton"
                onClick={() => moveExercise(index, 1)}
                disabled={index === workout.exercises.length - 1}
              >
                ↓
              </button>
            </div>
          </div>

          <input
            value={exercise.name}
            onChange={(e) =>
              updateExercise(index, { ...exercise, name: e.target.value })
            }
            placeholder="Übungsname"
          />

          <input
            value={exercise.target}
            onChange={(e) =>
              updateExercise(index, { ...exercise, target: e.target.value })
            }
            placeholder="Ziel, z.B. 4×8–10"
          />

          <div className="fieldRow">
            {["kg", "reps", "sec"].map((field) => (
              <label key={field}>
                <input
                  type="checkbox"
                  checked={exercise.fields.includes(field)}
                  onChange={(e) =>
                    toggleField(exercise, index, field, e.target.checked)
                  }
                />
                {field === "kg" ? "kg" : field === "reps" ? "Wdh" : "Sek"}
              </label>
            ))}
          </div>

          <button
            className="dangerButton"
            onClick={() => deleteExercise(index)}
          >
            Übung löschen
          </button>
        </div>
      ))}

      <button className="primaryButton" onClick={addExercise}>
        Übung hinzufügen
      </button>

      <button className="dangerButton" onClick={onDelete}>
        Workout löschen
      </button>
    </>
  );
}

export default App;