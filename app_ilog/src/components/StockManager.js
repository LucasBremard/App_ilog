import React, { useState } from 'react';

const StockManager = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [stockItems, setStockItems] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [updateIndex, setUpdateIndex] = useState(-1);
  const [showMessage, setShowMessage] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [contactName, setContactName] = useState('');
  const [contactNameError, setContactNameError] = useState('');
  const [contactFirstName, setContactFirstName] = useState('');
  const [contactFirstNameError, setContactFirstNameError] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactEmailError, setContactEmailError] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactMessageError, setContactMessageError] = useState('');
  const [showSearchBar, setShowSearchBar] = useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  const handleToggleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
  };

  const handleAddStock = () => {
    if (name.trim() === '' || description.trim() === '' || quantity === 0) {
      setErrorMessage('Please fill in all fields and ensure quantity is greater than 0.');
      return;
    }

    const newStockItem = {
      name: name,
      description: description,
      quantity: quantity
    };

    if (updateIndex === -1) {
      setStockItems([...stockItems, newStockItem]);
    } else {
      const updatedStockItems = [...stockItems];
      updatedStockItems[updateIndex] = newStockItem;
      setStockItems(updatedStockItems);
      setUpdateIndex(-1);
    }

    setName('');
    setDescription('');
    setQuantity(0);
    setErrorMessage('');
  };

  const handleDeleteStock = (index) => {
    const updatedStockItems = [...stockItems];
    updatedStockItems.splice(index, 1);
    setStockItems(updatedStockItems);

    if (index === updateIndex) {
      setUpdateIndex(-1);
    }
  };

  const handleUpdateStock = (index) => {
    const itemToUpdate = stockItems[index];
    setName(itemToUpdate.name);
    setDescription(itemToUpdate.description);
    setQuantity(itemToUpdate.quantity);
    setUpdateIndex(index);
  };

  const handleContactNameChange = (e) => {
    setContactName(e.target.value);
    setContactNameError('');
  };

  const handleContactFirstNameChange = (e) => {
    setContactFirstName(e.target.value);
    setContactFirstNameError('');
  };

  const handleContactEmailChange = (e) => {
    setContactEmail(e.target.value);
    setContactEmailError('');
  };

  const handleContactMessageChange = (e) => {
    setContactMessage(e.target.value);
    setContactMessageError('');
  };

  const handleSendMessage = () => {
    if (contactName.trim() === '') {
      setContactNameError('Please enter your name.');
      return;
    }

    if (contactFirstName.trim() === '') {
      setContactFirstNameError('Please enter your first name.');
      return;
    }

    if (contactEmail.trim() === '') {
      setContactEmailError('Please enter your email address.');
      return;
    }

    if (contactMessage.trim() === '') {
      setContactMessageError('Please enter a message.');
      return;
    }

    setShowMessage(true);
  };

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchButtonClick = () => {
    const results = stockItems.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };

  return (
    <div>
      <div className="stock-manager">
        <div className="stock-form">
          <h2 className="texte-souligne">{updateIndex === -1 ? 'Add Stock' : 'Update Stock'}</h2>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={handleNameChange}
            />
          </div>
          <div>
            <label htmlFor="description">Description:</label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={handleDescriptionChange}
            />
          </div>
          <div>
            <label htmlFor="quantity">Quantity:</label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={handleQuantityChange}
            />
          </div>
          <button data-testid="add-button" onClick={handleAddStock}>
            {updateIndex === -1 ? 'Add' : 'Update stock'}
          </button>
          {errorMessage && <div className="error-message">{errorMessage}</div>}
        </div>
        <div className="stock-list-container">
          <h2 className="texte-souligne">Stock List</h2>
          <div className="search-bar">
            {showSearchBar ? (
              <>
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={handleSearchInputChange}
                />
                <button className="search-button custom-button" onClick={handleSearchButtonClick}>
                  Search
                </button>
                <button className="close-button custom-button" onClick={handleToggleSearchBar}>
                  <span>×</span>
                </button>

              </>
            ) : (
              <button onClick={handleToggleSearchBar}>
                <span>Open Search</span>
              </button>
            )}
          </div>
          <ul className="stock-list" data-testid="stock-list">
            {stockItems.map((item, index) => (
              <li key={index}>
                <div className={searchResults.includes(item) ? 'highlighted' : ''}>
                  <span className="stock-item-name">{item.name}</span> - {item.description} - Quantity: {item.quantity}
                </div>
                <div>
                  <button className="update-button" onClick={() => handleUpdateStock(index)}>
                    Update
                  </button>
                  <button className="delete-button" onClick={() => handleDeleteStock(index)}>
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="contact-form">
        <h2 className="texte-souligne">Contact Form</h2>
        <div className="contact-field">
          <label htmlFor="contact-name">Last name:</label>
          <input type="text" id="contact-name" value={contactName} onChange={handleContactNameChange} />
          {contactNameError && <div className="error-message-contact-form">{contactNameError}</div>}
        </div>
        <div className="contact-field">
          <label htmlFor="contact-firstName">First name:</label>
          <input type="text" id="contact-firstName" value={contactFirstName} onChange={handleContactFirstNameChange} />
          {contactFirstNameError && <div className="error-message-contact-form">{contactFirstNameError}</div>}
        </div>
        <div className="contact-field">
          <label htmlFor="contact-email">Mail:</label>
          <input type="email" id="contact-email" value={contactEmail} onChange={handleContactEmailChange} />
          {contactEmailError && <div className="error-message-contact-form">{contactEmailError}</div>}
        </div>
        <div className="contact-field">
          <label htmlFor="contact-message">Message:</label>
          <textarea id="contact-message" value={contactMessage} onChange={handleContactMessageChange}></textarea>
          {contactMessageError && <div className="error-message-contact-form">{contactMessageError}</div>}
        </div>
        <div className="checkbox-container">
          <input type="checkbox" id="newsletter" />
          <label htmlFor="newsletter">Subscribe to our newsletter</label>
        </div>
        <button type="submit" onClick={handleSendMessage}>
          Send message
        </button>
        {showMessage && (
          <div className="success-message">Message sent successfully!</div>
        )}
      </div>
    </div>
  );
};

export default StockManager;
