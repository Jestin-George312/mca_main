import React, { useState } from 'react';
import { DragDropContext } from '@hello-pangea/dnd';
import type { DropResult } from '@hello-pangea/dnd';
import TaskColumn from '../../components/student/tasks/TaskColumn';
import Button from '../../components/common/UI/Button';
import Card from '../../components/common/UI/Card';

export type Task = {
  id: string;
  title: string;
  priority: 'High' | 'Medium' | 'Low';
  deadline?: string;
};

type Column = {
  id: string;
  title: string;
  tasks: Task[];
};

const makeId = (prefix: string) => `${prefix}-${Math.random().toString(36).slice(2, 9)}`;

const initialColumns: Column[] = [
  {
    id: 'todo',
    title: 'Todo',
    tasks: [
      { id: makeId('t'), title: 'Define project scope', priority: 'High', deadline: new Date(Date.now() + 3 * 86400000).toISOString() },
      { id: makeId('t'), title: 'Research related work', priority: 'Medium', deadline: new Date(Date.now() + 7 * 86400000).toISOString() }
    ]
  },
  {
    id: 'inprogress',
    title: 'In Progress',
    tasks: [
      { id: makeId('t'), title: 'Implement auth mock', priority: 'Low', deadline: new Date(Date.now() + 5 * 86400000).toISOString() }
    ]
  },
  {
    id: 'done',
    title: 'Done',
    tasks: [
      { id: makeId('t'), title: 'Create repo', priority: 'Low', deadline: new Date(Date.now() - 2 * 86400000).toISOString() }
    ]
  }
];

const TaskBoard: React.FC = () => {
  const [columns, setColumns] = useState<Column[]>(initialColumns);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;
    // if dropped in same place
    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    setColumns(prev => {
      const sourceColIdx = prev.findIndex(c => c.id === source.droppableId);
      const destColIdx = prev.findIndex(c => c.id === destination.droppableId);
      if (sourceColIdx === -1 || destColIdx === -1) return prev;

      // Same column reordering
      if (sourceColIdx === destColIdx) {
        const column = { ...prev[sourceColIdx], tasks: [...prev[sourceColIdx].tasks] };
        const [moved] = column.tasks.splice(source.index, 1);
        column.tasks.splice(destination.index, 0, moved);

        const next = [...prev];
        next[sourceColIdx] = column;
        return next;
      }

      // Different column - move between columns
      const sourceCol = { ...prev[sourceColIdx], tasks: [...prev[sourceColIdx].tasks] };
      const destCol = { ...prev[destColIdx], tasks: [...prev[destColIdx].tasks] };

      // remove from source
      const [moved] = sourceCol.tasks.splice(source.index, 1);

      // insert into destination
      destCol.tasks.splice(destination.index, 0, moved);

      const next = [...prev];
      next[sourceColIdx] = sourceCol;
      next[destColIdx] = destCol;
      return next;
    });
  };

  return (
    <div className="h-[calc(100vh-64px)]">{/* take full height minus navbar (approx) */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Project Tasks</h2>
        <Button variant="primary" onClick={() => alert('Open Modal')}>New Task</Button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
          {columns.map(col => (
            <div key={col.id} className="flex flex-col h-full">
              <Card>
                <div className="flex items-center justify-between mb-2">
                  <div className="font-semibold">{col.title}</div>
                  <div className="text-sm text-[rgb(var(--color-muted))]">{col.tasks.length}</div>
                </div>
                <div className="h-full">
                  <TaskColumn id={col.id} title={col.title} tasks={col.tasks} />
                </div>
              </Card>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default TaskBoard;
