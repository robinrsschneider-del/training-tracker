export const defaultWorkouts = [
  {
    id: crypto.randomUUID(),
    title: "Training A1",
    subtitle: "Kraftfokus",
    exercises: [
      {
        name: "Klimmzüge (weiter Obergriff)",
        target: "5×5–8",
        fields: ["reps"],
      },
      {
        name: "Bankdrücken (Langhantel)",
        target: "4×6–8",
        fields: ["kg", "reps"],
      },
      {
        name: "Langhantelrudern",
        target: "4×8–10",
        fields: ["kg", "reps"],
      },
      {
        name: "Schrägbankdrücken (Kurzhantel)",
        target: "3×8–10",
        fields: ["kg", "reps"],
      },
      {
        name: "Face Pulls",
        target: "3×12–15",
        fields: ["kg", "reps"],
      },
      {
        name: "Hammercurls",
        target: "3×10–12",
        fields: ["kg", "reps"],
      },
      {
        name: "Hanging Leg Raises",
        target: "3×10–15",
        fields: ["reps"],
      },
    ],
  },

  {
    id: crypto.randomUUID(),
    title: "Training A2",
    subtitle: "Hypertrophiefokus",
    exercises: [
      {
        name: "Klimmzüge (enger Untergriff)",
        target: "4×6–10",
        fields: ["reps"],
      },
      {
        name: "Kurzhantel-Bankdrücken",
        target: "4×8–10",
        fields: ["kg", "reps"],
      },
      {
        name: "Einarmiges Kurzhantelrudern",
        target: "4×10",
        fields: ["kg", "reps"],
      },
      {
        name: "Butterfly",
        target: "3×12–15",
        fields: ["kg", "reps"],
      },
      {
        name: "Reverse Flys",
        target: "3×12–15",
        fields: ["kg", "reps"],
      },
      {
        name: "SZ-Curls",
        target: "3×10–12",
        fields: ["kg", "reps"],
      },
      {
        name: "Ab Workout",
        target: "3 Sätze",
        fields: [],
      },
    ],
  },

  {
    id: crypto.randomUUID(),
    title: "Training B1",
    subtitle: "Rücken & Schulter",
    exercises: [
      {
        name: "Klimmzüge (neutraler Griff)",
        target: "5×5–8",
        fields: ["reps"],
      },
      {
        name: "Schulterdrücken (Kurzhantel)",
        target: "4×8",
        fields: ["kg", "reps"],
      },
      {
        name: "Kabelrudern",
        target: "4×8–10",
        fields: ["kg", "reps"],
      },
      {
        name: "Dips",
        target: "3×8–12",
        fields: ["reps"],
      },
      {
        name: "Seitheben",
        target: "3×12–15",
        fields: ["kg", "reps"],
      },
      {
        name: "Überkopf-Trizepsstrecken (Kurzhantel)",
        target: "3×10–12",
        fields: ["kg", "reps"],
      },
      {
        name: "Plank",
        target: "3×60–90 Sek.",
        fields: ["sec"],
      },
    ],
  },

  {
    id: crypto.randomUUID(),
    title: "Training B2",
    subtitle: "Rückenbreite & Stabilität",
    exercises: [
      {
        name: "Klimmzüge (weiter Obergriff)",
        target: "4×6–10",
        fields: ["reps"],
      },
      {
        name: "Military Press (Langhantel)",
        target: "4×6–8",
        fields: ["kg", "reps"],
      },
      {
        name: "T-Bar-Rudern",
        target: "4×8–10",
        fields: ["kg", "reps"],
      },
      {
        name: "Vorgebeugtes Seitheben",
        target: "3×12–15",
        fields: ["kg", "reps"],
      },
      {
        name: "Diamond Push-ups",
        target: "3×12–15",
        fields: ["reps"],
      },
      {
        name: "Konzentrationscurls",
        target: "3×10–12",
        fields: ["kg", "reps"],
      },
      {
        name: "Ab Wheel",
        target: "3×10–15",
        fields: ["reps"],
      },
    ],
  },
];