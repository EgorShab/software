

// require modules for the Survey Response model
let mongoose = require('mongoose');

let SurveyResponse = mongoose.Schema({
    surveyId: {
        type: mongoose.Schema.Types.ObjectId,
        required: 'Survey ID is required'
    },
    responses: [{
        questionId: {
            type: mongoose.Schema.Types.ObjectId,
            required: 'Question ID is required'
        },
        response: {
            type: String,
            default: '',
            trim: true
        }
    }],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        default: '636ede98c28da25cc52e4291'
    },
    created: {
        type: Date,
        default: Date.now
    },
    update: {
        type: Date,
        default: Date.now
    }
},
{
    collection: "surveyResponses"
});

 module.exports.SurveyResponse = mongoose.model('SurveyResponse', SurveyResponse);