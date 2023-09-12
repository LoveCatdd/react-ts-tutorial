import React, { useEffect, useRef, useState } from 'react'
import { Task } from '../model/model'
import '../css/SingleTask.css'
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import { Draggable } from 'react-beautiful-dnd';

interface Props {
    task: Task,
    tasks: Task[],
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>,
    index: number
}

const SingleTask: React.FC<Props> = ({ task, tasks, setTasks, index }) => {

    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(task.todo);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, [edit]);

    const handleDone = (id: number) => {
       setTasks(
        tasks.map(
            task => task.id === id ? {...task, isDone: !task.isDone} : task
        )
       )
    }
    const handleDel = (id: number) => {
        setTasks(
            tasks.filter(task => task.id !== id)
        )
    }
    const handleEdit = (e: React.FormEvent, id: number) => {
        e.preventDefault();
        setTasks(tasks.map(task => task.id === id ?{...task, todo: editTodo}: task))
        setEdit(false);
    }
    return (
    <Draggable index={index}  draggableId={task.id.toString()}>
        {(provided) => (
                <form action="" className="tasks_single"
                onSubmit={(e) => handleEdit(e, task.id)}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
            >
                {edit ? (
                    <input 
                        className='tasks_single--text'
                        value={editTodo}
                        onChange={e => setEditTodo(e.target.value)}
                        ref={inputRef}
                    />
                ):
                    task.isDone ? (<s className="tasks_single--text">{task.todo}</s>) : (
                    <span className="tasks_single--text">{task.todo}</span>
                )}        
                <div>
                    <span className="icon" onClick={() => {
                        if (!edit && !task.isDone) {
                            setEdit(!edit);
                        }
                    }}>
                        <AiFillEdit />
                    </span>
                    <span className="icon" onClick={() => handleDel(task.id)}>
                        <AiFillDelete />
                    </span>
                    <span className="icon" onClick={() => handleDone(task.id)}>
                        <MdDone />
                    </span>
                </div>
            </form>
            )
        }
    </Draggable>

  )
}

export default SingleTask