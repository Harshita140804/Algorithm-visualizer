#  Interactive Algorithm Visualizer

A premium, frontend-only interactive dashboard designed to visually animate fundamental searching and sorting algorithms. Built using React and styled with a modern theme, this application uses declarative layout transitions to demonstrate the step-by-step logic of execution paths in real-time.

---

##  Features

- **Distinct Two-Column Architecture:** 
  - **Searching Zone:** Features a dedicated user input field to specify a search target, enabling dynamic analysis of element indexing.
  - **Sorting Zone:** Provides independent controls to isolate and execute sorting routines.
- **Smooth Layout Transitions:** Uses **Framer Motion's layout properties** to execute physically fluid sideways sliding transitions when array indices shift or swap, moving away from jarring instant flashes.
- **Color-Coded Status Feedback:** Visual states update reactively via component states (e.g., scanning, index rejection, element found/sorted updates).
- **Zero-Backend Dependency:** Runs entirely client-side inside the web browser with optimized performance loops.

---

##  Algorithms Implemented

###  Searching
1. **Linear Search:** Sequential step-by-step evaluation across the array pool.
2. **Binary Search:** Divide-and-conquer strategy showcasing logarithmic pointer reductions on pre-sorted data.

###  Sorting
1. **Bubble Sort:** Straightforward comparisons highlighting neighboring element swapping mechanics.
2. **Merge Sort:** Advanced divide-and-conquer structural tracking designed with clean, transparent loop traces for easy visual understanding.

---

##  Tech Stack & Dependencies

- **Framework:** React (Functional Components, Hooks)
- **Animation:** Framer Motion (Layout Animations)
- **Styling:** Vanilla CSS (Dark-themed layout dashboard controls)

---

## 🚀 Local Installation & Setup

Follow these steps to run this application locally on your machine:

1. **Clone the repository:**
   ```bash
   git clone https://github.com
   ```

2. **Navigate into the project directory:**
   ```bash
   cd algorithm-visualizer
   ```

3. **Install the required dependencies:**
   ```bash
   npm install
   ```

4. **Launch the local development server:**
   ```bash
   npm run dev
   ```
   Open your browser and navigate to the local host URL provided in your terminal window.
