import { ListTugas } from "./ListTugas";
import { TaskStatistic } from "./TaskStatistic";

export default function Home() {
  return (
    <div className="container relative mb-16 mt-6">
      <div className="relative grid gap-y-8 lg:grid-cols-[60%_40%] lg:gap-y-0 lg:space-x-8">
        <ListTugas />
        <TaskStatistic />
      </div>
    </div>
  );
}
