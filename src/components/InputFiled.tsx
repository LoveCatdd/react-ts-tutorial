import React, { useRef } from 'react'
import '../css/InputFiled.css';

interface Props {
    todo: string,
    setTodo: React.Dispatch<React.SetStateAction<string>>,
    handleAdd: (e: React.FormEvent) => void,
}

const InputFiled: React.FC<Props> = ({todo, setTodo, handleAdd}) => {
    
    const inputRef = useRef<HTMLInputElement>(null);

    return (
    <form className="input"
    onSubmit={(e) => {
        handleAdd(e);
        inputRef.current?.blur();
    }}>
        <input      
            ref={inputRef}
            type="input"  
            placeholder='Enter a task' 
            className='input_box'
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
        />
        <button className="input_submit" type='submit'>GO</button>
    </form>
  )
}

export default InputFiled