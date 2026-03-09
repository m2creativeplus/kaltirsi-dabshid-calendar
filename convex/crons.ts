import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

// Run at midnight daily (UTC time depending on server, ideally Hargeisa UTC+3)
crons.daily(
  "Trigger Daily Recurrent Events Processing",
  { hourUTC: 21, minuteUTC: 0 }, // 21:00 UTC = 00:00 AST (Hargeisa UTC+3)
  internal.events.handleRecurrences
);

export default crons;
