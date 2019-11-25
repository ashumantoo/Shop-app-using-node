const path = require('path');

const express = require('express');
const { check, body } = require('express-validator');

const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', isAuth, adminController.getAddProduct);

// /admin/products => GET
router.get('/products', isAuth, adminController.getProducts);

// /admin/add-product => POST
router.post('/add-product',
    [
        body('title').isString().isLength({ min: 3 }).trim().withMessage('Title should be only text'),
        body('price').isNumeric().withMessage('Price shold be in number only'),
        body('description').trim().isLength({ min: 5, max: 400 }).withMessage('Description should be text and number only')
    ],
    isAuth,
    adminController.postAddProduct);

router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);

router.post('/edit-product',
    [
        body('title').isString().isLength({ min: 3 }).trim().withMessage('Title should be only text'),
        body('price').isNumeric().withMessage('Price shold be in number only'),
        body('description').trim().isLength({ min: 5, max: 400 }).withMessage('Description should be text and number only')
    ],
    isAuth,
    adminController.postEditProduct);

// router.post('/delete-product', isAuth, adminController.postDeleteProduct);
router.delete('/product/:productId', isAuth, adminController.deleteProduct);

module.exports = router;
