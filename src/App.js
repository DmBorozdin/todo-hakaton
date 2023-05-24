import './App.scss';
import { useState } from 'react';

function App() {
  const dataMock = [
    {title: 'купить молоко', id: 1},
    {title: 'сходить в спорт зал', id: 2}
  ]
  const [data, setData] = useState(dataMock);
  const [inputValue, setInputValue] = useState('')

  const handleAddClick = (evt) => {
    evt.preventDefault();
    console.log(inputValue);
    setData([...data,
      {
      title: inputValue,
      id: data.length + 1,
    }])
    setInputValue('');
  }

  const handleDeleteClick = (evt, id) => {
    const newItemList = data.filter (item => item.id !== id);
    setData(newItemList);
  }

  return (
    <div className="todo">
      <header className="todo-header">
        <h1 className='title'>Todo</h1>
        <ul>
          {data.map(elem => (
            <li className='todo-element' key={elem.id}>
              <div>- {elem.title}</div> 
              <div className='del-elem' onClick={evt => handleDeleteClick(evt, elem.id)}>Удалить</div>
            </li>
          ))}
        </ul>
        <div className='add-wrap'>
          <input className='input' onChange={evt => setInputValue(evt.target.value)} value={inputValue} placeholder="Введите задачу"></input>
          <button type='submit' onClick={handleAddClick}>Добавить</button>
        </div>
      </header>
    </div>
  );
}

export default App;
