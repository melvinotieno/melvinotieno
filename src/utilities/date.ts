export function formatDate(date: string) {
  const currentDate = new Date();
  const formattedDate = date.includes("T") ? date : `${date}T00:00:00`;
  const targetDate = new Date(formattedDate);

  const timeDifference = currentDate.getTime() - targetDate.getTime();
  const daysDifference = Math.floor(timeDifference / (1000 * 3600 * 24));

  if (daysDifference === 0) {
    return "Today";
  } else if (daysDifference === 1) {
    return "Yesterday";
  } else {
    return targetDate.toLocaleString("en-us", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  }
}
