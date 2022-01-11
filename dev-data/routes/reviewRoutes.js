const express = require('express');

const router = express.Router({ mergeParams: true });
const authController = require('../controllers/authController');
const reviewController = require('../controllers/reviewController');

const {
  getAllReviews,
  createReview,
  deleteOneReview,
  updateReview,
  setTourUserIds,
  getOne,
} = reviewController;

router.use(authController.protect);

router
  .route('/')
  .get(getAllReviews)
  .post(authController.restrictTo('user'), setTourUserIds, createReview);

router
  .route('/:id')
  .get(getOne)
  .delete(deleteOneReview)
  .patch(authController.restrictTo('user'), updateReview);

module.exports = router;
