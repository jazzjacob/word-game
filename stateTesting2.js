const state = {
  count: 0,
};

function setState(newState) {
  Object.assign(state, newState); // Merge new state with current state
  console.log(newState);
  render();
}

// Step 6: Render function
function render() {
  document.getElementById('counter').textContent = `State test 2. Count: ${state.count}`;
}

document.addEventListener('DOMContentLoaded', () => {
  const counterElement = document.createElement('div');
  counterElement.id = 'counter';
  document.body.appendChild(counterElement);

  const incrementButton = document.createElement('button');
  incrementButton.textContent = 'Increment';
  incrementButton.onclick = () => setState({ count: state.count + 1 });

  document.body.appendChild(incrementButton);
  render();
});
