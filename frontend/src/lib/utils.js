export function formatDate(date) {
    if (!date) return "";

    // Ensure we’re always working with a Date object
    const parsedDate = date instanceof Date ? date : new Date(date);

    if (isNaN(parsedDate)) return "Invalid Date";

    return parsedDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}
