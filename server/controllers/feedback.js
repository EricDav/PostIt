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
        .catch(error => res.status(400).send({
          success: false,
          message: 'Response was not saved',
          error
        }));
    });
};

export default feedback;
