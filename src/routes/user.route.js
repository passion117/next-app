const express = require('express');
const validate = require('../middlewares/validate');
const multer = require('multer');
const userValidation = require('../validations/user.validation');
const userController = require('../controllers/user.controller');

const router = express.Router();

const multerStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public");
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split("/")[1];
        cb(null, `files/admin-${file.fieldname}-${Date.now()}.${ext}`);
    },
});

const multerFilter = (req, file, cb) => {
    const mimetype = file.mimetype.split("/")[1];
    const allMineTypes = ["jpg", "jpeg", "png", "svg", "bmp"]

    if (allMineTypes.includes(mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("No support file extension!!"), false);
    }
};

const upload = multer({
    storage: multerStorage,
    fileFilter: multerFilter,
});

router.post('/pins', validate(userValidation.createOrUpdateUserAsPinInfo), userController.createOrUpdateUserAsPinInfo);
router.get('/get', userController.getUsers);
router.post('/avatar', upload.single('avatar'), userController.UpdateUserAvatar);
module.exports = router;
