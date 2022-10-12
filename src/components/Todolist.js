import React, { useCallback, useRef, useState } from 'react';
import { AgGridReact } from'ag-grid-react'
import'ag-grid-community/dist/styles/ag-grid.css'
import'ag-grid-community/dist/styles/ag-theme-material.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

function Todolist() {
  const [todo, setTodo] = useState({description: '', date: '', priority:''});
  const [todos, setTodos] = useState([]);
  const gridRef = useRef();

  const inputChanged = (event) => {
    setTodo({...todo, [event.target.name]: event.target.value});
  }

  const addTodo = (event) => {
    setTodos([...todos, todo]);
  }

  const deleteTodo = () => {
    if (gridRef.current.getSelectedNodes().length > 0) { 
           setTodos(todos.filter((todo, index) =>
            index !== gridRef.current.getSelectedNodes()[0].childIndex))  }
    else {
        alert('Select row first');  
        }
    }
    const onSelectionChanged = useCallback(() => {
        const selectedRows = gridRef.current.api.getSelectedRows();
        document.querySelector('#selectedRows').innerHTML =
          selectedRows.length === 1 ? selectedRows[0].description : '';
      }, []);

  const columns = [
        { field: "description", sortable: true, filter: true, floatingFilter: true },
        { field: "date", sortable: true, filter: true, floatingFilter: true },
        { field: "priority", sortable: true, filter: true, floatingFilter: true,
        cellStyle: params => params.value === "High" ? {color: 'red'} : {color: 'black'}}
    ]

  return (
    <div>
      <input type="text" onChange={inputChanged} placeholder="Description" name="description" value={todo.description}/>
      <input type="date" onChange={inputChanged} placeholder="Date" name="date" value={todo.date}/>
      <input type="text" onChange={inputChanged} placeholder="Priority" name="priority" value={todo.priority}/>
      <button onClick={addTodo}>Add</button>
      <button onClick={deleteTodo}>Delete</button>
      <div className="example-header">
          Selection:
          <span id="selectedRows"></span>
        </div>
      <div
              id="animationCountdown"
              className="transition-width"
              style={{ backgroundColor: 'grey', height: '100%', width: '0%' }}
            ></div>
        <div
        className="ag-theme-alpine"
        style={{
            height: '700px',
            width: '600px',
            margin: 'auto'}}>
        <AgGridReact
            ref={gridRef}
            onGridReady={ params => gridRef.current = params.api }
            rowSelection="single"
            animateRows={true}
            columnDefs={columns}
            rowData={todos}
            onSelectionChanged={onSelectionChanged}>
            
        </AgGridReact> 
        </div>
    </div>
  );
};

export default Todolist;