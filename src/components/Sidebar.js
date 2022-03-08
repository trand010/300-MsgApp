import React from 'react';
import {useChat} from '../chatcontext';
import useResolved from '../hooks/useResolved';
import ChatList from './Chatlist';
import { Loader } from 'semantic-ui-react';

const Sidebar = () => {
  const { myChats, createChatClick } = useChat();
  const chatsResolved = useResolved(myChats); //using custom hooks, passing in myChats

  return (
    <div className="side-bar">
      {chatsResolved ? ( //if chat is not resolved, bring in loader from semantics
        <>
          {!!myChats.length ? (
            <div className="chat-list-container">
              <ChatList /> {/*display chatlist from components file*/}
            </div>
          ) : (
            <div className="chat-list-container no-chats-yet"> {/*If there are no chats yet*/}
              <h3>You are not in any chats yet!</h3>
            </div>
          )} {/*Button to create new chat*/}
          <button className="create-chat-button" onClick={createChatClick}> 
            Create New Chat
          </button>
        </>
      ) : (
        <div className="chats-loading"> {/*uses semantic-ui to create loading sign for the sidebar*/}
          <Loader active size="huge" />
        </div>
      )}
    </div>
  );
};

export default Sidebar