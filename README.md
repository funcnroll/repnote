# 🏋️ RepNote

## **RepNote** is a minimalist workout tracking app, aimed primarily at data visualisation, with a mobile-style interface designed to simulate a phone experience directly in the browser, built with React, TailwindCSS, and Redux Toolkit.

## 📱 App Preview

<div align="center">
  <img src="preview/preview1.png" alt="Consistency" width="200" />
  <img src="preview/preview2.png" alt="Active Template" width="200" />
  <img src="preview/preview3.png" alt="Workout History" width="200" />
  <img src="preview/preview4.png" alt="Training Volume" width="200" />
</div>

## ✨ Features

- 👤 **Onboarding**

  - Simple name-based onboarding to personalize the app

- 🧩 **Workout Templates**

  - Create and edit custom workout templates
  - Add, remove, or reorder exercises within templates
  - Support for both built-in and custom exercises
  - Draft vs saved template logic (edit mode vs workout mode)

- 💪 **Workout Tracking**

  - Log sets, reps, and weight during workouts
  - Edit exercises and sets mid-workout
  - Track progress with per-exercise set completion indicators
  - Resume active templates from local storage

- 🗂️ **Exercise Management**

  - Searchable library of common exercises
  - Support for custom exercise creation
  - Remove or reorder sets dynamically

- 📈 **Statistics & Data Visualisation**

  - **Training Volume**
    - Weekly sets, reps, and weight totals
    - Radar chart for total sets per muscle group
  - **Performance**
    - Estimated One Rep Max (1RM) progression
    - Total training volume load trends
  - **Consistency**
    - Completed vs missed sets tracking
    - Workout duration (average + total minutes)
    - Weekly adherence / streak view

- 🧠 **Data Layer**

  - Global state management with Redux Toolkit
  - Persistent workout history and templates via local storage
  - Seeded with months of realistic sample workout data (including progression + partial sessions)

- 🎨 **UI/UX**
  - Mobile-style layout (375x812) for browser demo
  - Navigation with React Router
  - Styled with TailwindCSS

---

## 🧪 Demo Goals

This app is designed as a **developer portfolio project** to demonstrate:

- Clean and scalable React architecture
- Explore data visualisation ideas related to workouts and performance
  Serve as a playground for experimenting with UI/UX and "playing" around with data and structure in a relaxed way
- State management patterns with Redux
- Local UI design via TailwindCSS
- Data flow in medium-complexity fitness tools

---

## 📌 Tech Stack

- React + Vite
- Redux Toolkit
- React Router
- TailwindCSS
- Recharts

---

## 🚧 Work in Progress

See [TODO](TODO.md) for full roadmap.

## 🧑‍💻 Getting Started

```bash
git clone https://github.com/funcnroll/repnote.git
cd repnote
npm install
npm run dev
```

## 🙏 Acknowledgments

Exercise data provided by [free-exercise-db](https://github.com/yuhonas/free-exercise-db)

## 📜 License

This project is licensed under the [MIT License](LICENSE).
