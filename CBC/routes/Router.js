const Billcontroller = require('../controllers/Billcontroller');
const CardController = require('../controllers/CardController');
const Categorycontroller = require('../controllers/Categorycontroller');
const CityController = require('../controllers/Citiescontroller');
const DiscountController = require('../controllers/Discountcontroller');
const ProductController = require('../controllers/Productcontroller');
const SliderController = require('../controllers/Slidercontroller');
const StoriesController = require('../controllers/StoriesController');
const Usercontroller = require('../controllers/Usercontroller');
const { authenticateToken } = require('../middleware/auth');
const router = require('express').Router();
const auth = require('../middleware/auth');
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
//Card
router.get('/getCardAbout',CardController.getCardAbout);
router.get('/getCardType',CardController.getCardType);
router.get('/getCardSales',CardController.getCardSales);
//Highest
// Exprot

module.exports = router;