import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { generateAccessToken, generateRefreshToken } from '../config/refreshToken.js';

// Register
const register = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    // Validation
    if (!name || !email || !phone || !password) {
      return res.status(400).json({ message: 'Please provide all fields' });
    }

    // Check if user already exists
    let user = await User.findOne({ $or: [{ phone }, { email }] });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create new user
    user = new User({ name, email, phone, password });
    await user.save();

    // Create JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    res.status(201).json({
      message: 'User registered successfully',
      token,
      user: { id: user._id, name: user.name, email: user.email, phone: user.phone },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login
const login = async (req, res) => {
  try {
    const { email, phone, password } = req.body;

    // Validation - email or phone is required
    if ((!email && !phone) || !password) {
      return res.status(400).json({ message: 'Please provide email/phone and password' });
    }

    // Check user by email or phone
    const user = await User.findOne({ $or: [{ email }, { phone }] });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    //GENERER UN REFRESH TOKEN
    const refreshToken = generateRefreshToken(user._id, user.role);

    // Mettre à jour l'utilisateur avec le nouveau refresh token
    await User.findByIdAndUpdate(
      user._id,
      { refreshToken },
      { new: true }
    );

    // Envoyer le refresh token via un cookie sécurisé
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Utiliser le cookie sécurisé en production
      maxAge: 3 * 24 * 60 * 60 * 1000, // 3 jours
    });
    // Générer un access token
    const accessToken = generateAccessToken(user._id, user.role);



  // Renvoyer les informations de l'utilisateur et l'access token
    res.json({
      success: true,
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      accessToken,// JWT access token pour authentifier l'utilisateur sur les autres API
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


//fonction pour modifier un user
const updateUser = async (req, res) => {
  try {
    const updateData = req.body;
    const { id } = req.params;

    const user = await User.findByIdAndUpdate(id, updateData, { new: true });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//fonction pour supprimer un user
const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//fonction pour déconnecter un user
const logoutUser = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      return res.status(401).json({ message: 'No refresh token found' });
    }

    // Supprimer le refresh token de la base de données
    await User.updateOne({ refreshToken }, { refreshToken: null });

    // Supprimer le cookie
    res.clearCookie('refreshToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });

    res.json({ message: 'Logout successful' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { register, login, updateUser, deleteUser, logoutUser };
