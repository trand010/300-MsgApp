import { useChat } from '../chatcontext';
import { Search } from 'semantic-ui-react';
import { useEffect, useRef, useState } from 'react';
import { addPerson, getOtherPeople } from 'react-chat-engine';
import useDebounce from '../hooks/useDebounce';


const SearchUsers = ({ visible, closeFn }) => {
  let searchRef = useRef();

  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const [searchResults, setSearchResults] = useState(null);

  useEffect(() => {
    if (visible && searchRef) {
      searchRef.focus();
    }
  }, [visible]);

  const {
    myChats,
    setMyChats,
    chatConfig,
    selectedChat,
    setSelectedChat,
  } = useChat();

  //adding selected user to chat
  const selectUser = username => {
    addPerson(chatConfig, selectedChat.id, username, () => { //uses add person to also update to ChatEngine
      const filteredChats = myChats.filter(c => c.id !== selectedChat.id);
      const updatedChat = { //update the chat with the new user, also updates chat based on size
        ...selectedChat,
        people: [...selectedChat.people, { person: { username } }],
      };

      setSelectedChat(updatedChat);
      setMyChats([...filteredChats, updatedChat]);
      closeFn();
    });
  };

  //using react chat engine, get other people
  useEffect(() => {
    if (debouncedSearchTerm) {
      setLoading(true);
      getOtherPeople(chatConfig, selectedChat.id, (chatId, data) => {
        const userNames = Object.keys(data) //grab the usernames from the database and map into an array
          .map(key => data[key].username)
          .filter(u =>
            u.toLowerCase().includes(debouncedSearchTerm.toLowerCase()), //use lower case to not care about casing
          ); //also uses the debounce hook to add a delay on searching
        setSearchResults(userNames.map(u => ({ title: u })));
        setLoading(false); //resets loading back to false
      });
    } else {
      setSearchResults(null);
    }
  }, [debouncedSearchTerm, chatConfig, selectedChat]);

  return (
    <div
      className="user-search"
      style={{ display: visible ? 'block' : 'none' }} //if visibble is true, set it to block and show it
    >
      <Search //search bar coming from semantic UI
        fluid
        onBlur={closeFn} //if they click out, it will rehide it
        loading={loading}
        value={searchTerm}
        placeholder="Search For Users"
        open={!!searchResults && !loading}
        input={{ ref: r => (searchRef = r) }}
        onSearchChange={e => setSearchTerm(e.target.value)} //update search term everytime
        results={searchResults}
        onResultSelect={(e, data) => { //when clicking result, return selected user function
          if (data.result?.title) {
            selectUser(data.result.title);
          }
        }}
      />
    </div>
  );
};

export default SearchUsers