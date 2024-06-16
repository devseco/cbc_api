const AccountController = require('../controllers/AccountController');
const Billcontroller = require('../controllers/Billcontroller');
const CallCenterController = require('../controllers/CallCenterController');
const CardController = require('../controllers/CardController');
const Categorycontroller = require('../controllers/Categorycontroller');
const CityController = require('../controllers/Citiescontroller');
const PushNotificationController = require("../controllers/FirebaseController");
const DiscountController = require('../controllers/Discountcontroller');
const ProductController = require('../controllers/Productcontroller');
const QrController = require('../controllers/QrController');
const SliderController = require('../controllers/Slidercontroller');
const StoriesController = require('../controllers/StoriesController');
const Usercontroller = require('../controllers/Usercontroller');
const MessageController = require('../controllers/MessagesController');
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
//messages
router.post('/send-notification' , PushNotificationController.sendPushNotificationToTopic);
router.get('/getMessages',MessageController.getAllMessages);
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
router.get('/getFilterCategories/:city/:orderby',Categorycontroller.filterAllCategories);
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
router.get('/filterStories/:name',StoriesController.FilterStories);
router.get('/getStoriesBy/:cate/:city/:orderby',StoriesController.filterStoriesBy);
router.get('/getAllStoriesBy/:orderby/:city',StoriesController.filterAllStories);
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
router.delete('/Dash/deleteStore/:id',StoriesController.DeleteStore);
router.delete('/Dash/ImagesStoreDelete',StoriesController.DeleteImages);
router.delete('/Dash/OffersStoreDelete',StoriesController.DeleteOffers);
router.delete('/Dash/AdsStoreDelete',StoriesController.DeleteAds);
router.post('/Dash/updateStoreinfo',StoriesController.updateStore);
router.post('/Dash/addBranches',StoriesController.addBranches);
//upload images store
router.post('/Dash/uploadImagesStore', upload.single('file'), async (req, res, next) => {
  try {
      // Handle file upload logic
      const imageUrl = `https://89.116.110.51:3000/uploads/${req.file.filename}`;

      // Check if the uploaded file is an image
      if (!req.file || !req.file.mimetype.startsWith('image/')) {
          return res.status(400).json({ error: 'Only image files are allowed.' });
      }

      // Call the addCategory function
      await StoriesController.uploadImages(req, res, next, imageUrl);
  } catch (error) {
      // Handle any errors
      next(error); // Pass the error to the error-handling middleware
  }
});
//upload offers store
router.post('/Dash/uploadOffersStore', upload.single('file'), async (req, res, next) => {
  try {
      // Handle file upload logic
      const imageUrl = `https://89.116.110.51:3000/uploads/${req.file.filename}`;

      // Check if the uploaded file is an image
      if (!req.file || !req.file.mimetype.startsWith('image/')) {
          return res.status(400).json({ error: 'Only image files are allowed.' });
      }

      // Call the addCategory function
      await StoriesController.uploadOffers(req, res, next, imageUrl);
  } catch (error) {
      // Handle any errors
      next(error); // Pass the error to the error-handling middleware
  }
});
//upload ads store
router.post('/Dash/uploadAdsStore', upload.single('file'), async (req, res, next) => {
  try {
      // Handle file upload logic
      const imageUrl = `https://89.116.110.51:3000/uploads/${req.file.filename}`;

      // Check if the uploaded file is an image
      if (!req.file || !req.file.mimetype.startsWith('image/')) {
          return res.status(400).json({ error: 'Only image files are allowed.' });
      }

      // Call the addCategory function
      await StoriesController.uploadAds(req, res, next, imageUrl);
  } catch (error) {
      // Handle any errors
      next(error); // Pass the error to the error-handling middleware
  }
});

