export function objectsDiffer(obj1, obj2) {
  for (const key in obj1) {
    // Check if the property is an object (excluding null)
    if (typeof obj1[key] === "object" && obj1[key] !== null) {
      // Recursively call the function for nested objects
      if (objectsDiffer(obj1[key], obj2[key])) {
        return true; // Return true if differences are found in nested objects
      }
    } else if (obj1[key] !== obj2[key]) {
      return true; // Return true if values of the current property are different
    }
  }

  return false; // Return false if no differences are found in the entire object
}
