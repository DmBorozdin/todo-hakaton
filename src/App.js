import './App.scss';
import { useState } from 'react';
import { toast } from 'react-toastify';

function App() {
  const dataMock = [
    {title: 'купить молоко', id: 1},
    {title: 'сходить в спорт зал', id: 2}
  ]
  const [data, setData] = useState(dataMock);
  const [inputValue, setInputValue] = useState('')

  const handleAddClick = (evt) => {
    evt.preventDefault();

    if (!inputValue) {
      toast.error('Please fill all the required input fields');
      return;
    }
    fetch('/api/notes', {
      method: 'POST',
      body: JSON.stringify({
        title: inputValue,
        body: inputValue,
      }),
    })
      .then((res) => {
        console.log(res.json());
        setData([...data,
          {
          title: inputValue,
          id: data.length + 1,
        }])
        toast.success('Note added successfully');
      })
      .catch((error) => {
        console.log('Error adding note.', error);
        toast.error('Error adding note.');
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
