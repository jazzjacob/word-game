// Step 1: State object
const state = {
  count: 0,
};

// Step 2: Subscriptions (callbacks that listen for state changes)
const listeners = [];

// Step 3: Function to subscribe to state changes
function subscribe(listener) {
  listeners.push(listener);
}

// Step 4: Function to update state and notify subscribers
function setState(newState) {
  Object.assign(state, newState); // Merge new state
  listeners.forEach((listener) => listener(state)); // Notify subscribers
}

// Step 5: Function to get current state
function getState() {
  return state;
}

// Step 6: UI Components

// Counter Component (Updates count display)
function renderCounter() {
  document.getElementById("counter").textContent = `Count: ${state.count}`;
}

// Log Component (Tracks state changes)
function renderLog() {
  const logPanel = document.getElementById("log");
  const logEntry = document.createElement("div");
  logEntry.textContent = `State changed to: ${JSON.stringify(state)}`;
  logPanel.appendChild(logEntry);
}

// Status Indicator (Changes color based on count being even/odd)
function renderStatus() {
  const status = document.getElementById("status");
  status.textContent = state.count % 2 === 0 ? "Even" : "Odd";
  status.style.color = state.count % 2 === 0 ? "green" : "red";
}

// Step 7: Initialize UI
document.addEventListener("DOMContentLoaded", () => {
  // Counter Display
  const counterDiv = document.createElement("div");
  counterDiv.id = "counter";
  document.body.appendChild(counterDiv);

  // Status Display
  const statusDiv = document.createElement("div");
  statusDiv.id = "status";
  document.body.appendChild(statusDiv);

  // Log Panel
  const logDiv = document.createElement("div");
  logDiv.id = "log";
  logDiv.style.border = "1px solid #ccc";
  logDiv.style.padding = "10px";
  logDiv.style.marginTop = "10px";
  document.body.appendChild(logDiv);

  // Increment Button
  const incrementButton = document.createElement("button");
  incrementButton.textContent = "Increment";
  incrementButton.onclick = () => setState({ count: state.count + 1 });
  document.body.appendChild(incrementButton);

  // Subscribe components to state updates
  subscribe(renderCounter);
  subscribe(renderStatus);
  subscribe(renderLog);

  // Initial render
  renderCounter();
  renderStatus();
});
