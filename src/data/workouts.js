export const workouts = {
  "1A": {
    title: "1A – Gym Pull / Lat / Front Lever",
    subtitle: "Kraft + Muskelaufbau",
    exercises: [
      { name: "Klimmzüge", target: "5×4–6", fields: ["reps"] },
      { name: "Langhantelrudern", target: "4×6–8", fields: ["kg", "reps"] },
      { name: "Front Lever Tuck Hold", target: "4×10–15 s", fields: ["sec"] },
      { name: "Einarmiges Kurzhantelrudern", target: "3×10 / Seite", fields: ["kg", "reps"] },
      { name: "Schrägbank Kurzhanteldrücken", target: "3×8–10", fields: ["kg", "reps"] },
      { name: "Hanging Leg Raises", target: "3×10–12", fields: ["reps"] },
    ],
  },

  "1B": {
    title: "1B – Park Pull / Lat / Front Lever",
    subtitle: "Outdoor Kraftfokus",
    exercises: [
      { name: "Klimmzüge", target: "5×4–6", fields: ["reps"] },
      { name: "TRX Rows schwer", target: "4×8–10", fields: ["reps"] },
      { name: "Front Lever Tuck Hold", target: "4×10–15 s", fields: ["sec"] },
      { name: "Archer Rows TRX", target: "3×8 / Seite", fields: ["reps"] },
      { name: "Tiefe Liegestütze", target: "3×10–15", fields: ["reps"] },
      { name: "Hanging Leg Raises", target: "3×10–12", fields: ["reps"] },
    ],
  },

  "2": {
    title: "2 – Calisthenics Park Skill",
    subtitle: "Skill + Körperspannung",
    exercises: [
      { name: "EMOM Klimmzüge", target: "10 Min, 2–3 Wdh/Min", fields: ["reps"] },
      { name: "Explosive Pull-Ups", target: "5×3", fields: ["reps"] },
      { name: "Front Lever Tuck Hold", target: "5×10–15 s", fields: ["sec"] },
      { name: "TRX Rows", target: "3×12–15", fields: ["reps"] },
      { name: "TRX Push-Ups", target: "3×12–15", fields: ["reps"] },
      { name: "Hollow Hold", target: "3×40–50 s", fields: ["sec"] },
      { name: "Hanging Knee Raises", target: "3×10", fields: ["reps"] },
    ],
  },

  "3": {
    title: "3 – Gym Push / Oberkörper",
    subtitle: "Brust + Push + Rückenbalance",
    exercises: [
      { name: "Bankdrücken", target: "5×5", fields: ["kg", "reps"] },
      { name: "Dips", target: "4×6–10", fields: ["reps"] },
      { name: "Kurzhantelrudern", target: "3×8–10", fields: ["kg", "reps"] },
      { name: "Schrägbank Kurzhanteldrücken", target: "3×8–10", fields: ["kg", "reps"] },
      { name: "Face Pulls", target: "3×15", fields: ["kg", "reps"] },
      { name: "Core / Ab Wheel", target: "3×8–12", fields: ["reps"] },
    ],
  },
};

