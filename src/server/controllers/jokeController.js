const sql = require('../../db/db');

const jokeController = {};

// get a joke from the database that the requesting user did not write
jokeController.getJoke = async (req, res, next) => {
  try {
    // temporary hard-coded user
    const user = 'paloma'
    // use once front-end sends user
    // const { user } = req.body.user;
    // retrieve the user's id
    const userIdResult = await sql`SELECT id FROM users WHERE username=${user}`;
    // handle id retrieval error
    if (userIdResult.length === 0) return next({ log: `No user named ${user} found`, message: 'An error occured looking up this user'});
    const userId = userIdResult[0].id;
    // retrieve a random joke that the user did not write
    const jokeResponse = await sql`SELECT * FROM jokes WHERE creator_id != ${userId} ORDER BY RANDOM() LIMIT 1`;
    // handle joke retrieval error
    if (jokeResponse.length === 0) return next({ log: `No joke found`, message: 'An error occured getting a joke'});
    res.locals.joke = jokeResponse[0];
    console.log(res.locals.joke);
    return next();
  } catch (err) { 
    next({
      log: `Error in getJoke middleware: ${err}`,
      message: 'An error occurred getting the joke'
    }) 
  }
}

// post a joke to the database
jokeController.postJoke = async (req, res, next) => {
  try {
      const { user, content } = req.body;
      // retrieve the user's id
      const userIdResult = await sql`SELECT id FROM users WHERE username=${user}`;
      // handle id retrieval error
      if (userIdResult.length === 0) return next({ log: `No user named ${user} found`, message: 'An error occured looking up this user'});
      const userId = userIdResult[0].id;
      // add joke to db
      const addJokeResponse = await sql`INSERT INTO jokes (content, creator_id) VALUES (${content}, ${userId})`;
      // add joke to user jokes_posted array
      await sql`UPDATE users SET jokes_posted=ARRAY_APPEND(jokes_posted, ${jokeId}) WHERE id=${userId}`;
      return next();
    } catch (err) { 
      next({
        log: `Error in postJoke middleware: ${err}`,
        message: `Error posting joke: ${err}`
      }) 
    }
}

// like a joke in the database
jokeController.likeJoke = async (req, res, next) => {
  try {
    // get stored ids from front end, eliminate request for user id
    const { userId, jokeId } = req.body;
    // temporary hard-coded values
    // const user = 'paloma';
    // const jokeId = 10;
    // use once front-end sends user
    // const { user } = req.body.user;
    // retrieve the user's id
    // const userIdResult = await sql`SELECT id FROM users WHERE username=${user}`;
    // handle id retrieval error
    // if (userIdResult.length === 0) return next({ log: `No user named ${user} found`, message: 'An error occured looking up this user'});
    // const userId = userIdResult[0].id;
    // add userId to joke's liked_by array
    await sql`UPDATE jokes SET liked_by=ARRAY_APPEND(liked_by, ${userId}) WHERE id=${jokeId}`;
    // add jokeId to users jokes_liked array
    await sql`UPDATE users SET jokes_liked=ARRAY_APPEND(jokes_liked, ${jokeId}) WHERE id=${userId}`;
    res.locals.likeMessage = `User ${userId} liked joke ${jokeId}`;
    console.log(res.locals.likeMessage);
    return next();
  } catch (err) {
    next({
      log: `Error in likeJoke middleware: ${err}`,
      message: `Error liking joke: ${err}`
    });
  };  
};

module.exports = jokeController;
