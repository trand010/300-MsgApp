import fb from './firebase';
import { createContext, useContext, useEffect, useState } from 'react';
import { newChat, leaveChat, deleteChat, getMessages } from 'react-chat-engine';

//create a context
export const ChatContext = createContext();

//create a chat provider, anything wrapped inside this will have access to the context
export const ChatProvider = ({ children, authUser }) => {
  const [myChats, setMyChats] = useState();
  const [chatConfig, setChatConfig] = useState();
  const [selectedChat, setSelectedChat] = useState();

  //these functionalities are impoacted from chat engine
  const createChatClick = () => { //create chat click functionality
    newChat(chatConfig, { title: '' }); //takes chatConfig and then passes the title
  };
  const deleteChatClick = chat => { //delete chat click functionality, only admin is allowed to delete a chat
    const isAdmin = chat.admin === chatConfig.userName;

    if (
      isAdmin &&
      window.confirm('Are you sure you want to delete this chat?')
    ) {
      deleteChat(chatConfig, chat.id);
    } else if (window.confirm('Are you sure you want to leave this chat?')) { //if they are not an admin, they can leave the chat
      leaveChat(chatConfig, chat.id, chatConfig.userName);
    }
  };
  const selectChatClick = chat => { //lets the user to select a chat
    getMessages(chatConfig, chat.id, messages => { //callback function get the messages for the chat.id
      setSelectedChat({
        ...chat,
        messages,
      });
    });
  };

  //this will set the chat config if the user is initalized
  useEffect(() => {
    if (authUser) { //gets the user from firestore and gets its UID and username
      fb.firestore
        .collection('chatUsers')
        .doc(authUser.uid)
        .onSnapshot(snap => {
          setChatConfig({
            userSecret: authUser.uid,
            userName: snap.data().userName,
            projectID: '7b90e697-cfbe-41a2-bc56-9a4f0ca70ff0', //from chatengine
          });
        });
    }
  }, [authUser, setChatConfig]);


  //all of the functionalities of the chat
  return (
    <ChatContext.Provider
      value={{
        myChats,
        setMyChats,
        chatConfig,
        selectedChat,
        setChatConfig,
        setSelectedChat,
        selectChatClick,
        deleteChatClick,
        createChatClick,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

//a hook that calls useContext to easily access the values from the above chat functionalities and return it
export const useChat = () => {
  const {
    myChats,
    setMyChats,
    chatConfig,
    selectedChat,
    setChatConfig,
    setSelectedChat,
    selectChatClick,
    deleteChatClick,
    createChatClick,
  } = useContext(ChatContext);

  return {
    myChats,
    setMyChats,
    chatConfig,
    selectedChat,
    setChatConfig,
    setSelectedChat,
    selectChatClick,
    deleteChatClick,
    createChatClick,
  };
};