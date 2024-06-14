import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useMediaQuery } from "react-responsive";
import { z, type any } from "zod";

import { zodResolver } from "@hookform/resolvers/zod";
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
// deleteTask(): STATUS: done
// handleChange(): STATUS: done

// showAll(); //STATUS: done
// showActive();//STATUS: done
// showCompleted(); //STATUS: done
// clearCompleted();// STATUS: done
// showNumTaskLeft() // STATUS: done

// draggable(); (bonus) https://www.geeksforgeeks.org/drag-and-drop-sortable-list-using-reactjs/
// darkMode(); STATUS:
// format(); for mobile/desktop

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [views, setViews] = useState("All"); //for the statess
  const [modes, setModes] = useState("darkMode");

  const sortedTasks = useMemo(() => changeView(tasks, views), [tasks, views]);

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

  const clearCompleted = () => {
    const newTasks = tasks.filter((task) => task.completed !== true);
    setTasks(newTasks);
  };

  function changeView(tasks: Task[], views: string) {
    return tasks.filter((task: Task) => {
      if (views === "All") {
        return true;
      } else if (views === "Active") {
        return !task.completed;
      } else if (views === "Completed") {
        return task.completed;
      }
    });
  }

  const numTasks = tasks.filter((task) => task.completed !== true);

  const changeModes = () => {
    if (modes === "lightMode") {
      setModes("darkMode");
    } else {
      setModes("lightMode");
    }
  };

  console.log(tasks); //use for testing

  return (
    <main>
      <div className={modes ? "dark-mode" : ""}>
        <div className="main-container">
          <picture className="bg-img">
            <source
              srcSet="/bg-desktop-dark.jpg"
              media="(prefers-color-scheme: light)"
            />
            <img src="/bg-desktop-light.jpg" alt="background-dark" />
          </picture>
          <div className="main-container">
            <div className="todo-container">
              {/* No To-dos: Have empty Block */}
              <h1 className="todo">T O D O</h1>
              <button
                className="button-mode"
                onClick={() => {
                  changeModes();
                }}
              >
                {modes === "darkMode" ? (
                  <img className="icon" src="/icon-sun.svg" alt="icon-sun" />
                ) : (
                  <img className="icon" src="/icon-moon.svg" alt="icon-moon" />
                )}
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
                    {sortedTasks.map((task: Task) => (
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
                        {numTasks.length} items left{" "}
                        <button
                          onClick={() => clearCompleted()}
                          className="clearCompleted"
                        >
                          Clear Completed
                        </button>
                      </p>
                    </div>
                  </ul>
                </section>
              </div>
            </div>
            <div className="task">
              <div className="task-counters">
                <button className="showAll" onClick={() => setViews("All")}>
                  All
                </button>
                <button
                  className="showActive"
                  onClick={() => setViews("Active")}
                >
                  Active
                </button>
                <button
                  className="showCompleted"
                  onClick={() => setViews("Completed")}
                >
                  Completed
                </button>
              </div>
            </div>

            <div className="reorder">
              <p>Drag and drop to reorder list</p>
            </div>

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
      </div>
    </main>
  );
}

export default App;