workouts["core-hell"] = {
  title: "Core Hölle",
  subtitle: "20 Minuten zufälliges Core-Workout",
  type: "random-core",
  exercises: [
    { name: "🔥 Bodyweight #1 – Hollow Burner", category: "Bodyweight", difficulty: "★★★☆☆", target: "5 Runden: 30s Hollow Hold, 15 Reverse Crunches, 45s Plank, 20 Dead Bugs, 30s Pause", fields: ["sec", "reps"] },
    { name: "🔥 Bodyweight #2 – Plank Tunnel", category: "Bodyweight", difficulty: "★★★☆☆", target: "4 Runden: 60s Plank, 30s Side Plank links, 30s Side Plank rechts, 20 Shoulder Taps", fields: ["sec", "reps"] },
    { name: "🔥 Bodyweight #3 – Abs Density", category: "Bodyweight", difficulty: "★★★★☆", target: "20 Min AMRAP: 12 V-Ups, 16 Reverse Crunches, 30 Mountain Climbers", fields: ["reps"] },
    { name: "🔥 Bodyweight #4 – Slow Control", category: "Bodyweight", difficulty: "★★★☆☆", target: "5 Runden: 10 langsame Leg Lowers, 30s Hollow, 12 Dead Bugs je Seite", fields: ["sec", "reps"] },
    { name: "🔥 Bodyweight #5 – Oblique Hell", category: "Bodyweight", difficulty: "★★★☆☆", target: "4 Runden: 40 Russian Twists, 15 Side Plank Dips je Seite, 30s Pause", fields: ["sec", "reps"] },
    { name: "🔥 Bodyweight #6 – Tabata Core", category: "Bodyweight", difficulty: "★★★★☆", target: "8 Runden 20s Arbeit/10s Pause: Hollow, Mountain Climbers, Plank, Reverse Crunches – 2 Durchgänge", fields: ["sec", "reps"] },
    { name: "🔥 Bodyweight #7 – Final Plank", category: "Bodyweight", difficulty: "★★★★☆", target: "5 Runden: 45s Plank, 20 Sit-ups, 20 Flutter Kicks, 30s Pause", fields: ["sec", "reps"] },
    { name: "🔥 Bodyweight #8 – Compression Core", category: "Bodyweight", difficulty: "★★★★☆", target: "5 Runden: 15 V-Ups, 20 Pike Pulses, 30s Hollow Hold", fields: ["sec", "reps"] },

    { name: "🧗 Hanging #1 – Knee Raise Ladder", category: "Klimmzugstange", difficulty: "★★★☆☆", target: "5 Runden: 10 Hanging Knee Raises, 30s Dead Hang, 30s Hollow Hold", fields: ["sec", "reps"] },
    { name: "🧗 Hanging #2 – Lower Abs", category: "Klimmzugstange", difficulty: "★★★★☆", target: "5 Runden: 8 Hanging Leg Raises, 12 Reverse Crunches, 30s Pause", fields: ["sec", "reps"] },
    { name: "🧗 Hanging #3 – Bar Control", category: "Klimmzugstange", difficulty: "★★★★☆", target: "4 Runden: 10 Hanging Knee Raises, 8 Toes-to-Bar Prep, 30s Hang", fields: ["sec", "reps"] },
    { name: "🧗 Hanging #4 – L-Sit Prep", category: "Klimmzugstange", difficulty: "★★★★☆", target: "5 Runden: 20s Hanging Tuck Hold, 10 Knee Raises, 30s Hollow", fields: ["sec", "reps"] },
    { name: "🧗 Hanging #5 – Grip & Core", category: "Klimmzugstange", difficulty: "★★★☆☆", target: "EMOM 20: ungerade 10 Knee Raises, gerade 30s Dead Hang", fields: ["sec", "reps"] },
    { name: "🧗 Hanging #6 – Windshield Prep", category: "Klimmzugstange", difficulty: "★★★★★", target: "4 Runden: 8 Hanging Raises, 8 Wiper Prep je Seite, 30s Hollow", fields: ["sec", "reps"] },

    { name: "🟦 TRX #1 – Pike Starter", category: "TRX", difficulty: "★★★★☆", target: "4 Runden: 10 TRX Pike, 15 TRX Knee Tucks, 40s Plank", fields: ["sec", "reps"] },
    { name: "🟦 TRX #2 – Suspension Abs", category: "TRX", difficulty: "★★★★☆", target: "5 Runden: 12 TRX Knee Tucks, 10 TRX Body Saws, 30s Pause", fields: ["sec", "reps"] },
    { name: "🟦 TRX #3 – Anti Rotation", category: "TRX", difficulty: "★★★☆☆", target: "4 Runden: 12 TRX Fallout, 30s Side Plank je Seite, 20 Mountain Climbers", fields: ["sec", "reps"] },
    { name: "🟦 TRX #4 – Pike Hell", category: "TRX", difficulty: "★★★★★", target: "20 Min AMRAP: 8 TRX Pike, 12 TRX Knee Tucks, 20 Flutter Kicks", fields: ["reps"] },
    { name: "🟦 TRX #5 – Core Stability", category: "TRX", difficulty: "★★★★☆", target: "5 Runden: 30s TRX Plank, 12 Knee Tucks, 10 Body Saws", fields: ["sec", "reps"] },
    { name: "🟦 TRX #6 – Suspension Finisher", category: "TRX", difficulty: "★★★★☆", target: "4 Runden: 15 TRX Mountain Climbers, 10 Pike, 30s Hollow Hold", fields: ["sec", "reps"] },

    { name: "⚡ Front Lever #1 – Tuck Basics", category: "Front Lever Prep", difficulty: "★★★★☆", target: "5 Runden: 15s Tuck Front Lever, 10 Tuck Raises, 30s Hollow", fields: ["sec", "reps"] },
    { name: "⚡ Front Lever #2 – Scapula Core", category: "Front Lever Prep", difficulty: "★★★☆☆", target: "5 Runden: 8 Scap Pull-ups, 15s Tuck Hold, 30s Plank", fields: ["sec", "reps"] },
    { name: "⚡ Front Lever #3 – Tension Builder", category: "Front Lever Prep", difficulty: "★★★★☆", target: "4 Runden: 20s Hollow, 12 Arch Rocks, 15s Tuck Front Lever", fields: ["sec", "reps"] },
    { name: "⚡ Front Lever #4 – Raise Control", category: "Front Lever Prep", difficulty: "★★★★★", target: "5 Runden: 6 Tuck Front Lever Raises, 20s Hollow, 30s Pause", fields: ["sec", "reps"] },
    { name: "⚡ Front Lever #5 – Bar + Floor", category: "Front Lever Prep", difficulty: "★★★★☆", target: "4 Runden: 15s Tuck Lever, 10 Hanging Knee Raises, 40s Hollow", fields: ["sec", "reps"] },

    { name: "💀 Mixed Hell #1 – No Excuses", category: "Mixed Hell", difficulty: "★★★★★", target: "20 Min AMRAP: 10 V-Ups, 10 Hanging Knee Raises, 20 Mountain Climbers", fields: ["reps"] },
    { name: "💀 Mixed Hell #2 – EMOM Death", category: "Mixed Hell", difficulty: "★★★★★", target: "EMOM 20: Min 1 12 Sit-ups, Min 2 30s Hollow, Min 3 10 Knee Raises, Min 4 40s Plank", fields: ["sec", "reps"] },
    { name: "💀 Mixed Hell #3 – Final Boss", category: "Mixed Hell", difficulty: "★★★★★", target: "4 Runden: 60s Plank, 20 V-Ups, 15 Leg Raises, 30s Hollow", fields: ["sec", "reps"] },
    { name: "💀 Mixed Hell #4 – Bar Optional", category: "Mixed Hell", difficulty: "★★★★☆", target: "5 Runden: 12 Reverse Crunches, 10 Hanging Knee Raises oder Leg Raises am Boden, 30s Side Plank je Seite", fields: ["sec", "reps"] },
    { name: "💀 Mixed Hell #5 – Absolute Core", category: "Mixed Hell", difficulty: "★★★★★", target: "20 Minuten: 5 Runden aus 30s Hollow, 30s Plank, 15 V-Ups, 15 Reverse Crunches, 30s Pause", fields: ["sec", "reps"] },
  ],
};





export const defaultWorkouts = workouts;