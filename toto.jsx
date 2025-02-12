import { useState } from 'react';
import './todo.css';

import { FaCheck } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const keyOfLocal_storage ="react-todo";

export const Todo = ()=>
{
    const[inputValue , setInputValue] = useState({content:""});

    // RECIVING DATA FROM LOCAL STORAGE
    const [task , setTask] = useState(()=>
    {
        const localdata = JSON.parse(localStorage.getItem(keyOfLocal_storage));
        
        if(!localdata) return[]

        return localdata;
    });

    const [dateTime , setDateTime] = useState("");


    const handelInputChange = (value) =>
    {
        setInputValue({id:value , content:value , checked:false });
    }

   
    // CREATING LIST 

    const handelFormSubmit = (event)=>
    {
        event.preventDefault();

        if (!inputValue.content.trim()) return;

        if (task.some(taskItem => taskItem.content === inputValue.content)) return;

        // we are addind the content to the task  array...
        setTask((prevTask) =>[...prevTask , inputValue])
        
        setInputValue({content:""});
    }

    //ADD DATA TO LOCAL STORAGE 
    localStorage.setItem(keyOfLocal_storage , JSON.stringify(task))

    // DATE AND TIME IN HEADER

    setInterval(()=>{

        const now = new Date();

        const formattedDate = now.toLocaleDateString();
        const formattedTime = now.toLocaleTimeString();
        setDateTime(`${formattedDate} - ${formattedTime}`)
    },1000)


    // DELETE TODO LIST FUNCTIONALITY

    const handelTodoDelete = (curTask) =>
    {
        console.log(curTask);
        const updatedtask = task.filter((curent)=> curTask !=curent);
        setTask(updatedtask); 
    }


    // CLEAR ALL FUNCTIONALITY

    const handelClearTodoData  = ()=>
    {
        setTask([]);
    }


    //Handel Checked Functionality

    const handelTodoCheck =(curTask)=>
    {
        const updatedTask = task.map((current) =>
        {
            if (current.content === curTask.content)
            {
                return { ...current, checked: !current.checked };
            }
            return current;
        });

        setTask(updatedTask);
    }



    return(<> 
    
        <section className="todo-container">
            <header>
                <h1>Todo List</h1>
                <h2>{dateTime}</h2>
            </header>
        </section>
        <section className="form">
           <form onSubmit={handelFormSubmit}>
                <div>
                     <input 
                     type="text" 
                     className="todo-input" 
                     autoComplete="off"
                     value={inputValue.content}
                     onChange={(event)=>handelInputChange(event.target.value)} 
                     />
                </div>
                 
                <div>
                    <button type="submit" className="todo-btn">Add Task</button>
                </div>
           </form>

        </section>
        <section className='myUnOrderList'>
            <ul className='todo-list'>
                {task.map((curTask , index)=>{

                            return(
                                <li key={index} className={`todo-item ${curTask.checked ? 'todo-item-checked' : ''}`}>
                                    <span>{curTask.content}</span>

                                    <button className={`check-btn `} onClick={()=>handelTodoCheck(curTask)}>
                                    <FaCheck />

                                    </button>
                                    <button className='delete-btn' onClick={()=>handelTodoDelete(curTask)}>
                                    <MdDelete />
                                    </button>
                                </li>
                            )
                        }) 
                }
            </ul>
        </section>

        <section>
            <button className='clear-btn' onClick={handelClearTodoData}>Clear All</button>
        </section>
    
    </>)
}
