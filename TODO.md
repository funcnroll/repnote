# TODO – RepNote App

## 🧭 Navigation

- [x] Make the active workout on Home clickable → navigates to the workout screen

## 💪 Workout Flow (Priority!)

- [x] Allow user to add/edit sets, reps, and weight per exercise
  - [x] Differentiate logic for `draftTemplate` (editing mode) vs saved templates in `templates` (used for actual workouts)
- [x] Allow user to edit sets/reps/weight mid-workout/whilst creating a template
- [x] Add indicator how many sets are done of total set amount per exercise
- [x] Allow editing of sets before starting a workout
- [x] Allow user to add a template
  - [x] Handle edge cases (User adding template without exercises, etc.)
- [x] Allow user to add exercise within an active template
- [x] add active template to local storage and load from local storage (if applicable)

## 🛠️ Exercise Management

- [x] Support adding **custom exercises**
- [x] Include a searchable list of **common exercises**
  - [x] Remove exerciseName and base logic off isCustom (centralised exercise metadata)

## 📈 Data & Visualisation

- [ ] Track exercise history (weight, reps, sets over time)
- [ ] Add chart view per exercise to show progress over time
- [ ] Integrate with charting library (e.g. Chart.js, Recharts)
- [ ] Toggle between views: e.g. weight over time, volume over time, etc.
- [ ] Create summary view/dashboard for workout statistics
  - [ ] Total sets per week
  - [ ] Most trained muscle groups
  - [ ] Personal bests, etc.

## 🧩 Exercise Editing UI

- [x] Add an option next to each exercise to reorder exercises
- [x] Display an **X** next to each set to remove it

## 🗂️ Misc

- [x] Convert Javascript to Typescript after finishing template builder logic (adding/removing/editing template, editing/adding/removing/reodering exercises)
- [x] Refactor all logic and JSX within the /templates page folder for easier readability (!!)
- [x] Abstract and simplify exercise logic within templateSlice.js for easier readability (!!)
- [ ] Seed application with realistic historical workout data
  - [ ] Generate 2-3 months of sample workout sessions
  - [ ] Include variety in exercises, weights, and progression patterns
  - [ ] Ensure data demonstrates realistic strength progression over time
  - [ ] Add both completed workouts and partial sessions for authenticity

---

### More goals to come as project grows
