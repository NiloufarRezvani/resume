import './Content.css'
import { TaskContext } from '../App.jsx';
import TaskItems from '../components/taskItems.jsx'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { useContext } from 'react';
function Content() {
    const { 
        todos, 
        setTodos, 
        handleDeleteItem,
        toggleTodoCompletion, 
        updateTodoText, 
        mode,
        activeFilter,
        filteredTodos,
        handleFilterChange ,
        
    } = useContext(TaskContext);
    const allCount = todos.length;
    const completedCount = todos.filter(todo => todo.completed).length;
    const todoCount = todos.filter(todo => !todo.completed).length;
    const handleDragEnd = ({ destination, source }) => {
        if (!destination) return;
        const sourceItem = filteredTodos[source.index];
        const allItems = Array.from(todos);
        const sourceIndex = allItems.findIndex(item => item.id === sourceItem.id);
        const destinationIndex = sourceIndex + (destination.index - source.index);
        const [removed] = allItems.splice(sourceIndex, 1);
        allItems.splice(destinationIndex, 0, removed);
        setTodos(allItems);
        localStorage.setItem('todos', JSON.stringify(allItems));
        
    };
    return (
        <>
            <DragDropContext onDragEnd={handleDragEnd}>
                <div className="list-text">
                    {filteredTodos.length ? (
                        <Droppable droppableId="todos">
                            {(provided) => (
                                <div 
                                    className="todoList"
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    {filteredTodos.map((item, index) => (
                                        <Draggable
                                            key={item.id}
                                            draggableId={String(item.id)}
                                            index={index}
                                        >
                                            {(provided, snapshot) => (
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className={`drag-item todoList ${snapshot.isDragging ? 'dragging' : ''}`}
                                                >
                                                    <TaskItems
                                                        title={item.title || ''}
                                                        onDelete={() => handleDeleteItem(item.id)}
                                                        darkMode={mode}
                                                        id={item.id}
                                                        toggle={() => toggleTodoCompletion(item.id)}
                                                        completed={item.completed}
                                                        updateText={updateTodoText}
                                                        key={item.id}
                                                    />
                                                </div>
                                            )}
                                        </Draggable>
                                    ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    ) : (
                        <div>Your list is empty</div>
                    )}
                </div>
            </DragDropContext>
            <ul className="flex font-serif font-medium gap-96 font-family">
                <li 
                    className={`cursor-pointer ${activeFilter === 'all' ? 'text-blue-500 font-bold' : ''}`}
                    onClick={() => handleFilterChange('all')}
                >
                    All({allCount})
                </li>
                <li 
                    className={`cursor-pointer ${activeFilter === 'completed' ? 'text-blue-500 font-bold' : ''}`}
                    onClick={() => handleFilterChange('completed')}
                >
                    Completed({completedCount})
                </li>
                <li 
                    className={`cursor-pointer ${activeFilter === 'todo' ? 'text-blue-500 font-bold' : ''}`}
                    onClick={() => handleFilterChange('todo')}
                >
                    Todo({todoCount})
                </li>
            </ul>
        </>
    );
}

export default Content;