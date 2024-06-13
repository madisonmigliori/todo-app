import { useId, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
import Toggle from "react-toggle";
import { v4 as uuid } from "uuid";
import "./App.css";
import TodoCard from "./components/TodoCard";

// creating a schema for strings
const taskSchema = z.object({
  todo: z.string().min(1, "Please enter at least 1 character."),
});

type Schema = z.infer<typeof taskSchema>;

export interface Task {
  id: string;
  message: string;
  completed: boolean;
}

// functions needed:

// addTask(); STATUS: done
// deleteTask(): STATUS: need help with embedding in TodoCard component
// handleChange(): STATUS: need help with embedding in TodoCard component

// showAll(); //STATUS: (pseudocode is there) dependent on checkbox
// showActive();//STATUS: (pseudocode is there) dependent on checkbox
// showCompleted(); //STATUS: (pseudocode is there) dependent on checkbox
// clearCompleted();// STATUS: (pseudocode is there) dependent on checkbox
// showNumTaskLeft() // STATUS: ???

// draggable(); (bonus)
// darkMode();
// format(); for mobile/desktop

function App() {
  // () => {}
  // eventFunction
  const [tasks, setTasks] = useState<Task[]>([]);
  const [views, setViews] = useState("All"); //for the states (ask STEVEN if need this -> filter map (possibly))
  const [mode, setMode] = useState("darkMode");

  // Create variable i.e. filteredTasks = tasks.filter((task) => if(views === blank) {compare task.completed === blank})

  const { register, handleSubmit, reset, formState } = useForm<Schema>({
    resolver: zodResolver(taskSchema),
  });

  const onSubmit = (data: Schema) => {
    setTasks([...tasks, { id: uuid(), message: data.todo, completed: false }]);
    reset({ todo: "" });
  };

  //check mark
  function handleChange(id: string) {
    const updatedTasks = tasks.map((task) => {
      if (id == task.id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTasks);
  }

  const deleteTask = (id: string) => {
    const newTasks = tasks.filter((task) => id !== task.id);
    setTasks(newTasks);
  };

  const clearCompleted = (id: string) => {
    if (tasks.filter((task) => id !== task.id)) {
      const newTasks = tasks.filter((task) => task.completed !== true);
      setTasks(newTasks);
    }
  };

  //changeView
  // const changeView = () => {
  //   // All: task,
  //   // Active:!task.completed,
  //   // Completed: task.completed,
  // };

  //TO-DO: need to figure out a way to filter
  const showAll = () => {
    setTasks([...tasks]);
  };

  const showActive = () => {
    const newTasks = tasks.filter((task) => task.completed !== true);
    setTasks(newTasks);
  };

  const showCompleted = () => {
    const newTasks = tasks.filter((task) => task.completed !== false);
    setTasks(newTasks);
  };

  //

  console.log(tasks); //use for testing

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
                  {...register("todo")}
                  id="create-task"
                  placeholder="Create a new todo.."
                  type="text"
                />
                <span>{formState.errors.todo?.message}</span>
              </form>
            </div>
          </div>
          <div>
            <div className="list">
              <section className="list-container">
                <ul className="list-items">
                  {tasks.map((task) => (
                    <TodoCard
                      todo={task}
                      key={task.id}
                      deleteTask={deleteTask}
                      handleChange={handleChange}
                    />
                  ))}

                  <div className="counter" />
                  <div className="counter-container">
                    <p>
                      {tasks.length} items left{" "}
                      {tasks.map((task) => (
                        <button
                          key={task.id}
                          onClick={() => clearCompleted(task.id)}
                          className="clearCompleted"
                        >
                          Clear Completed
                        </button>
                      ))}
                    </p>
                  </div>
                </ul>
              </section>
            </div>
          </div>
          <div className="task">
            <div className="task-counters">
              <button className="showAll" onClick={showAll}>
                All
              </button>
              <button className="showActive" onClick={showActive}>
                Active
              </button>
              <button className="showCompleted" onClick={showCompleted}>
                Completed
              </button>
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
            . Coded by{" "}
            <a href="https://github.com/madisonmigliori/todo-app">Madison</a>.
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
