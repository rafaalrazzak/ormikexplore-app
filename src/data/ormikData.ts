export interface ScheduleDay {
  id: string;
  title: string;
  date: string;
  fullDate: string;
  color: 'yellow' | 'blue';
}

export interface CountdownData {
  targetDate: string; // ISO string format
  title: string;
}

// Countdown target date for ORMIK EXPLORE DAY 1
export const countdownData: CountdownData = {
  targetDate: "2025-09-15T08:00:00.000Z", // September 15, 2025 8:00 AM
  title: "GO TO ORMIK EXPLORE DAY 1"
};

// Schedule days data
export const scheduleDays: ScheduleDay[] = [
  {
    id: "pra-ormik",
    title: "PRA ORMIK",
    date: "Monday, Sept 8, 2025",
    fullDate: "2025-09-08",
    color: "yellow"
  },
  {
    id: "day-1",
    title: "DAY 1",
    date: "Monday, Sept 15, 2025", 
    fullDate: "2025-09-15",
    color: "yellow"
  },
  {
    id: "day-2", 
    title: "DAY 2",
    date: "Tuesday, Sept 16, 2025",
    fullDate: "2025-09-16",
    color: "yellow"
  },
  {
    id: "day-3",
    title: "DAY 3", 
    date: "Saturday, Sept 20, 2025",
    fullDate: "2025-09-20",
    color: "yellow"
  }
];
