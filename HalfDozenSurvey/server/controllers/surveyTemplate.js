// create the Survey Template Model instance
const surveyTemplateModel = require('../models/surveyTemplate');
const SurveyTemplate = surveyTemplateModel.SurveyTemplate; // alias

const surveyResponseModel = require('../models/surveyResponse');
const SurveyResponse = surveyResponseModel.SurveyResponse; // alias

module.exports.displayHomePage = (req, res, next) => {
    SurveyTemplate.find().sort('name').exec((err, surveyTemplates) => {
        if (err) return console.error(err);
        res.json(surveyTemplates);
    });
};

module.exports.processAddPage = (req, res, next) => {
    const newSurvey = SurveyTemplate({
        name: req.body.name,
        description: req.body.description,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        surveyType: req.body.surveyType,
        questions: req.body.questions,
        userId: req.body.userId
    });
    
    SurveyTemplate.create(newSurvey, (err, survey) => {
        if(!err) res.json({ success: true, msg: 'Successfully Added New Survey', survey });
        console.log(err);
        res.end(err);
    });
};

module.exports.displayEditPage = (req, res, next) => {
    const id = req.params.id;
    SurveyTemplate.findById(id, (err, surveyToEdit) => {
        if (!err) return res.json(surveyToEdit);
        console.log(err);
        res.end(err);
    });
};

module.exports.processEditPage = (req, res, next) => {
    const id = req.params.id;
    const updatedSurvey = SurveyTemplate({
        _id: id,
        name: req.body.name,
        description: req.body.description,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        surveyType: req.body.surveyType,
        questions: req.body.questions,
        userId: req.body.userId,
        created: req.body.created,
        updated: req.body.updated
    });

    SurveyTemplate.updateOne({_id: id}, updatedSurvey, (err, survey) => {
        if(!err) return res.json({ success: true, msg: 'Successfully Edited Survey', survey });
        console.log(err);
        res.end(err);
    });
};

module.exports.performDelete = (req, res, next) => {
    const id = req.params.id;
    SurveyTemplate.remove({_id: id}, err => {
        if(!err) return res.json({ success: true, msg: 'Successfully Delete Survey' })
        console.log(err);
        res.end(err);
    });
}

module.exports.processResponsePage = (req, res, next) => {
    const id = req.params.id;
    const newResponse = SurveyResponse({
        surveyId: id,
        responses: req.body.responses,
        userId: req.body.userId
    });
    
    SurveyResponse.create(newResponse, (err, response) => {
        if(!err) return res.json({ success: true, msg: 'Successfully Response Survey', response });
        console.log(err);
        res.end(err);
    });
};

module.exports.displayReportPage = (req, res, next) => {
    const id = req.params.id;
    SurveyResponse.find({ surveyId: id }, (err, responseUsers) => {
        if (!err) return res.json(responseUsers);
        console.error(err);
        res.end(err);
    });
};