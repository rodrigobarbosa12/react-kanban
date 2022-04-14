import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import Task from './Task';
import { Task as TypeTask, Column as TypeColumn } from './Kanban';

interface Props {
  tasks: TypeTask;
  columns: TypeColumn;
  columnOrder: string[];
  onDragEnd: (x: DropResult) => void;
}

const Column = ({ tasks, columns, columnOrder, onDragEnd }: Props) => (
  <DragDropContext onDragEnd={onDragEnd}>
    {columnOrder.map((columnId: string) => {
      const column = columns[columnId];
      const tasks2 = column.taskIds.map((taskId: string) => tasks[taskId]);

      return (
        <div key={column.id} className="col-12 col-lg-6 col-xl-3">
          <div className="card card-border-primary">
            <div className="card-header">
              <h5 className="card-title">
                {column.title}
              </h5>
            </div>
            <Task tasks2={tasks2} column={column} />
          </div>
        </div>
      )
    })}
  </DragDropContext>
);

export default Column;
