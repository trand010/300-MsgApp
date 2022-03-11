import { useState } from 'react';
import { useChat } from '../chatcontext';
import joinUsernames from '../helpers/joinUsernames';
import { Icon } from 'semantic-ui-react';
import SearchUsers from './SearchUsers';

//a toolbar that will be displayed when a user selects a chat. The user will be able to use this toolbar
//to search and add other users to their chat based on username
const Toolbar = () => {
  const { selectedChat, chatConfig } = useChat();
  const [searching, setSearching] = useState(false);

  return (
    <>
      <div className="chat-toolbar">
        <div className="chat-header-text">
        {/*reuses this hook to display all usernames seperated by a comma*/}
          {joinUsernames(selectedChat.people, chatConfig.userName).slice(
            0,
            100,
          )}
        </div>

        {/*uses an iron from semantic ui that users can click to add new users to the chat */}
        <div className="add-user-icon">
          <Icon
            color="white"
            name="user plus"
            onClick={() => setSearching(true)}
          />
        </div>
      </div>

      {/*clicking out of searching, set searching to false */}
      <SearchUsers closeFn={() => setSearching(false)} visible={searching} />
    </>
  );
};

export default Toolbar;