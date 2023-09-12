import React, { useState } from 'react';
import './css/App.css';
import InputFiled from './components/InputFiled';
import { Task } from './model/model';
import TaskList from './components/TaskList';
import { DragDropContext, DropResult } from "react-beautiful-dnd";

const App: React.FC = () => {

  const [todo, setTodo] = useState<string>("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      setTasks([...tasks, {id: Date.now(), todo:todo, isDone: false}]);
      setTodo("");
    }
  }
  const onDragEnd = (result: DropResult) => {
    const {source, destination} = result;
    if (!destination ||
       (destination.droppableId === source.droppableId &&
        destination.index === source.index)) return ;

    let add ,
    active = tasks,
    complete = completedTasks;

    if (source.droppableId === "TaskList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    if (destination.droppableId === "TaskList") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }
    setCompletedTasks(complete);
    setTasks(active);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
    <div className="App">
      <span className="heading">Taskify</span>
      <InputFiled todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      <TaskList
        tasks={tasks}
        setTasks={setTasks}
        completedTasks={completedTasks}
        setCompletedTasks={setCompletedTasks}
      />
    </div>
  </DragDropContext>
  );
}

export default App;
