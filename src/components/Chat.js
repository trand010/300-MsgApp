import { useChat } from '../chatcontext';
import { useEffect } from 'react';
import { getChats, ChatEngine } from 'react-chat-engine';
import Sidebar from './Sidebar';

const Chat = () => {
  const { myChats, setMyChats, chatConfig, selectedChat } = useChat();

  useEffect(() => {
    console.log('My Chats: ', myChats);
  }, [myChats]);

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
          />
        </div>
      )}

      {/*Chat container used for the messages*/}
      <div className="chat-container">
        <Sidebar />
        <div className="current-chat">
          {selectedChat ? (
            <></>
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