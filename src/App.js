import "./App.css";
import { useState } from "react";

function App() {
  const initialFormData = {
    firstName: "",
    lastName: "",
    age: "",
    employed: false,
    favoriteColor: "0",
    sauces: {},
    stooge: "Larry",
    notes: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [notes, setNotes] = useState("");
  const [notesError, setNotesError] = useState(false);

  const handleInputChange = (event) => {
    const { name, type, value, checked } = event.target;
    if (type === "checkbox") {
      setFormData({
        ...formData,
        sauces: {
          ...formData.sauces,
          [name]: checked,
        },
      });
    } else if (name === "notes") {
      if (value.length <= 100) {
        setNotes(value);
        setNotesError(false);
      } else {
        setNotesError(true);
      }
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }

    setFormSubmitted(false);
    setValidationErrors({
      ...validationErrors,
      [name]: false,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    validateFields();

    if (isFormValid()) {
      alert(JSON.stringify(formData, null, 2));
      setFormSubmitted(true);
    }
  };

  const validateFields = () => {
    const firstNameValid = /^[A-Za-z\s]+$/.test(formData.firstName);
    const lastNameValid = /^[A-Za-z\s]+$/.test(formData.lastName);
    const ageValid = /^\d+$/.test(formData.age);

    setValidationErrors({
      firstName: !firstNameValid,
      lastName: !lastNameValid,
      age: !ageValid,
    });
  };
  const isFormValid = () => {
    return (
      formSubmitted || Object.values(validationErrors).every((valid) => !valid)
    );
  };
  const handleReset = () => {
    setFormData(initialFormData);
    setFormSubmitted(false);
    setFormSubmitted({});
  };

  return (
    <div className="App">
      <form onSubmit={handleFormSubmit}>
        <div className="fullName">
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            placeholder="First Name"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className={validationErrors.firstName ? "invalid" : ""}
          />
        </div>
        <div className="fullName">
          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            placeholder="Last Name"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className={validationErrors.lastName ? "invalid" : ""}
          />
        </div>
        <div className="fullName">
          <label htmlFor="name">Age</label>
          <input
            type="text"
            placeholder="Age"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            className={validationErrors.age ? "invalid" : ""}
          />
        </div>
        <div className="employed">
          <label htmlFor="employed"></label>
          Employed
          <div>
            <input
              type="checkbox"
              name="employed"
              value={formData.employed}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <label htmlFor="name">
          Favorite color:
          <select
            name="favoriteColor"
            value={formData.favoriteColor}
            onChange={handleInputChange}
          >
            <option value=""></option>
            <option value="#008000">Green</option>
            <option value="#0000ff">Blue</option>
            <option value="#a52a2a">Brown</option>
            <option value="#fff">White</option>
            <option value="#ffff00">Yellow</option>
            <option value="#ffa500">Orange</option>
            <option value="#800080">Purple</option>
            <option value="#ffc0cb">Pink</option>
            <option value="#ff0000">Red</option>
            <option value="#808080;">Gray</option>
          </select>
        </label>
        <div className="cont">
          <span>Sauces</span>

          <div className="checkbox">
            <div>
              <input
                type="checkbox"
                name="sauces.ketchup"
                checked={formData.sauces.ketchup}
                onChange={handleInputChange}
              />
              <label htmlFor="ketchup">Ketchup</label>
            </div>
            <div>
              <input
                type="checkbox"
                name="mustard"
                checked={formData.sauces.mustard}
                onChange={handleInputChange}
              />
              <label htmlFor="mustard">Mustard</label>
            </div>
            <div>
              <input
                type="checkbox"
                name="mayonnaise"
                checked={formData.sauces.mayonnaise}
                onChange={handleInputChange}
              />
              <label htmlFor="mayonnaise">Mayonnaise</label>
            </div>
            <div>
              <input
                type="checkbox"
                name="guacamole"
                checked={formData.sauces.guacamole}
                onChange={handleInputChange}
              />
              <label htmlFor="guacamole">Guacamole</label>
            </div>
          </div>
        </div>
        <div className="cont cont2">
          <span>Best Stooge</span>
          <div className="checkbox">
            <div>
              <input
                type="radio"
                name="stooge"
                value="Larry"
                checked={formData.stooge === "Larry"}
                onChange={handleInputChange}
              />
              <label htmlFor="container2">Larry</label>
            </div>
            <div>
              <input
                type="radio"
                name="stooge"
                value="Moe"
                checked={formData.stooge === "Moe"}
                onChange={handleInputChange}
              />
              <label htmlFor="container2">Moe</label>
            </div>
            <div>
              <input
                type="radio"
                name="stooge"
                value="Curly"
                checked={formData.stooge === "Curly"}
                onChange={handleInputChange}
              />
              <label htmlFor="container2">Curly</label>
            </div>
          </div>
        </div>
        <div className="textarea">
          <p>Notes</p>
          <textarea
            rows={2}
            cols={36}
            name="notes"
            value={notes}
            onChange={handleInputChange}
            placeholder="Notes"
            className={notesError ? "invalid" : ""}
          ></textarea>
          {notesError && (
            <p className="error">Notes cannot exceed 100 characters</p>
          )}
        </div>
        <div className="btn">
          <button type="submit" disabled={!isFormValid()}>
            Submit
          </button>
          <button type="button" onClick={handleReset} disabled={!isFormValid()}>
            Reset
          </button>
        </div>
        <div className="gray-box">
          <pre>{JSON.stringify(formData, null, 2)}</pre>
        </div>
      </form>
    </div>
  );
}

export default App;
