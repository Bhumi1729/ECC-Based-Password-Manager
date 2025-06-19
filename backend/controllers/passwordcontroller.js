const express = require('express');
const router = express.Router();
const Password = require('../model/passwordschema.js');
const { encryptPassword, decryptPassword } = require('./eccutils.js');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.SECRET_KEY;

const authenticateUser = (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: "Unauthorized: Please log in" });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId; // Attach userId to request object
        next();
    } catch (error) {
        return res.status(403).json({ message: "Invalid token, please log in again" });
    }
};

router.post('/addPassword', authenticateUser, async (req, res) => {
    try {
        const { websiteName, websiteLink, usernameOrEmail, password } = req.body;

        if (!websiteName || !websiteLink || !usernameOrEmail || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Encrypt password before saving
        const encryptedPassword = encryptPassword(password);
        console.log("Encrypted Password Before Saving:", encryptedPassword);

        const newPassword = new Password({
            userId: req.userId, // Attach user ID from token
            websiteName,
            websiteLink,
            usernameOrEmail,
            password: encryptedPassword
        });

        await newPassword.save();

        res.status(201).json({
            message: 'Password added successfully',
            data: {
                _id: newPassword._id,
                websiteName: newPassword.websiteName,
                websiteLink: newPassword.websiteLink,
                usernameOrEmail: newPassword.usernameOrEmail,
                createdAt: newPassword.createdAt
            }
        });
    } catch (error) {
        console.error("Error in addPassword:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// GET password for a specific website
router.get('/getPassword/:passwordId', authenticateUser, async (req, res) => {
    try {
        const passwordId = req.params.passwordId;
        
        // Find the password document by ID and ensure it belongs to the authenticated user
        const passwordDoc = await Password.findOne({ 
            _id: passwordId,
            userId: req.userId // Security: Ensure the password belongs to the requesting user
        });

        if (!passwordDoc) {
            return res.status(404).json({ message: 'Password not found or unauthorized access' });
        }

        // Decrypt the password
        const decryptedPassword = decryptPassword(passwordDoc.password);
        
        if (decryptedPassword === null) {
            return res.status(500).json({ message: 'Failed to decrypt password' });
        }

        // Return the password data with decrypted password
        res.status(200).json({
            data: {
                _id: passwordDoc._id,
                websiteName: passwordDoc.websiteName,
                websiteLink: passwordDoc.websiteLink,
                usernameOrEmail: passwordDoc.usernameOrEmail,
                password: decryptedPassword,
                createdAt: passwordDoc.createdAt
            }
        });
    } catch (error) {
        console.error("Error in getPassword:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// GET all passwords for the authenticated user
router.get('/getAllPasswords', authenticateUser, async (req, res) => {
    try {
        // Find all passwords belonging to the authenticated user
        const passwords = await Password.find({ userId: req.userId });

        if (!passwords || passwords.length === 0) {
            return res.status(200).json({ 
                message: 'No passwords found for this user',
                data: []
            });
        }

        // Return the password data without decrypting (for security)
        // Passwords will be decrypted only when specifically requested
        const passwordList = passwords.map(pwd => ({
            _id: pwd._id,
            websiteName: pwd.websiteName,
            websiteLink: pwd.websiteLink,
            usernameOrEmail: pwd.usernameOrEmail,
            createdAt: pwd.createdAt
            // Note: not including the encrypted password in the list response
        }));

        res.status(200).json({
            count: passwordList.length,
            data: passwordList
        });
    } catch (error) {
        console.error("Error in getAllPasswords:", error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;