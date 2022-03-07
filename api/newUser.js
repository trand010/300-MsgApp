import axios from 'axios';

const newUser = async (req, res) => {
  const { userId, userName } = req.body;

  //makes sure new user will be set to chatengine's database
  axios
    .post('https://api.chatengine.io/projects/people/',
      { username: userName, secret: userId },
      { headers: { 'Private-Key': process.env.chat_engine_private_key } },
    )
    .then(apiRes => {
      res.json({
        body: apiRes.data,
        error: null,
      });
    })
    .catch(() => {
      res.json({
        body: null,
        error: 'Error creating the new user!',
      });
    });
};

export default newUser;