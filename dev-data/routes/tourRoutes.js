const express = require('express');

const router = express.Router();

const tourController = require('../controllers/tourController');

const authController = require('../controllers/authController');

const reviewRouter = require('./reviewRoutes');

const {
  getAllTours,
  getTour,
  deleteTour,
  updatetour,
  createTour,
  aliasTopTours,
  getTourStats,
  getMonthlyPlan,
  getToursWithin,
  getToursWithinRadius,
  resizeTourPhotos,
  uploadTourPhotos,
} = tourController;

router.use('/:tourId/reviews', reviewRouter);

router.route('/top-5-cheap').get(aliasTopTours, getAllTours);
router.route('/tour-stats').get(getTourStats);

router
  .route('/tours-within/:distance/center/:latlng/unit/:unit')
  .get(getToursWithin);

router.route('/distances/:latlng/unit/:unit').get(getToursWithinRadius);

router
  .route('/monthly-plan/:year')
  .get(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    getMonthlyPlan
  );
router
  .route('/')
  .get(getAllTours)
  .post(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    createTour
  );
router
  .route('/:id')
  .get(getTour)
  .patch(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    uploadTourPhotos,
    resizeTourPhotos,
    updatetour
  )
  .delete(
    authController.protect,
    authController.restrictTo('admin', 'lead-guide'),
    deleteTour
  );

module.exports = router;
