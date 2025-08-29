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
     targetDate: new Date("2025-09-16T06:30:00+07:00").toISOString(), // September 16, 2025 6:30 AM WIB (Asia/Jakarta)
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
          date: "Tuesday, Sept 16, 2025",
          fullDate: "2025-09-16",
          color: "yellow"
     },
     {
          id: "last-day",
          title: "LAST DAY",
          date: "Saturday, Sept 20, 2025",
          fullDate: "2025-09-20",
          color: "yellow"
     }
];
