import "./App.css";
import contacts from "./contacts.json";
import {useState} from "react";

const remainingContacts = [...contacts]     // we save our original contacts
const contactsList = remainingContacts.splice(0, 5)

function App() {

  const [myContacts, setMyContacts] = useState(contactsList)

  const addContact = () => {
    const randomIndex = Math.floor(Math.random() * remainingContacts.length)
    const randomContact = remainingContacts.splice(randomIndex, 1)
    setMyContacts([randomContact[0], ...myContacts])
  }

  const deleteContact = (i) => {
    let copyContacts = [...myContacts]
    copyContacts.splice(i, 1)
    setMyContacts(copyContacts)
  }

  const sortByName = () => {
    let copyContacts = [...myContacts]
    copyContacts.sort( (a, b) => {
      if (a.name < b.name) return -1 
      if (a.name > b.name) return 1
      return 0
    })
    setMyContacts(copyContacts)
  }

  const sortByPopularity = () => {
    let copyContacts = [...myContacts]
    copyContacts.sort( (a, b) => b.popularity - a.popularity)
    setMyContacts(copyContacts)
  }

  return (
      <div>
        <h1>Ironcontacts</h1>
        
        <div className="group-buttons">
          <button onClick={addContact}>
            Add random contact!
          </button>

          <button onClick={sortByName}>
            Sort by Name
          </button>

          <button onClick={sortByPopularity}>
            Sort by Popularity
          </button>
        </div>

        <table className="table-contacts">
          <thead>
            <tr>
              <th>Picture</th>
              <th className="column-name">Name</th>
              <th>Popularity</th>
              <th>Won an Oscar</th>
              <th>Won an Emmy</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
          
            { myContacts.map( (contact, i) => {
              return(
              <tr key={contact.id}>
                <td className="column-picture"><img src={contact.pictureUrl} alt={contact.name} /></td>
                <td className="column-name">{contact.name}</td>
                <td>{contact.popularity.toFixed(2)}</td>
                <td>{ contact.wonOscar && "🏆" }</td>
                <td>{ contact.wonEmmy && "🌟" }</td>
                <td>
                  <button onClick={ () => deleteContact(i)}>Delete</button>
                </td>
              </tr>
              )
            }) }
          </tbody>

        </table>
      </div>
  );
}
export default App;
