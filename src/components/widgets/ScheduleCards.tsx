import { scheduleDays, ScheduleDay } from '@/data/ormikData';

interface ScheduleCardProps {
     day: ScheduleDay;
}

function ScheduleCard({ day }: ScheduleCardProps) {
     return (
          <div className="backdrop-blur-[15.2px] rounded-[6px] md:rounded-[8px] lg:rounded-[10px] xl:rounded-[12px] bg-white/30 p-2 md:p-3 lg:p-4 xl:p-5 min-w-[120px] md:min-w-[150px] lg:min-w-[180px] xl:min-w-[200px] text-start">
               <h4 className="text-accent text-[11px] md:text-[14px] lg:text-[16px] xl:text-[18px] font-bold leading-3 md:leading-4 lg:leading-5 mb-1 md:mb-1.5 text-[gold]">
                    {day.title}
               </h4>
               <p className="text-white text-[8px] md:text-[10px] lg:text-[12px] xl:text-[14px] font-medium leading-3 md:leading-3 lg:leading-4 italic">
                    {day.date}
               </p>
          </div>
     );
}

export default function ScheduleCards() {
     return (
          <div className="flex justify-center items-center gap-2 md:gap-3 lg:gap-4 xl:gap-5 flex-wrap mx-auto max-w-[500px] md:max-w-[640px] lg:max-w-[800px] xl:max-w-[900px]">
               {scheduleDays.map((day) => (
                    <ScheduleCard key={day.id} day={day} />
               ))}
          </div>
     );
}
