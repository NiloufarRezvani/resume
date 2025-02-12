import { useState, createContext, } from 'react'
import './App.css'
import Content from './components/Content'
import Header from './components/Header'
import Layout from './components/Layout'
import Input from './components/Input'
import { useLocalStorage } from './components/hooks/useLocalStorage'
// eslint-disable-next-line react-refresh/only-export-components
export const TaskContext = createContext();
function App() {
  const [todos, setTodos] = useLocalStorage('todos', []);
  const [value, setValue] = useState("")
  const [mode, setMode] = useState(false)
  const [activeFilter, setActiveFilter] = useState('all')
  const handleTodo = () => {
    if (value.length) {
      const todo = {
        title: value,
        id: Math.random(),
        completed: false  }
      setTodos(prevTodos => [...prevTodos, todo])
      console.log(todos);
      setValue("") 
     }}
  const handleDeleteItem = (selectedId) => {
    const newTodo = todos.filter((item) => item.id !== selectedId)
    setTodos(newTodo)
  }
  const toggleTodoCompletion = (id) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };
  const getFilteredTodos = () => {
    switch (activeFilter) {
      case 'completed':
        return todos.filter(todo => todo.completed)
      case "todo":
        return todos.filter(todo => !todo.completed)
      default:
        return todos
    }
  }
  const filteredTodos = getFilteredTodos();
  const handleFilterChange = (filterType) => {
    setActiveFilter(filterType);
  };
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleTodo()
      setValue('')
    }
  }
  const handleMode = () => {
    setMode(!mode);
  }
//   const updateTodoText = (id, text) => {
//     const foundTodoIndex = todos.findIndex(todo => todo.id === id);
//     if (foundTodoIndex !== -1) {
//         const copiedTodos = [...todos];
//         const copiedTodo = { ...copiedTodos[foundTodoIndex] };
//         copiedTodo.title = text; // Update the title
//         copiedTodos[foundTodoIndex] = copiedTodo; // Replace the old todo with the updated one
//         setTodos(copiedTodos);
//         localStorage.setItem('todos', JSON.stringify(copiedTodos)); // Update localStorage
//     }
//     console.log("updated list", { text });
// };
const updateTodoText = (id, text) => {
  setTodos(prevTodos =>
      prevTodos.map(todo =>
          todo.id === id ? { ...todo, title: text } : todo
      )
  );
};
  
  return (
    <TaskContext.Provider value={{
      todos,
      setTodos,
      mode, handleMode,
      handleDeleteItem,
      toggleTodoCompletion,
      updateTodoText,
      activeFilter,
      setActiveFilter,
      filteredTodos,
      handleFilterChange
    }}>
      <div>
        <Layout mode={mode}>
          <Header />
          <Content />
          <Input value={value}
           setValue={setValue} handleTodos={handleTodo} keyDown={handleKeyPress} 
          mode={mode} />
        </Layout>
      </div>
    </TaskContext.Provider>

  )
}

export default App




//drak and drop~~~~>done
//responsive
//diffrent parts all,completed,pendig~~~>done
//editing each item~~~~>done~~~~~>in moheme dooobare yadesh begir
//localStorage
//hame done shood shadi koone