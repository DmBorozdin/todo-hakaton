import './App.scss';

function App() {
  const data = [
    {title: 'купить молоко', id: 1},
    {title: 'сходить в спорт зал', id: 2}
  ]
  return (
    <div className="todo">
      <header className="todo-header">
        <h1 className='title'>Todo</h1>
        <ul>
          {data.map(elem => (
            <li className='todo-element' key={elem.id}>
              <div>- {elem.title}</div> 
              <div className='del-elem'>Удалить</div>
            </li>
          ))}
        </ul>
        <div className='add-wrap'>
          <input className='input'></input>
          <button type='submit'>Добавить</button>
        </div>
      </header>
    </div>
  );
}

export default App;
