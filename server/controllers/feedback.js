import dataBase from '../models';

const Feedback = dataBase.Feedback;

/**
   * @description save user feedback in database
   * 
   * @param  {object} req
   * @param  {object} res
   * @return {none} no return
   */
const feedback = (req, res) => {
  Feedback.create({
    Bug: req.body.Bug,
    recomendation: req.body.recomendation,
    generalRating: req.body.generalRating,
    rejections: req.body.rejections
  })
    .then(() => {
      res.status(201).json({
        success: true,
        message: 'Response saved successfully'
      })
        .catch(() => res.status(500).json({
          success: false,
          message: 'Response was not saved',
        }));
    });
};

export default feedback;
