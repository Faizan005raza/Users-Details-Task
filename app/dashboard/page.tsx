'use client'
import { useState, useRef, useEffect, useCallback } from "react";
interface Task {
  id: number;
  content: string;
}

interface BoardState {
  [key: string]: Task[];
}

const initialBoard: BoardState = {
  todo: [
    { id: 1, content: "Design the initial layout" },
    { id: 2, content: "Implement drag-and-drop feature" },
  ],
  inProgress: [{ id: 3, content: "Integrate mock API endpoint" }],
  done: [{ id: 4, content: "Setup Next.js project structure" }],
};

const getUpdatedBoardOnMove = (
  prevBoard: BoardState,
  taskId: number,
  currentColumn: string,
  targetColumn: string
): BoardState => {
  let taskToMove: Task | undefined;

  const updatedSourceColumn = prevBoard[currentColumn].filter((task) => {
    if (task.id === taskId) {
      taskToMove = task;
      return false;
    }
    return true;
  });

  if (!taskToMove) return prevBoard;

  const updatedTargetColumn = [...prevBoard[targetColumn], taskToMove];

  return {
    ...prevBoard,
    [currentColumn]: updatedSourceColumn,
    [targetColumn]: updatedTargetColumn,
  };
};

const App = () => {
  const [board, setBoard] = useState<BoardState>(initialBoard);
  const [newTaskContent, setNewTaskContent] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const moveTask = useCallback(
    (taskId: number, currentColumn: string, targetColumn: string) => {
      if (!board[targetColumn]) return;

      setBoard((prevBoard) =>
        getUpdatedBoardOnMove(prevBoard, taskId, currentColumn, targetColumn)
      );
    },
    [board]
  );

  const addTask = () => {
    const content = newTaskContent.trim();
    if (content === "") return;

    const newTask: Task = {
      id: Date.now(),
      content: content,
    };

    setBoard((prevBoard) => ({
      ...prevBoard,

      todo: [...prevBoard.todo, newTask],
    }));

    setNewTaskContent("");

    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const TaskCard = ({
    task,
    columnKey,
    isLastColumn,
  }: {
    task: Task;
    columnKey: string;
    isLastColumn: boolean;
  }) => {
    const nextColumnKey = isLastColumn
      ? "done"
      : columnKey === "todo"
      ? "inProgress"
      : "done";

    return (
      <div className="bg-white p-3 rounded-lg shadow-md mb-2 flex justify-between items-center transition-all hover:shadow-lg">
        <p className="text-sm font-medium text-gray-700">{task.content}</p>

        {!isLastColumn && (
          <button
            onClick={() => moveTask(task.id, columnKey, nextColumnKey)}
            className="ml-4 p-1 rounded-full bg-indigo-100 text-indigo-600 hover:bg-indigo-200 transition duration-150 text-xs font-bold"
            aria-label={`Move task ${task.id} to ${nextColumnKey}`}
          >
            {columnKey === "todo" ? "Start ➡️" : "Finish ✅"}
          </button>
        )}
      </div>
    );
  };

  const Column = ({
    title,
    tasks,
    columnKey,
    isLastColumn,
  }: {
    title: string;
    tasks: Task[];
    columnKey: string;
    isLastColumn: boolean;
  }) => (
    <div className="flex-1 min-w-[300px] bg-gray-100 p-4 rounded-xl shadow-inner max-h-[80vh] overflow-y-auto">
      <h2
        className={`text-xl font-bold mb-4 ${
          columnKey === "todo"
            ? "text-red-600"
            : columnKey === "inProgress"
            ? "text-yellow-600"
            : "text-green-600"
        }`}
      >
        {title} ({tasks.length})
      </h2>
      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            columnKey={columnKey}
            isLastColumn={isLastColumn}
          />
        ))}
      </div>
    </div>
  );

  const columnKeys = Object.keys(board);

  return (
    <div className="min-h-screen p-8 bg-gray-50 font-sans">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold text-gray-700 mb-2">
          Project Dashboard
        </h1>
        <p className="text-lg text-gray-500">
          Built with React Hooks: useState, useEffect, useRef, and useCallback.
        </p>
      </header>

      <div className="max-w-3xl mx-[30%] mb-10 p-5 bg-white rounded-xl shadow-lg space-x-4">
        <input
          type="text"
          placeholder="Enter new task description..."
          value={newTaskContent}
          onChange={(e) => setNewTaskContent(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") addTask();
          }}
          className="p-3 border-2 border-indigo-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-150 w-full"
        />
        <button
          onClick={addTask}
          className="px-6 py-3 mx-64 mt-5 p-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-150 disabled:opacity-50"
          disabled={!newTaskContent.trim()}
        >
          Add Task
        </button>
      </div>

      <div className="max-w-7xl mx-auto flex flex-wrap lg:flex-nowrap gap-6 justify-center">
        {columnKeys.map((key, index) => (
          <Column
            key={key}
            columnKey={key}
            title={key === "todo" ? "In Progress" : "Done"}
            tasks={board[key]}
            isLastColumn={index === columnKeys.length - 1}
          />
        ))}
      </div>
    </div>
  );
};
export default App;
