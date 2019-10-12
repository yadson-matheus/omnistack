const express = require('express');
const multer = require('multer');

const authMiddleware = require('./middlewares/auth');

const uploadConfig = require('./config/upload');
const UserController = require('./controllers/UserController');
const SpotController = require('./controllers/SpotController');
const DashboardController = require('./controllers/DashboardController');
const BookingController = require('./controllers/BookingController');

const routes = express.Router();

routes.use(authMiddleware);

const upload = multer(uploadConfig);

routes.post('/user', UserController.add);
routes.post('/auth', UserController.authenticate);

routes.get('/spots', SpotController.index);
routes.post('/spots', upload.single('thumbnail'), SpotController.store);

routes.get('/dashboard', DashboardController.show);

routes.post('/spots/:spot_id/bookings', BookingController.store);

module.exports = routes;
