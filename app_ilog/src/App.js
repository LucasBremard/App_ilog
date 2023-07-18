import React, { useState, useEffect } from 'react';
import StockManager from './components/StockManager';
import SubjectPage from './components/SubjectPage';
import ThirdPage from './components/ThirdPage';

function App() {
  const [currentPage, setCurrentPage] = useState('first');
  const [stockList, setStockList] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchVisible, setSearchVisible] = useState(false);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleAddStock = (newStockItem) => {
    setStockList([...stockList, newStockItem]);
  };

  const handleDeleteStock = (index) => {
    const updatedStockList = [...stockList];
    updatedStockList.splice(index, 1);
    setStockList(updatedStockList);
  };

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchButtonClick = () => {
    setSearchVisible((prevVisible) => !prevVisible);
    setSearchTerm('');
  };

  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="App">
      {currentPage === 'first' ? (
        <div>
          <header className="header">
            <h1>Storage Management</h1>
          </header>
          <nav>
            <div className="button-container">
              <button onClick={() => handlePageChange('second')}>Subject</button>
              <button onClick={() => handlePageChange('third')}>Grid</button>

            </div>
          </nav>
          {searchVisible && (
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchInputChange}
              />
            </div>
          )}
          <StockManager
            stockList={stockList}
            onAddStock={handleAddStock}
            onDeleteStock={handleDeleteStock}
          />
        </div>
      ) : currentPage === 'second' ? (
        <SubjectPage
          stockList={stockList}
          handlePageChange={handlePageChange}
        />
      ) : (
        <ThirdPage
          handlePageChange={handlePageChange}
        />
      )}
      <footer>
        Lucas BREMARD - IMT Nord Europe - {currentDateTime.toLocaleString()}
      </footer>
    </div>
  );
}

export default App;
