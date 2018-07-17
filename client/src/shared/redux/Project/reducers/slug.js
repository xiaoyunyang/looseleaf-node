const initState = 'default-slug-123';

export default function user(state = initState, action) {
  switch (action.type) {
    default:
      return state;  // If the reducer is triggered but no case matches, return the current store state. No changes are required so you don’t need to create a new object.
  }
}
