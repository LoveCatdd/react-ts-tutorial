import React from 'react'
import { Task } from '../model/model'
import '../css/TaskList.css'
import SingleTask from './SingleTask'
import { Droppable } from "react-beautiful-dnd";

interface Props {
    tasks: Task[],
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>,
    completedTasks: Task[],
    setCompletedTasks: React.Dispatch<React.SetStateAction<Task[]>>,
}

const TaskList: React.FC<Props> = ({
  tasks, 
  setTasks, 
  completedTasks, 
  setCompletedTasks
}) => {
  return (
    <div className="container">
      <Droppable droppableId={"TaskList"}>
        {(provided) => (
          <div className="tasks" 
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            <span className="tasks_heading">Active Tasks</span>
            {tasks.map((task, index) => (
              <SingleTask
                index={index}
                key={task.id}
                task={task}
                tasks={tasks}
                setTasks={setTasks}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
        
      </Droppable>
      <Droppable droppableId={"completedTaskList"}>
        {(provided) => (
          <div className="tasks remove"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            <span className="tasks_heading">Completed Tasks</span>
            {completedTasks.map((task, index) => (
              <SingleTask 
                index={index}
                key={task.id}
                task={task}
                tasks={completedTasks}
                setTasks={setCompletedTasks}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  )
}

export default TaskList