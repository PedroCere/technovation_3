// features/calendar/TaskDragBlock.jsx
import { useDrag } from 'react-dnd';

const TaskDragBlock = ({ task }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'TASK',
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging()
    })
  }));

  return (
    <div
      ref={drag}
      className={`p-3 mb-2 rounded-lg border cursor-move ${isDragging ? 'opacity-50' : 'opacity-100'} bg-white shadow-sm`}
    >
      <h4 className="font-medium">{task.title}</h4>
      <p className="text-sm text-gray-500">{task.dueDate}</p>
    </div>
  );
};

export default TaskDragBlock;