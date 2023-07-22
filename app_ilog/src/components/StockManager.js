import React, { useState } from 'react';

/**
 * Component for managing stock items and contact form.
 * @returns {JSX.Element} The rendered component.
 */
const StockManager = () => {
  // State variables for managing form inputs, stock items, error messages, and contact form data
  /** @type {string} */
  const [name, setName] = useState('');
  /** @type {string} */
  const [description, setDescription] = useState('');
  /** @type {number} */
  const [quantity, setQuantity] = useState(0);
  /** @type {object[]} */
  const [stockItems, setStockItems] = useState([]);
  /** @type {string} */
  const [errorMessage, setErrorMessage] = useState('');
  /** @type {number} */
  const [updateIndex, setUpdateIndex] = useState(-1);
  /** @type {boolean} */
  const [showMessage, setShowMessage] = useState(false);
  /** @type {string} */
  const [searchTerm, setSearchTerm] = useState('');
  /** @type {object[]} */
  const [searchResults, setSearchResults] = useState([]);
  /** @type {string} */
  const [contactName, setContactName] = useState('');
  /** @type {string} */
  const [contactNameError, setContactNameError] = useState('');
  /** @type {string} */
  const [contactFirstName, setContactFirstName] = useState('');
  /** @type {string} */
  const [contactFirstNameError, setContactFirstNameError] = useState('');
  /** @type {string} */
  const [contactEmail, setContactEmail] = useState('');
  /** @type {string} */
  const [contactEmailError, setContactEmailError] = useState('');
  /** @type {string} */
  const [contactMessage, setContactMessage] = useState('');
  /** @type {string} */
  const [contactMessageError, setContactMessageError] = useState('');
  /** @type {boolean} */
  const [showSearchBar, setShowSearchBar] = useState(false);

  // Event handlers for updating state variables based on form inputs and actions

  /**
   * Handle the change of the stock item name.
   * @param {object} e - The form change event.
   * @returns {void}
   */
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  /**
   * Handle the change of the stock item description.
   * @param {object} e - The form change event.
   * @returns {void}
   */
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  /**
   * Handle the change of the stock item quantity.
   * @param {object} e - The form change event.
   * @returns {void}
   */
  const handleQuantityChange = (e) => {
    setQuantity(parseInt(e.target.value));
  };

  /**
   * Handle toggling the search bar visibility.
   * @returns {void}
   */
  const handleToggleSearchBar = () => {
    setShowSearchBar(!showSearchBar);
  };

  /**
   * Handle adding a new stock item or updating an existing one.
   * @returns {void}
   */
  const handleAddStock = () => {
    // Check if any of the required fields are empty or quantity is zero
    if (name.trim() === '' || description.trim() === '' || quantity === 0) {
      setErrorMessage('Please fill in all fields and ensure quantity is greater than 0.');
      return;
    }

    // Create a new stock item object with the input values
    const newStockItem = {
      name: name,
      description: description,
      quantity: quantity
    };

    // Update the stock items list based on whether it's an addition or update operation
    if (updateIndex === -1) {
      setStockItems([...stockItems, newStockItem]);
    } else {
      const updatedStockItems = [...stockItems];
      updatedStockItems[updateIndex] = newStockItem;
      setStockItems(updatedStockItems);
      setUpdateIndex(-1);
    }

    // Reset form inputs and error message
    setName('');
    setDescription('');
    setQuantity(0);
    setErrorMessage('');
  };

  /**
   * Handle deleting a stock item.
   * @param {number} index - The index of the stock item to delete.
   * @returns {void}
   */
  const handleDeleteStock = (index) => {
    // Remove the stock item from the list
    const updatedStockItems = [...stockItems];
    updatedStockItems.splice(index, 1);
    setStockItems(updatedStockItems);

    // Reset the updateIndex if the item being deleted is currently being updated
    if (index === updateIndex) {
      setUpdateIndex(-1);
    }
  };

  /**
   * Handle updating a stock item.
   * @param {number} index - The index of the stock item to update.
   * @returns {void}
   */
  const handleUpdateStock = (index) => {
    // Set the form inputs to the values of the item being updated
    const itemToUpdate = stockItems[index];
    setName(itemToUpdate.name);
    setDescription(itemToUpdate.description);
    setQuantity(itemToUpdate.quantity);
    setUpdateIndex(index);
  };

  /**
   * Handle the change of the contact's last name.
   * @param {object} e - The form change event.
   * @returns {void}
   */
  const handleContactNameChange = (e) => {
    setContactName(e.target.value);
    setContactNameError('');
  };

  /**
   * Handle the change of the contact's first name.
   * @param {object} e - The form change event.
   * @returns {void}
   */
  const handleContactFirstNameChange = (e) => {
    setContactFirstName(e.target.value);
    setContactFirstNameError('');
  };

  /**
   * Handle the change of the contact's email.
   * @param {object} e - The form change event.
   * @returns {void}
   */
  const handleContactEmailChange = (e) => {
    setContactEmail(e.target.value);
    setContactEmailError('');
  };

  /**
   * Handle the change of the contact's message.
   * @param {object} e - The form change event.
   * @returns {void}
   */
  const handleContactMessageChange = (e) => {
    setContactMessage(e.target.value);
    setContactMessageError('');
  };

  /**
   * Handle sending the contact form message.
   * @returns {void}
   */
  const handleSendMessage = () => {
    // Validate the contact form fields before sending the message
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

    // Show success message after sending the message
    setShowMessage(true);
  };

  /**
   * Handle the change of the search input.
   * @param {object} e - The form change event.
   * @returns {void}
   */
  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  /**
   * Handle clicking the search button.
   * @returns {void}
   */
  const handleSearchButtonClick = () => {
    // Filter stock items based on the search term
    const results = stockItems.filter((item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(results);
  };
  // JSX for rendering the component's UI
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
