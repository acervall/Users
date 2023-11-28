import express from 'express';
import client from '../connection';
import crypto from 'crypto';

const router = express.Router();

// GET ALL USERS
router.get('/', async (request, response, next) => {
  try {
    const { rows } = await client.query('SELECT * FROM users');
    response.send(rows);
  } catch (error: unknown) {
    next({ source: 'GET ALL USERS - GET /', error });
  }
});

// GET USER
/*router.post('/info', async (request, response, next) => {
  const { id } = request.body;

  try {
    const result = await client.query(
      'SELECT u.*, us.* FROM users u INNER JOIN user_settings us ON u.id = us.user_id WHERE u.id = $1',
      [id]
    );
    const user = result.rows[0];
    console.log(user);

    if (user) {
      response.json({
        success: true,
        message: 'User found',
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          first_name: user.first_name,
          last_name: user.last_name,
          opacity: user.opacity,
          background_color: user.background_color,
        },
      });
    }
  } catch (error: unknown) {
    next({ source: 'GET USER - POST /info', error });
  }
});

// LOGIN
router.post('/login', async (request, response, next) => {
  const { identifier, password } = request.body;

  try {
    const result = await client.query(
      'SELECT * FROM users WHERE email = $1 OR username = $1',
      [identifier]
    );

    const user = result.rows[0];

    if (user) {
      const hashedPassword = crypto
        .createHash('sha256')
        .update(password + user.salt)
        .digest('hex');

      if (hashedPassword === user.password) {
        response.json({
          success: true,
          message: 'Login successful',
          user: {
            id: user.id,
            username: user.username,
            email: user.email,
            first_name: user.first_name,
            last_name: user.last_name,
          },
        });
      } else {
        response.status(401).json({
          success: false,
          message: 'Invalid password',
        });
      }
    } else {
      response.status(401).json({
        success: false,
        message: 'No account found with that email or username',
      });
    }
  } catch (error: unknown) {
    next({ source: 'LOGIN - POST /login', error });
  }
});

// SIGNUP
router.post('/signup', async (request, response, next) => {
  const { username, email, password, first_name, last_name } = request.body;

  try {
    const salt = crypto.randomBytes(16).toString('hex');

    const hashedPassword = crypto
      .createHash('sha256')
      .update(password + salt)
      .digest('hex');

    await client.query(
      'INSERT INTO users (username, email, password, salt, first_name, last_name) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [username, email, hashedPassword, salt, first_name, last_name]
    );

    response.status(201).json({
      success: true,
      message: 'User added successfully',
    });
  } catch (error: unknown) {
    next({ source: 'SIGNUP - POST /signup', error });
  }
});

// EDIT USER INFO
router.put('/edit', async (request, response, next) => {
  const { id, username, email, password, first_name, last_name } = request.body;
  console.log('edit user', request.body);

  try {
    if (password) {
      const salt = crypto.randomBytes(16).toString('hex');
      const hashedPassword = crypto
        .createHash('sha256')
        .update(password + salt)
        .digest('hex');

      await client.query(
        'UPDATE users SET username = $1, email = $2, password = $3, salt = $4, first_name = $5, last_name = $6 WHERE id = $7',
        [username, email, hashedPassword, salt, first_name, last_name, id]
      );
    } else {
      await client.query(
        'UPDATE users SET username = $1, email = $2, first_name = $3, last_name = $4 WHERE id = $5',
        [username, email, first_name, last_name, id]
      );
    }

    const { rows } = await client.query('SELECT * FROM users WHERE id = $1', [
      id,
    ]);

    response.status(201).json({
      success: true,
      message: 'User information updated',
      user: {
        id: rows[0].id,
        username: rows[0].username,
        email: rows[0].email,
        first_name: rows[0].first_name,
        last_name: rows[0].last_name,
      },
    });
  } catch (error: unknown) {
    next({ source: 'EDIT USER INFO - PUT /edit', error });
  }
});

// REMOVE USER
router.delete('/', async (request, response, next) => {
  const { id } = request.body;

  try {
    await client.query('DELETE FROM users WHERE id = $1', [id]);
    response.status(201).json({
      success: true,
      message: 'User is deleted',
    });
  } catch (error: unknown) {
    next({ source: 'REMOVE USER - DELETE /', error });
  }
});
*/
export default router;
