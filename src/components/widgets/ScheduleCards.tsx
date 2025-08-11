import { scheduleDays, ScheduleDay } from '@/data/ormikData';

interface ScheduleCardProps {
     day: ScheduleDay;
}

function ScheduleCard({ day }: ScheduleCardProps) {
     return (
          <div className="backdrop-blur-[15.2px] rounded-[6px] lg:rounded-[10px] bg-white/30 p-2 lg:p-4 min-w-[120px] lg:min-w-[180px] text-start">
               <h4 className="text-accent text-[11px] lg:text-base font-bold leading-3 lg:leading-5 mb-1 text-[gold]">
                    {day.title}
               </h4>
               <p className="text-white text-[8px] lg:text-sm font-medium leading-3 lg:leading-4 italic">
                    {day.date}
               </p>
          </div>
     );
}

export default function ScheduleCards() {
     return (
          <div className="flex justify-center items-center gap-2 lg:gap-4 flex-wrap mx-auto max-w-[500px] lg:max-w-[800px]">
               {scheduleDays.map((day) => (
                    <ScheduleCard key={day.id} day={day} />
               ))}
          </div>
     );
}
