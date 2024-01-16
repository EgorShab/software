var express = require('express');
var router = express.Router();
let surveyTemplateController = require('../controllers/surveyTemplate');

/* GET Route for the Business Contact List page - READ Operation */
router.get('/', surveyTemplateController.displayHomePage);

/* POST Route for displaying the Add page - CREATE Operation */
router.post('/add', surveyTemplateController.processAddPage);

/* GET Route for displaying the Edit page - UPDATE Operation */
router.get('/edit/:id', surveyTemplateController.displayEditPage);

/* POST Route for displaying the Edit page - UPDATE Operation */
router.post('/edit/:id', surveyTemplateController.processEditPage);

/* GET to perform Deletion - DELETE Operation */
router.get('/delete/:id', surveyTemplateController.performDelete);

/* POST Route for displaying the Response page - CREATE Operation */
router.post('/respond/:id', surveyTemplateController.processResponsePage);

/* GET Route for displaying the Report page - READ Operation */
router.get('/report/:id', surveyTemplateController.displayReportPage);

module.exports = router;
