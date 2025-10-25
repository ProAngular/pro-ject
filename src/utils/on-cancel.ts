/**
 * Handles cancellation by logging a message and exiting the process.
 */
export function onCancel(): never {
  console.log("Canceled.");
  process.exit(1);
}
