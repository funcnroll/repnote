# 🏋️ RepNote

## RepNote is a minimalist training log and performance dashboard, built with a strong focus on **data visualization** and **smooth UX**. It simulates a mobile-style interface directly in the browser, allowing users to log workouts and instantly see trends in **strength, volume, and consistency**.

🔗 **[Live Demo](https://repnotedemo.funcnroll.dev)**
---

## 📱 App Preview

<div align="center">
  <img src="preview/preview1.png" alt="Consistency" width="200" />
  <img src="preview/preview2.png" alt="Active Template" width="200" />
  <img src="preview/preview3.png" alt="Workout History" width="200" />
  <img src="preview/preview4.png" alt="Training Volume" width="200" />
</div>

---

## ✨ Features

- 👤 **Onboarding**
  - Simple name-based setup for personalization

- 🧩 **Training Templates**
  - Create and edit custom training plans
  - Add, remove, and reorder exercises
  - Draft vs. saved templates (edit vs. workout mode)

- 💪 **Workout Logging**
  - Track sets, reps, and weight during training
  - Edit exercises and sets mid-session
  - Resume active workouts from local storage
  - Per-set completion indicators

- 🗂️ **Exercise Library**
  - Searchable library of common exercises
  - Add or modify sets dynamically

- 📈 **Statistics & Data Visualization**
  - **Training Volume**
    - Weekly totals for sets, reps, and weight
    - Radar chart of sets distributed across muscle groups
  - **Performance**
    - One Rep Max (1RM) progression estimates
    - Volume load trends over time
  - **Consistency**
    - Completed vs. missed sets
    - Workout duration tracking
    - Weekly adherence / streaks

- 🧠 **Data Layer**
  - Global state management with Redux Toolkit
  - Local storage persistence
  - Seeded with months of realistic sample data (progression + partial sessions)

- 🎨 **UI/UX**
  - Mobile-style layout (375x812) for browser demo
  - Smooth navigation with React Router
  - TailwindCSS design system

---

## 🧪 Demo Goals

RepNote was built as a **developer portfolio project** to highlight:

- Clean, scalable **React architecture**  
- Strong attention to **data visualisation and UX**  
- State management with **Redux Toolkit**  
- Modern **TailwindCSS** design patterns  
- Clear data flow and interactivity in a medium-complexity fitness tool  

---

## 📌 Tech Stack

- React + Vite  
- Redux Toolkit  
- React Router  
- TailwindCSS  
- Recharts  

---

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
