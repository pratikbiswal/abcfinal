import React from "react";
import { Droppable } from "react-beautiful-dnd";
import Task from "./Task";

const Column = ({ column, tasks, onEditTask, onDeleteTask }) => {
  return (
    <div className="column">
      <h2>{column.title}</h2>
      <Droppable droppableId={column.id}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{
              background: "var(--column-background)",
              padding: "8px",
              borderRadius: "4px",
              minHeight: "100px",
            }}
          >
            {tasks.map((task, index) => (
              <Task
                key={task.id}
                task={task}
                index={index}
                onEditTask={onEditTask}
                onDeleteTask={onDeleteTask}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
