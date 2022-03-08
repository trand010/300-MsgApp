//this helper function will be used to join the usernames together to be displayed on the sidebar
//it will place all users in a groupchat names together seperated by commas
const joinUsernames = (people, currentUsername) => {
    return '@' + people
      .map(p => p.person.username)
      .filter(un => un !== currentUsername)
      .join(', @');
  };

export default joinUsernames;