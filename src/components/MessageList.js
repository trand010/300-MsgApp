import {useChat} from '../chatcontext';
import groupMessages from '../helpers/groupMessages';
import useScrollToBottom from '../hooks/useScrollToBottom';

//
const MessageList = () => {
  const { selectedChat } = useChat();
  useScrollToBottom(selectedChat, 'chat-messages');

  //the message display for groupchats or private messages
  return (
    <div className="chat-messages">
      {!!selectedChat.messages.length ? (
        groupMessages(selectedChat.messages).map((m, index) => (
          <div key={index} className="chat-message">
            <div className="chat-message-header">
              <div className="message-author">{m[0].sender.username}</div>
            </div>

            <div className="message-content">
              {m.map((individualMessage, index) => (
                <div key={index}>
                  <div className="message-text">{individualMessage.text}</div>

                  {!!individualMessage.attachments.length && (
                    <img
                      className="message-image"
                      src={individualMessage.attachments[0].file}
                      alt={individualMessage.id + '-attachment'}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <div className="no-messages-yet">No messages yet</div> //if there are no messages yet
      )}
    </div>
  );
};

export default MessageList;