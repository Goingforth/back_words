const express = require("express");

const router = express.Router();

// // const ctrl = require("../controllers/userController");
// // const ctrlNews = require("../controllers/newsController");

// dataRouter.get('/', (req, res) => {
//     res.send('Node.js server connected to PostgreSQL!');
//     res.end();
// });

// dataRouter.get('/time', (req, res) => {
//     pool.query('SELECT NOW()', (err, result) => {
//         if (err) {
//             console.error('Error executing query', err);
//             res.status(500).json({ error: 'Internal Server Error' });
//         } else {
//             res.json({ currentTime: result.rows[0].now });
//         }
//     });
// });

const userController = require('../controllers/userController');
const glossaryController = require('../controllers/glossaryController');

router.get('/users', userController.getUsers);
router.post('/users', userController.createUser);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

router.post('/create_table_glossary', glossaryController.createTableGlossary);
router.post('/create_glossary', glossaryController.createGlossary);
router.delete('/clear_glossary', glossaryController.clearGlossary);
router.get('/view_glossary', glossaryController.viewGlossary);
router.get('/view_glossary_by_parts', glossaryController.viewGlossaryByParts);
router.get('/get_size_glossary', glossaryController.getSizeGlossary);
router.get('/get_amount_passed', glossaryController.getAmountPassed);


router.put('/new_glossary', glossaryController.newGlossary);
router.put('/set_passed_word', glossaryController.setPassedWord);

// Example: Querying the database

//dataRouter.get('/team', ctrl.dataTeam);
// dataRouter.get('/history', ctrl.dataHistory);
// dataRouter.get('/vacancies', ctrl.dataVacancies);
// dataRouter.get('/statistics', ctrl.dataStatistics);
// dataRouter.get('/testimonials', ctrl.dataTestimonials);
// dataRouter.get('/table_pricing', ctrl.dataTablePricing);
// dataRouter.get('/portfolio_card', ctrl.dataPortfolioCard);
// dataRouter.get('/services', ctrl.dataServices);
// dataRouter.get('/services_item', ctrl.dataServicesItem);
// dataRouter.get('/slider_hero', ctrl.dataSliderHero);
// dataRouter.get('/steps', ctrl.dataSteps);
// dataRouter.get('/clients_logo', ctrl.dataClientsLogo);
// dataRouter.get('/corevalues', ctrl.dataCorevalues);
// dataRouter.get('/locations', ctrl.dataLocations);
// dataRouter.get('/hero_page', ctrl.dataHeroPages);
// dataRouter.get('/projects', ctrl.dataProjects);
// dataRouter.get('/media_tabs', ctrl.dataMediaTabs);
// dataRouter.get('/gallerys', ctrl.dataGalleryByName);
// dataRouter.get('/benefits', ctrl.dataBenefitsByName);
// dataRouter.get('/offices', ctrl.dataOffices);


// dataRouter.get("/news/:id", ctrlNews.dataNewsByID);
// dataRouter.get("/news", ctrlNews.dataNews);
// dataRouter.post("/news/comments/:id", ctrlNews.postCommentByIdNews);

module.exports = router;