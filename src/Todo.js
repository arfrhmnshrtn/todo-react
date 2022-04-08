import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import {useState} from 'react';
function Todo() {

    
    const [activity, setActivity] = useState('');
    const [todos, setTodos] = useState([]);
    const [edit, setEdit] = useState({});
    const [check, setcheck] = useState('');
     

    // get date from id todos
    function getDate() {
        return Date.now();
    }


    function saveTodoHandler(event) {
        event.preventDefault();

        if (!activity) {
            setcheck('Tidak ada Activity!!!');
            return;
        }
        setcheck('');

        if (edit.id) {
            const editTodo = {
                ...edit,
                activity
            }

            const findIndexTodo = todos.findIndex(todo => {
                return todo.id === edit.id;
            });

            const duplicateTodos = [
                ...todos
            ]

            duplicateTodos[findIndexTodo] = editTodo;
            setTodos(duplicateTodos);

            setActivity('');
            setEdit('');

            return;
        }

        setTodos([...todos, {
            id: getDate(),
            activity,
            done: false
        }]);
        setActivity('');

    }

    function deleteTodoHandler(todosId) {
        const filterTodos = todos.filter((todo) => {
            return todosId !== todo.id;
        });

        setTodos(filterTodos);
        setActivity('');
        setEdit('');
    }

    function editTodosHandler(el) {
        setActivity(el.activity);
        setEdit(el);
        
    }

    function cancelTodoHandler() {
        setActivity('');
        setEdit('');
    }

    function checkTodosHandler(todo) {
        const editTodo = {
            ...todo,
            done: todo.done ? false : true
        }

        const findIndexTodo = todos.findIndex(currentTodo => {
            return currentTodo.id === todo.id
        });

        const duplicateTodos = [
            ...todos
        ]

        duplicateTodos[findIndexTodo] = editTodo;
        setTodos(duplicateTodos);
    }

    

    return (
        <div className="container">

            <h3 className="text-center mt-3 mb-3">Simple Todo App</h3>
            <form action="" onSubmit={saveTodoHandler}>
                <p className='text-danger fs-6 fst-italic'>{check}</p>
                <div className="input-group mb-3">
                    <input type="text" className="form-control" value={activity} placeholder="Masukan Tugas" aria-label="Recipient's username" aria-describedby="button-addon2"
                        onChange={(e) => {
                            setActivity(e.target.value);
                        }}
                    />
                    <button className="btn btn-outline-secondary" type="submit" id="button-addon2">{edit.id ? 'Simpan Peubahan' : 'Tambah'}</button>
                    {edit.id && <button className="btn btn-outline-secondary ms-1" onClick={cancelTodoHandler}>Cancel</button>}
                </div>
            </form>
            <ul className="list-group">
                {todos.map(todo => {
                    return (
                        <li className="list-group-item d-flex justify-content-between align-items-center" key={todo.id}>
                            <div className="title">
                                <p className='fw-bold fs-5'>
                                    <input
                                        className='me-3'
                                        type="checkbox"
                                        value={todo.done}
                                        onChange={checkTodosHandler.bind(this, todo)}
                                    />
                                    {todo.done ? <span><s>{todo.activity}</s></span> : <span>{todo.activity}</span>}
                                    <span className='me-2'>({todo.done ? 'selesai' : 'belum selesai'})</span>
                                </p>
                            </div>
                            <div className="btn-group">
                                <button type="button" className="btn btn-success me-3" onClick={editTodosHandler.bind(this, todo)}>Edit</button>
                                <button type="button" className="btn btn-danger" onClick={deleteTodoHandler.bind(this, todo.id)}>Delete</button>
                            </div>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
export default Todo;