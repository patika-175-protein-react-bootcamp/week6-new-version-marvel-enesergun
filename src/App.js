import {useState, useEffect} from 'react'

import './App.css';

import axios from 'axios'
import Pagination from './components/Pagination';
import Header from './components/Header'
import CharactersCard from './components/CharactersCard'

// https://gateway.marvel.com/v1/public/characters?ts=1&apikey=89c5bb6f000ff89c6b3bfd1804a55184&hash=d8e15a485cc807f99e27672c604d81c5&limit=100&offset=0

function App() {

  const [list, setList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(78)
  const [total] = useState(78)

  
  useEffect(() => {
    getData(currentPage);
  }, [currentPage])


const setPage = (value) => {
  if (value.type === "next" && currentPage < total) {
    setCurrentPage((x) => x + 1);
    setOffset(offset + 20);
  } else if (value.type === "prev" && currentPage > 0) {
    setCurrentPage((x) => x - 1);
    setOffset(offset - 20);
  } else if (value.type === "add") {
    setOffset((currentPage - 1) * 20);
    setCurrentPage(value.number);
    
  }
};

// request to marvel.api
  const getData = (currentPage) => {
    const characters = JSON.parse(localStorage.getItem(currentPage));

    if (characters) {
      setList(characters);
      setPageCount(1560 / 20);
      
      
    } else {
      axios.get(`https://gateway.marvel.com/v1/public/characters?ts=1&apikey=89c5bb6f000ff89c6b3bfd1804a55184&hash=d8e15a485cc807f99e27672c604d81c5&offset=${offset}`)
    .then(function (response) {
      // handle success
      localStorage.setItem(currentPage, JSON.stringify(response.data.data.results));
      setList(response.data.data.results);
      setPageCount(response.data.data.total / 20);

  })
    .catch(function (error) {
      // handle error
      console.log(error);
  })
    .then(function () {
    // always executed
  });
  }
}
console.log(list);

  return (
    
    <div className="main">
        <Header />
        

        {/* CONTENT START */}
        
        <div className="container">
          {            
            list.length > 0 &&
            list.map((item, index) => (
              <CharactersCard item={item} key={index} />
              
            )) 
          }

        </div>
          {/* CONTENT END */}

        {/* PAGINATION START */}
        <Pagination total={total} currentPage={currentPage} click={setPage}/>        
        {/* PAGINATION END */}
    </div>
  );
}

export default App;