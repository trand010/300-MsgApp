import { useChat } from '../chatcontext';
import { useEffect } from 'react';
import { getChats, ChatEngine } from 'react-chat-engine';
import Sidebar from './Sidebar';
import Toolbar from './Toolbar';
import ChatInput from './ChatInput'
import MessageList from './MessageList'

const Chat = () => {
  const { myChats, setMyChats, chatConfig, selectedChat, selectChatClick, setSelectedChat} = useChat();

  useEffect(() => {
    console.log('My Chats: ', myChats);
  }, [myChats]);

  useEffect(() => {
    console.log('Selected Chat: ', selectedChat);
  }, [selectedChat]);


  return (
    <>
      {!!chatConfig && ( //if chatConfig exist, render out the ChatEngine
        //this div is used to hide the premade chatengine UI to use our own
        <div className="hide-UI">
          <ChatEngine
            userName={chatConfig.userName}
            projectID={chatConfig.projectID}
            userSecret={chatConfig.userSecret}
            onConnect={() => {
              getChats(chatConfig, setMyChats); //if connected, get the chats and set it
            }}
            onNewChat={chat => {
              if (chat.admin.username === chatConfig.userName) {
                selectChatClick(chat);
              }
              setMyChats([...myChats, chat].sort((a, b) => a.id - b.id));
            }}
            onDeleteChat={chat => {
              if (selectedChat?.id === chat.id) {
                setSelectedChat(null);
              }
              setMyChats(
                myChats.filter(c => c.id !== chat.id).sort((a, b) => a.id - b.id),
              );
            }}
            onNewMessage={(chatId, message) => {
              if (selectedChat && chatId === selectedChat.id) {
                setSelectedChat({
                  ...selectedChat,
                  messages: [...selectedChat.messages, message],
                });
              }
              const chatThatMessageBelongsTo = myChats.find(c => c.id === chatId);
              const filteredChats = myChats.filter(c => c.id !== chatId);
              const updatedChat = {
                ...chatThatMessageBelongsTo,
                last_message: message,
              };
              setMyChats(
                [updatedChat, ...filteredChats].sort((a, b) => a.id - b.id),
              );
            }}
          />
        </div>
      )}

      {/*Chat container used for the messages*/}
      <div className="chat-container">
        <Sidebar />
        <div className="current-chat">
          {selectedChat ? (
            <div className="chat">
            <Toolbar />
            <MessageList />
            <ChatInput />
          </div>
          ) : (
            <div className="no-chat-selected">
              Select A Chat
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Chat