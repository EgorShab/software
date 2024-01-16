

// require modules for the Survey Template model
let mongoose = require('mongoose');

let SurveyTemplate = mongoose.Schema({
    name: {
        type: String,
        required: 'Name is required',
    },
    description: {
        type: String,
        default: ''
    },
    startDate: {
        type: Date,
        default: Date.now
    },
    endDate: {
        type: Date,
        required: 'End date is required'
    },
    surveyType: {
        type: String,
        enum: ['MC', 'AD', 'SA'],
        required: 'Survey Type is required'
    },
    questions: [{
            questionNumber: {
                type: Number,
                required: 'Question Number is required'
            },
            questionText: {
                type: String,
                trim: true,
                required: 'Question Text is required'
            },
            questionOptions: [{
                type: String,
                required: 'Option Text is required'
            }]
        }
    ],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        default: '636ede98c28da25cc52e4291',
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    }
},
{
    collection: "surveyTemplates"
});

 module.exports.SurveyTemplate = mongoose.model('SurveyTemplate', SurveyTemplate);