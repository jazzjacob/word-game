// Step 1: Define initial state
const state = {
  count: 0,
  user: {
    name: "John",
    age: 25,
  },
};

// Step 2: Create subscribers array to listen for changes
const subscribers = [];

// Function to subscribe to state changes
function subscribe(callback) {
  subscribers.push(callback);
}

// Step 3: Create a reactive Proxy for the state
const reactiveState = new Proxy(state, {
  get(target, prop) {
    // Intercept 'get' operations
    return target[prop];
  },
  set(target, prop, value) {
    // Intercept 'set' operations
    target[prop] = value;
    // Notify subscribers
    subscribers.forEach((callback) => callback(target, prop, value));
    return true; // Indicate success
  },
});

// Step 4: Rendering function
function render() {
  document.getElementById("app").textContent = `Count: ${reactiveState.count}`;
  document.getElementById("user").textContent = `User: ${reactiveState.user.name}, Age: ${reactiveState.user.age}`;
}

// Step 5: Initialize the app
document.addEventListener("DOMContentLoaded", () => {
  const appDiv = document.createElement("div");
  appDiv.id = "app";
  document.body.appendChild(appDiv);

  const userDiv = document.createElement("div");
  userDiv.id = "user";
  document.body.appendChild(userDiv);

  const incrementButton = document.createElement("button");
  incrementButton.textContent = "Increment Count";
  incrementButton.onclick = () => reactiveState.count++;

  const updateUserButton = document.createElement("button");
  updateUserButton.textContent = "Update User";
  updateUserButton.onclick = () => {
    reactiveState.user.name = "Jane";
    reactiveState.user.age = 30;
  };

  document.body.appendChild(incrementButton);
  document.body.appendChild(updateUserButton);

  // Subscribe to state changes
  subscribe(render);

  // Initial render
  render();
});
