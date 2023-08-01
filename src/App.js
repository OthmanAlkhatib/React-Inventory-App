// Here where we make out components
import { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './searchBar';
import AddItem from './addItem';
import ItemsDisplay from './itemsDisplay';


function App() {
  const [filters, setFilters] = useState({name: "", price: 0, type: "", brand: ""});
  const [data, setData] = useState({ items: [] });

  useEffect(() => {
    fetch("http://localhost:3000/items")
    .then((response) => response.json())
    .then((server_data) => {
      setData({items: server_data});
    })
  }, [])

  const updateFilters = (searchParams) => {
    setFilters(searchParams)
  }

  const addItemToData = (item) => {
    let items = data["items"];

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(item)
    };
    fetch("http://localhost:3000/items", requestOptions)
    .then((response) => response.json())
    .then((data) => {
      items.push(data);
      setData({ items: items })
    })
  }
  
  const filter = (items) => {
    if (filters.name !== "") {
      items = items.filter((item) => item.name === filters.name ? true : false);
    }
    if (filters.price !== 0) {
      items = items.filter((item) => item.price <= filters.price ? true : false);
    }
    if (filters.type !== "") {
      items = items.filter((item) => item.type === filters.type ? true : false);
    }
    if (filters.brand !== "") {
      items = items.filter((item) => item.brand === filters.brand ? true : false);
    }
    return items;
  }
  
  const deleteItem = (item) => {
    let items = data["items"];

    const requestOptions = {
      method: "DELETE"
    };
    fetch(`http://localhost:3000/items/${item.id}`, requestOptions)
    .then((response) => {
      if (response.ok) {
        const idx = items.indexOf(item)
        items.splice(idx, 1)
        setData({items: items})
      }
    })
  }

  return (
    <div className="container">
      <div className='row mt-3'>
        <ItemsDisplay items= {filter(data["items"])} deleteMe={deleteItem}/>
      </div>
      
      <div className='row mt-3'>
        <SearchBar updateSearchParams={updateFilters}></SearchBar>
      </div>

      <div className='row mt-3'>
        <AddItem addItem={addItemToData}/>
      </div>
    </div>
  );
}

export default App;
