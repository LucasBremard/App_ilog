import React, { useState, useEffect } from 'react';
import StockManager from './components/StockManager';
import SubjectPage from './components/SubjectPage';
import ThirdPage from './components/ThirdPage';

function App() {
  // State variables
  const [currentPage, setCurrentPage] = useState('first'); // State to track the current page being displayed
  const [stockList, setStockList] = useState([]); // State to manage the list of stocks

  // Function to handle page changes when clicking buttons in the navigation
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Function to add a new stock item to the list
  const handleAddStock = (newStockItem) => {
    setStockList([...stockList, newStockItem]);
  };

  // Function to delete a stock item from the list
  const handleDeleteStock = (index) => {
    const updatedStockList = [...stockList];
    updatedStockList.splice(index, 1);
    setStockList(updatedStockList);
  };

  // State variable to store the current date and time
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  // Effect to update the current date and time every second using setInterval
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    // Cleanup function to clear the interval when the component is unmounted
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="App">
      {currentPage === 'first' ? (
        // Display StockManager component if the current page is 'first'
        <div>
          <header className="header">
            <h1>Storage Management</h1>
          </header>
          <nav>
            <div className="button-container">
              {/* Button to switch to the 'Subject' page */}
              <button onClick={() => handlePageChange('second')}>Subject</button>
              {/* Button to switch to the 'Grid' page */}
              <button onClick={() => handlePageChange('third')}>Grid</button>
            </div>
          </nav>
          {/* Display the search bar if searchVisible is true */}
          {/* Render the StockManager component with required props */}
          <StockManager
            stockList={stockList}
            onAddStock={handleAddStock}
            onDeleteStock={handleDeleteStock}
          />
        </div>
      ) : currentPage === 'second' ? (
        // Display SubjectPage component if the current page is 'second'
        <SubjectPage
          stockList={stockList}
          handlePageChange={handlePageChange}
        />
      ) : (
        // Display ThirdPage component if the current page is 'third'
        <ThirdPage
          handlePageChange={handlePageChange}
        />
      )}
      {/* Footer displaying author information and the current date and time */}
      <footer>
        Lucas BREMARD - IMT Nord Europe - {currentDateTime.toLocaleString()}
      </footer>
    </div>
  );
}

export default App;
