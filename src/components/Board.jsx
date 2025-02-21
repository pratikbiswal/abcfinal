import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import Column from "./Column";
import TaskForm from "./TaskForm";

// Initial data structure
const initialData = {
  tasks: {},
  columns: {
    "column-1": {
      id: "column-1",
      title: "To-Do",
      taskIds: [],
    },
    "column-2": {
      id: "column-2",
      title: "In Progress",
      taskIds: [],
    },
    "column-3": {
      id: "column-3",
      title: "Done",
      taskIds: [],
    },
  },
  columnOrder: ["column-1", "column-2", "column-3"],
};

// Load data from localStorage
const loadData = () => {
  const savedData = localStorage.getItem("kanban-board");
  return savedData ? JSON.parse(savedData) : initialData;
};

// Save data to localStorage
const saveData = (data) => {
  localStorage.setItem("kanban-board", JSON.stringify(data));
};

const Board = () => {
  const [data, setData] = useState(loadData()); // Load data on initial render
  const [nextTaskId, setNextTaskId] = useState(1);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    saveData(data);
  }, [data]);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    // If there's no destination, do nothing
    if (!destination) return;

    // If the task is dropped in the same place, do nothing
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const startColumn = data.columns[source.droppableId];
    const finishColumn = data.columns[destination.droppableId];

    // Moving within the same column
    if (startColumn === finishColumn) {
      const newTaskIds = Array.from(startColumn.taskIds);
      newTaskIds.splice(source.index, 1); // Remove the task from the source index
      newTaskIds.splice(destination.index, 0, draggableId); // Insert the task at the destination index

      const newColumn = {
        ...startColumn,
        taskIds: newTaskIds,
      };

      const newData = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      };

      setData(newData);
      return;
    }

    // Moving between columns
    const startTaskIds = Array.from(startColumn.taskIds);
    startTaskIds.splice(source.index, 1); // Remove the task from the source column
    const newStartColumn = {
      ...startColumn,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finishColumn.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId); // Add the task to the destination column
    const newFinishColumn = {
      ...finishColumn,
      taskIds: finishTaskIds,
    };

    const newData = {
      ...data,
      columns: {
        ...data.columns,
        [newStartColumn.id]: newStartColumn,
        [newFinishColumn.id]: newFinishColumn,
      },
    };

    setData(newData);
  };

  const handleAddTask = (newTask) => {
    const taskId = nextTaskId.toString();
    const updatedTasks = {
      ...data.tasks,
      [taskId]: {
        ...newTask,
        id: taskId,
      },
    };

    const selectedColumn = newTask.column;
    const updatedColumns = {
      ...data.columns,
      [selectedColumn]: {
        ...data.columns[selectedColumn],
        taskIds: [taskId, ...data.columns[selectedColumn].taskIds],
      },
    };

    const newData = {
      ...data,
      tasks: updatedTasks,
      columns: updatedColumns,
    };

    setData(newData);
    setNextTaskId(nextTaskId + 1);
  };

  const handleEditTask = (updatedTask) => {
    const updatedTasks = {
      ...data.tasks,
      [updatedTask.id]: updatedTask,
    };

    const newData = {
      ...data,
      tasks: updatedTasks,
    };

    setData(newData);
  };

  const handleDeleteTask = (taskId) => {
    const updatedTasks = { ...data.tasks };
    delete updatedTasks[taskId];

    const updatedColumns = { ...data.columns };
    for (const column of Object.values(updatedColumns)) {
      column.taskIds = column.taskIds.filter((id) => id !== taskId);
    }

    const newData = {
      ...data,
      tasks: updatedTasks,
      columns: updatedColumns,
    };

    setData(newData);
  };

  return (
    <div>
      <TaskForm onAddTask={handleAddTask} />
      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ display: "flex" }}>
          {data.columnOrder.map((columnId) => {
            const column = data.columns[columnId];
            const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);

            return (
              <Column
                key={column.id}
                column={column}
                tasks={tasks}
                onEditTask={handleEditTask}
                onDeleteTask={handleDeleteTask}
              />
            );
          })}
        </div>
      </DragDropContext>
    </div>
  );
};

export default Board;
