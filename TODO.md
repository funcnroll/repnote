# TODO – RepNote App

## 🧭 Navigation

- [ ] Make the active workout on Home clickable → navigates to the workout screen

## 💪 Workout Flow (Priority!)

- [x] Allow user to add/edit sets, reps, and weight per exercise
  - [ ] Differentiate logic for `tmpTemplate` (editing mode) vs saved templates in `templates` (used for actual workouts)
- [ ] Allow user to edit sets/reps/weight mid-workout/whilst creating a template
- [ ] Add indicator how many sets are done of total set amount per exercise
- [ ] Allow editing of sets before starting a workout
- [ ] Allow user to add a template
  - [ ] Handle edge cases (User adding template without exercises, etc.)

## 🛠️ Exercise Management

- [ ] Support adding **custom exercises**
- [ ] Include a searchable list of **common exercises**
  - [ ] Remove exerciseName and base logic off isCustom (centralised exercise metadata)

## 🧩 Exercise Editing UI

- [ ] Add an option next to each exercise to reorder exercises
- [x] Display an **X** next to each set to remove it
- [ ] Show a **persistent bar at the bottom** to add new sets or exercises

## 🗂️ Misc

- [ ] Convert Javascript to Typescript after finishing template builder logic (adding/removing/editing template, editing/adding/removing/reodering exercises)

---

### More goals to come as project grows
