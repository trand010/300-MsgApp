import React from 'react';
import { useChat } from '../chatcontext';
import joinUsernames from '../helpers/joinUsernames';
import notMe from '../helpers/notMe';
import {Icon} from 'semantic-ui-react';

const Chatlist = () => {
  const {
    myChats,
    chatConfig,
    selectedChat,
    selectChatClick,
    deleteChatClick,
  } = useChat();

  return (
    <div className="chat-list">
      {myChats.map((c, index) => ( //current chat we are on and index
        <div
          className={`chat-list-item ${ //if chat id is equal to selected, give it selected-chat-item
            selectedChat?.id === c.id ? 'selected-chat-item' : ''
          }`}
          key={index}
        > {/*create an onClick to select the chats*/}
          <div
            onClick={() => selectChatClick(c)}
            className="chat-list-item-content"
          >
          {/*If people ==1, then we are the only one in the chat */}
            {c.people.length === 1 ? (
              <>
                <div className="chat-list-preview">
                  <div className="preview-username">No One Added Yet</div>
                </div>
              </>
            ) : c.people.length === 2 ? ( //if there are 2 people, preview members
              <>
                <div className="chat-list-preview">
                  <div className="preview-username">{notMe(chatConfig, c)}</div> {/*helper function*/}
                  <div className="preview-message">
                    {c.last_message.attachments.length
                      ? `${c.last_message.sender.username} sent an attachment`
                      : c.last_message.text.slice(0, 50) + '...'}
                  </div>
                </div>
              </>
            ) : ( //if greater than 2, then it is a group chat with multiple people
              <>
                <div className="chat-list-preview">
                  <div className="preview-username">
                    {joinUsernames(c.people, chatConfig.userName).slice(0, 50)} {/*helper function to display all user names*/}
                    ...
                  </div>
                  <div className="preview-message">
                    {c.last_message.attachments.length
                      ? `${c.last_message.sender.username} sent an attachment`
                      : c.last_message.text.slice(0, 50) + '...'}
                  </div>
                </div>
              </>
            )}
          </div>

          <div onClick={() => deleteChatClick(c)} className="chat-item-delete"> {/*uses semantics to create x icon to delete or leave chats*/}
          <Icon name="delete" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chatlist;