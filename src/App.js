import './App.scss';
import { useState } from 'react';

function App() {
  const dataMock = []
  const [data, setData] = useState(dataMock);
  const [inputValue, setInputValue] = useState('')

  const handleAddClick = (evt) => {
    evt.preventDefault();

    if (!inputValue) {
      console.log('Please fill all the required input fields');
      return;
    }
    fetch('/api/notes', {
      method: 'POST',
      body: JSON.stringify({
        title: inputValue,
        body: inputValue,
      }),
    }).then((res) => res.json())
      .then((res) => {
        setData([...data, res.notes])
        console.log('Note added successfully');
      })
      .catch((error) => {
        console.log('Error adding note.', error);
      });

    setInputValue('');
  }

  const handleDeleteClick = (evt, id) => {
    const newItemList = data.filter (item => item.id !== id);
    setData(newItemList);
    fetch(`/api/notes/${id}`, {
      method: 'DELETE',
    })
  }

  return (
    <div className="todo">
            <form>
                <input type={"text"}/>
                <button >Войти</button>
            </form>
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