router.post('/Dash/addStore', upload.fields([
    { name: 'logo', maxCount: 1 },
    { name: 'images', maxCount: 10 },
    { name: 'offers', maxCount: 5 },
    { name: 'ads', maxCount: 2 },
  ]), async (req, res, next) => {
    try {
      // الصورة الأساسية
      const logoUrl = req.files['logo']
        ? `https://89.116.110.51:3000/uploads/${req.files['logo'][0].filename}`
        : null;
      // الصور الثانوية
      const imagesUrls = req.files['images']
        ? req.files['images'].map(file => `https://89.116.110.51:3000/uploads/${file.filename}`)
        : [];
        const offersUrls = req.files['offers']
        ? req.files['offers'].map(file => `https://89.116.110.51:3000/uploads/${file.filename}`)
        : [];
        const adsUrls = req.files['ads']
        ? req.files['ads'].map(file => `https://89.116.110.51:3000/uploads/${file.filename}`)
        : [];
  
      // استدعاء دالة إضافة المنتج مع الصور الأساسية والثانوية
      await StoriesController.addStore(req,res,next, logoUrl,imagesUrls ,offersUrls , adsUrls );
  
    } catch (error) {
      next(error);
    }
  });
  //Discounts
  router.get('/Dash/getAllDescounts',DiscountController.getAll);
  router.get('/Dash/getDiscount/:id',DiscountController.getDiscount);
  router.post('/Dash/addDiscount',DiscountController.addDiscount);
  router.post('/Dash/EditDiscount',DiscountController.EditDiscount);
  router.delete('/Dash/deleteDiscount/:id',DiscountController.DeleteDiscount);
  router.delete('/Dash/EditdeleteDiscount/:id/:title',DiscountController.DashDeleteDiscount);

  //Categories
  router.get('/Dash/getCategories',Categorycontroller.GetAllCategories);
  router.get('/Dash/getCategory/:id',Categorycontroller.DashGetCategory);
  router.get('/Dash/getSliderCategory',Categorycontroller.GetAllSlider);
  router.delete('/Dash/deleteCategory/:id',Categorycontroller.DeleteCategory);
  router.post('/Dash/UpdateCategory',Categorycontroller.UpdateCategory);
  router.delete('/Dash/deleteSliderCategory/:id',Categorycontroller.DeleteSlider);
  router.post('/Dash/addCategory', upload.single('file'), async (req, res, next) => {
    try {
        // Handle file upload logic
        const imageUrl = `https://89.116.110.51:3000/uploads/${req.file.filename}`;

        // Check if the uploaded file is an image
        if (!req.file || !req.file.mimetype.startsWith('image/')) {
            return res.status(400).json({ error: 'Only image files are allowed.' });
        }

        // Call the addCategory function
        await Categorycontroller.AddCategory(req, res, next, imageUrl);
    } catch (error) {
        // Handle any errors
        next(error); // Pass the error to the error-handling middleware
    }
});
router.post('/Dash/addSliderCategory', upload.single('file'), async (req, res, next) => {
  try {
      // Handle file upload logic
      const imageUrl = `https://89.116.110.51:3000/uploads/${req.file.filename}`;

      // Check if the uploaded file is an image
      if (!req.file || !req.file.mimetype.startsWith('image/')) {
          return res.status(400).json({ error: 'Only image files are allowed.' });
      }

      // Call the addCategory function
      await Categorycontroller.AddSlider(req, res, next, imageUrl);
  } catch (error) {
      // Handle any errors
      next(error); // Pass the error to the error-handling middleware
  }
});
//update Image Category
router.post('/Dash/UpdateImageCategory', upload.single('file'), async (req, res, next) => {
  try {
      // Handle file upload logic
      const imageUrl = `https://89.116.110.51:3000/uploads/${req.file.filename}`;

      // Check if the uploaded file is an image
      if (!req.file || !req.file.mimetype.startsWith('image/')) {
          return res.status(400).json({ error: 'Only image files are allowed.' });
      }

      // Call the addCategory function
      await Categorycontroller.UpdateImageCategory(req, res, next, imageUrl);
  } catch (error) {
      // Handle any errors
      next(error); // Pass the error to the error-handling middleware
  }
});
  // Cities
  router.get('/Dash/getAllCities',CityController.GetCities);
  router.get('/Dash/getCity/:id',CityController.DashGetCity);
  router.delete('/Dash/deleteCity/:id',CityController.DeleteCity);
  router.post('/Dash/UpdateCity',CityController.UpdateCity);
  router.post('/Dash/addCity', upload.single('file'), async (req, res, next) => {
    try {
        // Handle file upload logic
        const imageUrl = `https://89.116.110.51:3000/uploads/${req.file.filename}`;

        // Check if the uploaded file is an image
        if (!req.file || !req.file.mimetype.startsWith('image/')) {
            return res.status(400).json({ error: 'Only image files are allowed.' });
        }

        // Call the addCategory function
        await CityController.AddCity(req, res, next, imageUrl);
    } catch (error) {
        // Handle any errors
        next(error); // Pass the error to the error-handling middleware
    }
});
router.post('/Dash/UpdateImageCity', upload.single('file'), async (req, res, next) => {
  try {
      // Handle file upload logic
      const imageUrl = `https://89.116.110.51:3000/uploads/${req.file.filename}`;

      // Check if the uploaded file is an image
      if (!req.file || !req.file.mimetype.startsWith('image/')) {
          return res.status(400).json({ error: 'Only image files are allowed.' });
      }

      // Call the addCategory function
      await CityController.UpdateImageCity(req, res, next, imageUrl);
  } catch (error) {
      // Handle any errors
      next(error); // Pass the error to the error-handling middleware
  }
});

