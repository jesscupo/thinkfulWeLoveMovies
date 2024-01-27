const service = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function reviewExists(req, res, next) {
    const { reviewId } = req.params;
  
    const review = await service.read(reviewId);
    if (review) {
      res.locals.review = review;
      return next();
    }
    return next({ status: 404, message: `Review cannot be found.` });
  }

async function update(request, response) {
    const newReview = {
        ...response.locals.review,
        ...request.body.data,
        review_id: response.locals.review.review_id,
        };
    await service.update(newReview);
    const updatedReview = await service.read(newReview.review_id);
    updatedReview.critic = await service.getCritic(newReview.critic_id);
    response.json({ data: updatedReview });
  }

  async function destroy(req, res) {
    const reviewId = res.locals.review.review_id;
    await service.destroy(reviewId);
    res.sendStatus(204);
  }  

module.exports = {
    update: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(update)],
    delete: [asyncErrorBoundary(reviewExists), asyncErrorBoundary(destroy)],
  };
  