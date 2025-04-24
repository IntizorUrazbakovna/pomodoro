'use client';
import Header from "./components/header/Header";
// import TaskList from "./components/TaskList";
// import TaskInputCard from "./components/TaskInputCard";
import TaskManager from "./components/TaskManager";
import Timer from './components/timer/Timer';
import PomodoroStatus from "./components/PomodoroStatus/PomodoroStatus";





export default function Home() {
  return (
    <main>

      <Header />
      <Timer />
      {/* <TaskList /> */}
      {/* <TaskInputCard /> */}
      < TaskManager />
      <PomodoroStatus/>
 


    </main>

  );

}