//Card Sales
router.get('/Dash/getSales',CardController.getAllCardSales);
router.delete('/Dash/deleteSales/:id',CardController.DeleteSales);
router.post('/Dash/addSales', upload.single('file'), async (req, res, next) => {
  try {
      // Handle file upload logic
      const imageUrl = `https://89.116.110.51:3000/uploads/${req.file.filename}`;

      // Check if the uploaded file is an image
      if (!req.file || !req.file.mimetype.startsWith('image/')) {
          return res.status(400).json({ error: 'Only image files are allowed.' });
      }

      // Call the addCategory function
      await CardController.addSales(req, res, next, imageUrl);
  } catch (error) {
      // Handle any errors
      next(error); // Pass the error to the error-handling middleware
  }
});
//Card Features
router.post('/Dash/addFeatures',CardController.addFeatures);
router.delete('/Dash/deleteFeatures/:id',CardController.DeleteFeatures);
//Card Doing
router.post('/Dash/addDoing',CardController.addDoing);
router.delete('/Dash/deleteDoing/:id',CardController.DeleteDoing);
//Card Type
router.post('/Dash/addType',CardController.addType);
router.delete('/Dash/deleteType/:id',CardController.DeleteType);
//Card Offer
router.post('/Dash/addOffer',CardController.addOffer);
router.delete('/Dash/deleteOffer/:id',CardController.DeleteOffer);
//Card Image
router.post('/Dash/uploadFront', upload.single('file'), async (req, res, next) => {
  try {
      // Handle file upload logic
      const imageUrl = `https://89.116.110.51:3000/uploads/${req.file.filename}`;

      // Check if the uploaded file is an image
      if (!req.file || !req.file.mimetype.startsWith('image/')) {
          return res.status(400).json({ error: 'Only image files are allowed.' });
      }
      // Call the addCategory function
      await CardController.uploadFront(req, res, next, imageUrl);
  } catch (error) {
      // Handle any errors
      next(error); // Pass the error to the error-handling middleware
  }
});
router.post('/Dash/uploadBack', upload.single('file'), async (req, res, next) => {
  try {
      // Handle file upload logic
      const imageUrl = `https://89.116.110.51:3000/uploads/${req.file.filename}`;

      // Check if the uploaded file is an image
      if (!req.file || !req.file.mimetype.startsWith('image/')) {
          return res.status(400).json({ error: 'Only image files are allowed.' });
      }
      // Call the addCategory function
      await CardController.uploadBack(req, res, next, imageUrl);
  } catch (error) {
      // Handle any errors
      next(error); // Pass the error to the error-handling middleware
  }
});
//Dash Slider
router.delete('/Dash/deleteSliderHome/:id',SliderController.DeleteSlider);
router.post('/Dash/addSliderHome', upload.single('file'), async (req, res, next) => {
  try {
      // Handle file upload logic
      const imageUrl = `https://89.116.110.51:3000/uploads/${req.file.filename}`;
      // Check if the uploaded file is an image
      if (!req.file || !req.file.mimetype.startsWith('image/')) {
          return res.status(400).json({ error: 'Only image files are allowed.' });
      }
      // Call the addCategory function
      await SliderController.AddSlider(req, res, next, imageUrl);
  } catch (error) {
      // Handle any errors
      next(error); // Pass the error to the error-handling middleware
  }
});
//error handle
router.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('حدث خطأ في الخادم');
});

// Exprot



module.exports = router;