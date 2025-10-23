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

# 📈 Data & Visualisation

- [ ] Refactor statistics pages once everything is working(!)
- [x] Track exercise history (weight, reps, sets over time)
- [ ] Finish statistics pages
  - Volume
    - [x] Total sets per week
    - [x] Radar chart for total sets per muscle group across all weeks
    - [x] Total reps per week
    - [x] Total weight per week
  - Performance
    - [x] 1RM line chart
    - [x] Volume load line chart
  - Consistency
    - [ ] Consistency rate (completed vs missed sets)
    - [ ] Average workout duration
    - [ ] Streaks / weekly adherence view

## 🧩 Exercise Editing UI

- [x] Add an option next to each exercise to reorder exercises
- [x] Display an **X** next to each set to remove it

## 🗂️ Misc

- [ ] Include option to use lbs instead of kg
- [x] Convert Javascript to Typescript after finishing template builder logic (adding/removing/editing template, editing/adding/removing/reodering exercises)
- [x] Refactor all logic and JSX within the /templates page folder for easier readability (!!)
- [x] Abstract and simplify exercise logic within templateSlice.js for easier readability (!!)
- [x] Seed application with realistic historical workout data
  - [x] Generate 2-3 months of sample workout sessions
  - [x] Include variety in exercises, weights, and progression patterns
  - [x] Ensure data demonstrates realistic strength progression over time
  - [x] Add both completed workouts and partial sessions for authenticity

---

### More goals to come as project grows
