const AccountController = require('../controllers/AccountController');
const Billcontroller = require('../controllers/Billcontroller');
const CallCenterController = require('../controllers/CallCenterController');
const CardController = require('../controllers/CardController');
const Categorycontroller = require('../controllers/Categorycontroller');
const CityController = require('../controllers/Citiescontroller');
const DiscountController = require('../controllers/Discountcontroller');
const ProductController = require('../controllers/Productcontroller');
const QrController = require('../controllers/QrController');
const SliderController = require('../controllers/Slidercontroller');
const StoriesController = require('../controllers/StoriesController');
const Usercontroller = require('../controllers/Usercontroller');
const { authenticateToken } = require('../middleware/auth');
const router = require('express').Router();
const auth = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
//uploadimage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadDir = 'uploads/';
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir);
      }
      cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });
  const upload = multer({ storage: storage });
//Auth
router.get('/allusers',auth.authenticateToken,Usercontroller.getAllUsers);
router.post('/addnew',Usercontroller.addnewuser);
router.post('/login',Usercontroller.login);
//Products
router.get('/getProducts',ProductController.GetAllProducts);
router.get('/getProduct/:id',ProductController.GetProduct);
router.get('/filterProducts/:title',ProductController.FilterProducts);
router.get('/getProductByCategory/:id',ProductController.GetProductByCategory);
router.get('/getProductsRecently',ProductController.GetProductRecently);
//Categories
router.get('/getCategories',Categorycontroller.GetAllCategories);
router.get('/getCategory/:id',Categorycontroller.GetCategory);
//Sliders
router.get('/getSliders',SliderController.GetAllProducts);
//Bills
router.get('/getBillsLastest/:id',Billcontroller.getBillsLastest);
router.get('/getBill/:id',Billcontroller.getBill);
router.get('/getBills/:id',Billcontroller.getBillsByid);
router.post('/addBill',Billcontroller.addBill);
router.get('/getSales/:id',Billcontroller.getSalesById);
//Cities
router.get('/getAllCities',CityController.GetCities);
//discounts
router.get('/getDiscountrecently',DiscountController.getRecently);
router.get('/getDiscountHighest',DiscountController.getHighest);

//Stories
router.get('/getStories/:cate/:city',StoriesController.GetAllStories);
router.get('/getStore/:id',StoriesController.GetStoreByID);
router.get('/getAllStories',StoriesController.GetStoreByID);
//Card
router.get('/getCardAbout',CardController.getCardAbout);
router.get('/getCardType',CardController.getCardType);
router.get('/getCardSales',CardController.getCardSales);
//Account
router.get('/getAccount/:number',AccountController.GetAccount);
//Call Center
router.get('/getCallCenter',CallCenterController.getCallCenter);
//Qr
router.get('/getQr',QrController.getQr);


//Dash Routers
//Get All stories
router.get('/Dash/getAllStories',StoriesController.DashGetAllStories);
router.post('/Dash/addStore', upload.fields([
    { name: 'logo', maxCount: 1 },
    { name: 'images', maxCount: 10 },
    { name: 'offers', maxCount: 5 },
    { name: 'ads', maxCount: 2 },
  ]), async (req, res, next) => {
    try {
      // الصورة الأساسية
      const logoUrl = req.files['logo']
        ? `http://127.0.0.1:3000/uploads/${req.files['logo'][0].filename}`
        : null;
      // الصور الثانوية
      const imagesUrls = req.files['images']
        ? req.files['images'].map(file => `http://127.0.0.1:3000/uploads/${file.filename}`)
        : [];
        const offersUrls = req.files['offers']
        ? req.files['offers'].map(file => `http://127.0.0.1:3000/uploads/${file.filename}`)
        : [];
        const adsUrls = req.files['ads']
        ? req.files['ads'].map(file => `http://127.0.0.1:3000/uploads/${file.filename}`)
        : [];
  
      // استدعاء دالة إضافة المنتج مع الصور الأساسية والثانوية
      await StoriesController.addStore(req,res,next, logoUrl,imagesUrls ,offersUrls , adsUrls );
  
    } catch (error) {
      next(error);
    }
  });


  //Discounts
  router.get('/Dash/getAllDescounts',DiscountController.getAll);





// Exprot



module.exports = router;