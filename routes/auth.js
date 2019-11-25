const express = require('express');
const { check, body } = require('express-validator');

const authController = require('../controllers/auth');
const User = require('../models/user');

const router = express.Router();

router.get('/login', authController.getLogin);

router.get('/signup', authController.getSignup);

router.post('/login', [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password', 'Password should be valid')
        .isLength({ min: 5 })
        .isAlphanumeric()
],
    authController.postLogin);

router.post('/signup',
    [
        check('name', 'Please enter only text with min 6 and max 24 characters.')
            .isAlpha()
            .isLength({ min: 6, max: 24 }),
        check('email')
            .isEmail()
            .withMessage('Please enter a valid email!')
            .custom((value, { req }) => {
                // if (value === 'test@test.com') {
                //     throw new Error('This email address is forbidden');
                // }
                // return true;
                return User
                    .findOne({ email: value })
                    .then(userDoc => {
                        if (userDoc) {
                            return Promise.reject(
                                'Email exists already, Please pick a different one.'
                            );
                        }
                    });
            }),
        body(
            'password',
            'Please enter a password with only numbers and text and atleast 5 characters.'
        )
            .isLength({ min: 5 })
            .isAlphanumeric(),
        body('confirmPassword').custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error('Confirm Password did not match!');
            }
            return true;
        })
    ],
    authController.postSignup);

router.post('/logout', authController.postLogout);

router.get('/reset', authController.getReset);

router.post('/reset', authController.postReset);

router.get('/reset/:token', authController.getNewPassword);

router.post('/new-password', authController.postNewPassword);

module.exports = router;