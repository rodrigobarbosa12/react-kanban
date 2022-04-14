import { useState } from 'react';
import { DropResult } from 'react-beautiful-dnd';
import Column from './Column';

const content = 'Curabitur ligula sapien, tincidunt non, euismod vitae, posuereimperdiet, leo. Maecenas malesuada';

export interface Column {
  [x: string]: {
    id: string;
    title: string;
    taskIds: string[];
  }
}

export interface Task {
  [x: string]: {
    id: string;
    content: string;
  }
}

function App() {
  const [columns, setColumns] = useState<Column>({
    'column-1': {
      id: 'column-1',
      title: 'Preparação',
      taskIds: ['task-1', 'task-2', 'task-3'],
    },
    'column-2': {
      id: 'column-2',
      title: 'Avaliação',
      taskIds: ['task-5'],
    },
    'column-3': {
      id: 'column-3',
      title: 'Finalização',
      taskIds: ['task-6'],
    },
    'column-4': {
      id: 'column-4',
      title: 'Cancelados',
      taskIds: ['task-4'],
    },
  });

  const tasks: Task = {
    'task-1': { id: 'task-1', content },
    'task-2': { id: 'task-2', content },
    'task-3': { id: 'task-3', content },
    'task-4': { id: 'task-4', content },
    'task-5': { id: 'task-5', content },
    'task-6': { id: 'task-6', content },
  };

  const columnOrder = ['column-1', 'column-2', 'column-3', 'column-4'];

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId
      && destination.index === source.index
    ) {
      return;
    }

    const start = columns[source.droppableId];
    const finish = columns[destination.droppableId];

    // Move para a mesma coluna
    if (start === finish) {
      const newTaskId = Array.from(start.taskIds);
      newTaskId.splice(source.index, 1);
      newTaskId.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskId,
      };

      const newState = {
        ...columns,
        [newColumn.id]: newColumn,
      };

      setColumns(newState);
      return;
    }

    // Move de uma coluna para outra
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);

    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds);
    finishTaskIds.splice(destination.index, 0, draggableId);

    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...columns,
      [newStart.id]: newStart,
      [newFinish.id]: newFinish,
    };

    setColumns(newState);
  };

  return (
    <main className="content">
      <div className="container p-4">
        <h1 className="h3 mb-3">
          Kanban
        </h1>
        <div className="row">
          <Column
            tasks={tasks}
            columns={columns}
            columnOrder={columnOrder}
            onDragEnd={onDragEnd}
          />
        </div>
      </div>
    </main>
  );
}

export default App;
