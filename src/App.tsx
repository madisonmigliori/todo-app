import { useId, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import "./App.css";
import TodoCard from "./components/TodoCard";

// creating a schema for strings
const taskSchema = z.object({
  toDo: z.string().min(1, "Please enter at least 1 character."),
});

type Schema = z.infer<typeof taskSchema>;

interface Task {
  id: number;
  toDo: string;
  completed: boolean;
}

function App() {
  // () => {}
  // eventFunction
  const [tasks, setTasks] = useState<Task[]>([]);

  const { register, handleSubmit, reset, formState } = useForm<Schema>({
    resolver: zodResolver(taskSchema),
  });

  let id = 0;

  const onSubmit = (data: Schema) => {
    const nextId = id + 1;
    id = id + 1;

    setTasks([...tasks, { id: nextId, toDo: data.toDo, completed: false }]);
    reset({ toDo: "" });
  };

  console.log(tasks);
  // Pull in string from input
  // Add string to the task object
  // Add id to task object
  // Add order, probably just use length of tasks and add 1
  // Add completed: false to task object
  // Add task object to tasks

  // functions needed:
  // addTask();
  // showTask();
  // deleteTask():
  // showAll();
  // showActive();
  // showCompleted();
  // clearCompleted();
  // draggable();
  // darkMode();

  return (
    <main>
      <div className="main-container">
        <picture>
          <source srcSet="/bg-desktop-dark.jpg" media="(min-width:100px)" />
          <img src="/bg-desktop-dark.jpg" alt="background-dark" />
        </picture>
        <div className="main-container">
          <div className="todo-container">
            {/* No To-dos: Have empty Block */}
            <h1 className="todo">T O D O</h1>
            <button className="mode">
              <img className="icon" src="/icon-sun.svg" alt="icon-sun" />
            </button>
          </div>
          <div className="task-container">
            <div className="create-task">
              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  {...register("toDo")}
                  id="create-task"
                  placeholder="Create a new todo.."
                  type="text"
                />
                <span>{formState.errors.toDo?.message}</span>
                <button type="submit">submit</button>
              </form>
            </div>
          </div>
          <div>
            <div className="list-container">
              <section className="list">
                <ul className="list-items" draggable="true">
                  <TodoCard />
                </ul>
              </section>
              <div className="counter" />
              <div className="counter-container">
                <p>
                  items left{" "}
                  <button className="clearCompleted">Clear Completed</button>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="task">
          <div className="task-counters">
            <button className="showAll">All</button>
            <button className="showActive">Active</button>
            <button className="showCompleted">Completed</button>
          </div>
        </div>

        <div className="reorder">
          <p>Drag and drop to reorder list</p>
        </div>

        {/* Add dynamic number

    items left All Active Completed Clear Completed Drag and drop to reorder
    list */}

        <div className="attribution">
          Challenge by
          <a
            href="https://www.frontendmentor.io?ref=challenge"
            target="_blank"
            rel="noreferrer"
          >
            Frontend Mentor
          </a>
          . Coded by <a href="#">hello</a>.
        </div>
      </div>
    </main>
  );
}

export default App;
