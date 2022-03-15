import React, { useState } from 'react';
import  {useChat} from '../chatcontext';
import { sendMessage } from 'react-chat-engine';
import {Icon} from 'semantic-ui-react';

//this will be the chatbar which allow users to send messages
const ChatInput = () => {
  const { chatConfig, selectedChat } = useChat();
  const [chatInputText, setChatInputText] = useState('');

  const sendChatMessage = () => { //if the user sends a chat message
    if (selectedChat && chatInputText) {
      setChatInputText('');
      sendMessage(chatConfig, selectedChat.id, {
        text: chatInputText,
        files: [],
      });
    }
  };

return (
    <>
      <div className="chat-controls">
        <div
        >
        </div>
        <input
          value={chatInputText}
          className="chat-input"
          placeholder=" Send a message"
          onKeyPress={e => {
            if (e.key === 'Enter') {
              sendChatMessage();
            }
          }}
          onChange={e => setChatInputText(e.target.value)}
        />
        <div onClick={sendChatMessage} className="send-message-icon">
          <Icon name="send" color="grey" />
        </div>
      </div>
    </>
  );
};

export default ChatInput;