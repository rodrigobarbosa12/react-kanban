import { Droppable, Draggable } from 'react-beautiful-dnd';

interface Props {
  tasks2: {
    id: string;
    content: string;
  }[];
  column: {
    id: string;
    title: string;
    taskIds: string[];
  };
}

interface Colors {
  [x: string]: string;
}

const colors: Colors = {
  'task-1': 'rgb(255 244 222 / 50%)',
  'task-2': 'rgb(225 233 255 / 50%)',
  'task-3': 'rgb(201 247 245 / 50%)' ,
  'task-4': 'rgb(255 226 229 / 50%)',
  'task-5': 'rgb(225 233 255 / 50%)',
  'task-6': 'rgb(255 244 222 / 50%)',
};

const Task = ({ column, tasks2 }: Props) => (
  <Droppable
    droppableId={column.id}
    direction="vertical"
  >
    {(provided, snapshot) => (
      <div
        className="card-body p-3"
        style={{ backgroundColor: snapshot.isDraggingOver ? 'skyblue' : 'white' }}
      >
        <div ref={provided.innerRef} {...provided.droppableProps}>
          {tasks2.map((task, index) => {
            const isDragDisable = task.id === 'task-2';

            return (
              <Draggable
                draggableId={task.id}
                isDragDisabled={isDragDisable}
                index={index}
                key={task.id}
              >
                {(provided2, snapshot2) => (
                  <div
                    className="card mb-3"
                    {...provided2.draggableProps}
                    {...provided2.dragHandleProps}
                    ref={provided2.innerRef}
                  >
                    <div
                      className="btn card-body p-0 d-flex align-items-center"
                      style={{
                        backgroundColor: isDragDisable
                          ? 'rgb(239 239 239 / 50%)'
                          : snapshot2.isDragging ? 'lightgreen' : colors[task.id],
                      }}
                    >
                      <p style={{ color: isDragDisable ? '#9999996b' : '' }}>
                        {task.content}
                      </p>
                    </div>
                  </div>
                )}
              </Draggable>
            )
          })}
          {provided.placeholder}
        </div>
      </div>
    )}
  </Droppable>
);

export default Task;
