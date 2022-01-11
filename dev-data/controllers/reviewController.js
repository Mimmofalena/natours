const Review = require('../models/reviewModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./factoryHandler');

exports.setTourUserIds = catchAsync(async (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.params.tourId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
});

// exports.getAllReviews = catchAsync(async (req, res, next) => {
//   let filter = {};

//   if (req.params.tourId) filter = { tour: req.params.tourId };
//   console.log(req.body);
//   const reviews = await Review.find(filter);

//   res.status(200).json({
//     status: 'success',
//     results: reviews.length,
//     data: {
//       reviews,
//     },
//   });
// });

exports.getAllReviews = factory.getAll(Review);
exports.getOne = factory.getOne(Review);
exports.createReview = factory.createOne(Review);
exports.deleteOneReview = factory.deleteOne(Review);
exports.updateReview = factory.updateOne(Review);
