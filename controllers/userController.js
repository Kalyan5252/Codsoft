const User = require('./../models/userModel');
const catchAsync = require('./../utility/catchAsync');
const appError = require('./../utility/AppError');
const crudFactory = require('./../controllers/crudFactory');
const multer = require('multer');
const sharp = require('sharp');
const authController = require('./authController');

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(new appError('Upload only image files..', 400), false);
  }
};

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();
  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;
  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat('jpeg')
    .jpeg({ quality: 100 })
    .toFile(`public/images/users/${req.file.filename}`);
  next();
});
const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.updateUserPhoto = upload.single('photo');

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.updateUserData = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(new appError('This route is not for password updates.', 400));
  }
  const filteredBody = filterObj(req.body, 'name', 'mobile', 'address');
  if (req.file) {
    filteredBody.photo = req.file.filename;
  }
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

exports.deactivateUser = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.getAllUsers = crudFactory.getAll(User);
exports.createUser = crudFactory.createOne(User);
exports.updateUser = crudFactory.updateOne(User);
exports.getUser = crudFactory.getOne(User);
exports.deleteUser = crudFactory.deleteOne(User);
