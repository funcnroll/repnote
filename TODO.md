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
- [ ] add active template to local storage and load from local storage

## 🛠️ Exercise Management

- [x] Support adding **custom exercises**
- [x] Include a searchable list of **common exercises**
  - [x] Remove exerciseName and base logic off isCustom (centralised exercise metadata)

## 🧩 Exercise Editing UI

- [x] Add an option next to each exercise to reorder exercises
- [x] Display an **X** next to each set to remove it
- [ ] Show a **persistent bar at the bottom** to add new sets or exercises

## 🗂️ Misc

- [x] Convert Javascript to Typescript after finishing template builder logic (adding/removing/editing template, editing/adding/removing/reodering exercises)
- [ ] Refactor all logic and JSX within templates for easier readability

---

### More goals to come as project grows
