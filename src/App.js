import {useState, useEffect} from 'react'

import './App.css';

import image1 from './assests/image1.png'
import image2 from './assests/image2.png'

import axios from 'axios'
import Pagination from './components/Pagination';

// https://gateway.marvel.com/v1/public/characters?ts=1&apikey=89c5bb6f000ff89c6b3bfd1804a55184&hash=d8e15a485cc807f99e27672c604d81c5&limit=100&offset=0

function App() {

  const [list, setList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState(78)
  const [total, setTotal] = useState(78)

  
  useEffect(() => {
    getData(currentPage);
  }, [currentPage])

  
/* HANDLE FUNCTIONS */  
const handlePrevButton = () => {
  if (offset >= 20){
    setOffset(offset - 20);
    setCurrentPage(currentPage - 1); 
    
  }
}

const handleNextButton = () => {
  setOffset(offset + 20);
  setCurrentPage(currentPage + 1);
  
}

const handleChangePage = (page) => {
  setOffset((page - 1) * 20);
  setCurrentPage(page);
  console.log("hangleChangePage", page);
}


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

  return (
    /* HEADER START */
    <div className="main">
        <div className="header">
            <div className="header-background">
                <img className="header-background-img" src={image1} alt="" />                
            </div>
            <div className="header-logo">
                <img className="header-logo-img" src={image2} alt="" />
            </div>
        </div>
        {/* HEADER END */}

        {/* CONTENT START */}
        <div className="container">
          {            
            list.length > 0 &&
            list?.map((item, index) => (
              
              <div key={index} className="character-rectangle">
                <div className="top-line"></div>
                <div className="character-image-wrap">
                  <img className='character-image' src={`${item.thumbnail.path}/portrait_xlarge.${item.thumbnail.extension}`} alt="" />
                </div>
                <div className="character-name">
                  <p>{item.name}</p>
              </div>
              </div>
            )) 
          }

        </div>
          {/* CONTENT END */}

        {/* PAGINATION START */}
        {/* currentPage, handlePrevButton */}
        <Pagination total={total} currentPage={currentPage} click={setPage}/>
        {/* <div className="pagination">
            {
              currentPage == 1 
              ? <div></div> 
              : (
              <div onClick={handlePrevButton} className="previous-page">
                {"<"}
              </div>
            )
            }
            <div className="pages">
              { 
                getPaginationGroup().map((page, index) => (
                  <div key={index} className="page-number">
                    <div onClick={(e) => {handleChangePage(e.target.textContent) }} className={`${currentPage  == page ? 'active-page' : null}`}>{page}</div>
                  </div>
                ))                
              }                            
            </div>            
            {
              currentPage == 78 
              ? <div></div>
              : 
              (
                <div onClick={handleNextButton} className="next-page">
                  {">"}
                </div>
              )
            }
        </div> */}
        {/* PAGINATION END */}
    </div>
  );
}

export default App;