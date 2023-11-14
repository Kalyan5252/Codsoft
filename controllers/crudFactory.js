const apiFeatures = require('./../utility/APIFeatures');
const catchAsync = require('./../utility/catchAsync');
const appError = require('./../utility/AppError');

exports.getAll = (Model) =>
  catchAsync(async (req, res, next) => {
    let filter = {};
    const features = new apiFeatures(Model.find(filter), req.query)
      .filter()
      .sort()
      .fields()
      .pagination();

    const data = await features.query;
    res.status(200).json({
      status: 'success',
      products: data.length,
      data: {
        data,
      },
    });
  });

exports.getOne = (Model, Options) =>
  catchAsync(async (req, res, next) => {
    const id = req.params.id;
    let query = Model.findById(id);
    if (Options) query = query.populate(Options);
    const data = await query;
    res.status(200).json({
      status: 'success',
      data: {
        data,
      },
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const id = req.params.id;
    const body = req.body;
    // console.log("body is", body);
    const data = await Model.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!data) return next(new appError('Document not found', 404));

    res.status(200).json({
      status: 'success',
      data: {
        data,
      },
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const data = await Model.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        data,
      },
    });
  });

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const data = await Model.findByIdAndDelete(req.params.id);
    if (!data) return next(new appError('Document not found', 404));
    res.status(201).json({
      status: 'success',
      data: 'null',
    });
  });
