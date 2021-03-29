/**
 * Wrapper for Date.prototype.toLocaleString()
 *
 * @param {Date} date
 */
export default function formatDate(date) {
  return date.toLocaleString("en-US", {
    dateStyle: "long",
    timeStyle: "short",
  });
}
