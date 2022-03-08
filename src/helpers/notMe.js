//because all users are stored in an array, this helper function will be used
//to make sure it excludes the user who made the chat 
const notMe = (chatConfig, selectedChat) => {
    return selectedChat.people.find(p => p.person.username !== chatConfig.userName)?.person?.username;
  };

export default notMe