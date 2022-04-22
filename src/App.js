import {useState, useEffect} from 'react'

import './App.css';

import image1 from './assests/image1.png'
import image2 from './assests/image2.png'

import axios from 'axios'

// https://gateway.marvel.com/v1/public/characters?ts=1&apikey=89c5bb6f000ff89c6b3bfd1804a55184&hash=d8e15a485cc807f99e27672c604d81c5&limit=100&offset=0

function App() {

  const [list, setList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setPageCount] = useState()

  
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

/* THIS FUNC. IS CREAT PAGE NUMBERS IN PAGINATION */
const getPaginationGroup = () => {
  let start = ((currentPage - 1) / 5) * 5;

  let arr = new Array(3).fill().map((_, index) => {
    if (start === 78) {
      return "" 
    } 
    return start + index + 1
  });

  
  if (start >= 4 && start < 73) {
    return [1, "...", start - 1, start, ...arr, "...", pageCount]

  } else if (start < 4) {
    return [1, 2, 3, 4, 5, "...", 78]

  } else if (start >= 73 && start <= 78) {
    return [1, "...", pageCount- 5, pageCount- 4, pageCount-3, pageCount-2, pageCount-1, pageCount]

  } else {
    return [...arr, "...", pageCount]

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
        <div className="pagination">
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
        </div>
        {/* PAGINATION END */}
    </div>
  );
}

export default App;