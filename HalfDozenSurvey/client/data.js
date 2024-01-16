module.exports = () => {
    return {
        surveyResponses: [
            {
                id: 1,
                "_id": { "$oid": "63719dcdb12c81432a85c923" },
                "surveyId": { "$oid": "63715f797f3ee47fd7ab122f" },
                "responses": [
                    {
                        "questionId": { "$oid": "637194f064038b95874d01f0" },
                        "response": "Continue",
                        "_id": { "$oid": "63719dcdb12c81432a85c924" }
                    },
                    {
                        "questionId": { "$oid": "637194f064038b95874d01f1" },
                        "response": "No", "_id": { "$oid": "63719dcdb12c81432a85c925" }
                    },
                    {
                        "questionId": { "$oid": "637194f064038b95874d01f2" },
                        "response": "5", "_id": { "$oid": "63719dcdb12c81432a85c926" }
                    }
                ],
                "userId": { "$oid": "636ede98c28da25cc52e4291" },
                "created": { "$date": { "$numberLong": "1668390349964" } },
                "update": { "$date": { "$numberLong": "1668390349964" } },
                "__v": { "$numberInt": "0" }
            },
            {
                id: 2,
                "_id": { "$oid": "63719dcdb12c81432a85c923" },
                "surveyId": { "$oid": "63715f797f3ee47fd7ab122f" },
                "responses": [
                    {
                        "questionId": { "$oid": "637194f064038b95874d01f0" },
                        "response": "Continue",
                        "_id": { "$oid": "63719dcdb12c81432a85c924" }
                    },
                    {
                        "questionId": { "$oid": "637194f064038b95874d01f1" },
                        "response": "No",
                        "_id": { "$oid": "63719dcdb12c81432a85c925" }
                    },
                    {
                        "questionId": { "$oid": "637194f064038b95874d01f2" },
                        "response": "5"
                        , "_id": { "$oid": "63719dcdb12c81432a85c926" }
                    }
                ],
                "userId": { "$oid": "636ede98c28da25cc52e4291" },
                "created": { "$date": { "$numberLong": "1668390349964" } },
                "update": { "$date": { "$numberLong": "1668390349964" } },
                "__v": { "$numberInt": "0" }
            },
            {
                id: 3,
                "_id": { "$oid": "6371b031617e1ad6a40af11b" },
                "surveyId": { "$oid": "6371b017617e1ad6a40af0fc" },
                "responses": [
                    {
                        "questionId": { "$oid": "6371b029617e1ad6a40af10c" },
                        "response": "Good", "_id": { "$oid": "6371b031617e1ad6a40af11c" }
                    }
                ],
                "userId": { "$oid": "636ede98c28da25cc52e4291" },
                "created": { "$date": { "$numberLong": "1668395057801" } },
                "update": { "$date": { "$numberLong": "1668395057801" } },
                "__v": { "$numberInt": "0" }
            },
            {
                id: 4,
                "_id": { "$oid": "6371bd07617e1ad6a40af1bf" },
                "surveyId": { "$oid": "6371b017617e1ad6a40af0fc" },
                "responses": [
                    {
                        "questionId": { "$oid": "6371b029617e1ad6a40af10c" },
                        "response": "Good",
                        "_id": { "$oid": "6371bd07617e1ad6a40af1c0" }
                    }
                ],
                "userId": { "$oid": "636ede98c28da25cc52e4291" },
                "created": { "$date": { "$numberLong": "1668398343952" } },
                "update": { "$date": { "$numberLong": "1668398343952" } },
                "__v": { "$numberInt": "0" }
            },
            {
                id: 5,
                "_id": { "$oid": "63733d130b9ff6fee4ed2bf5" },
                "surveyId": { "$oid": "63733cec0b9ff6fee4ed2bdb" },
                "responses": [
                    {
                        "questionId": { "$oid": "63733cec0b9ff6fee4ed2bdc" },
                        "response": "Good",
                        "_id": { "$oid": "63733d130b9ff6fee4ed2bf6" }
                    }
                ],
                "userId": { "$oid": "636ede98c28da25cc52e4291" },
                "created": { "$date": { "$numberLong": "1668496659747" } },
                "update": { "$date": { "$numberLong": "1668496659747" } },
                "__v": { "$numberInt": "0" }
            }
        ],
        surveyTemplates: [
            {
                id: 1,
                "_id": { "$oid": "63733cec0b9ff6fee4ed2bdb" },
                "name": "New survey",
                "description": "",
                "startDate": { "$date": { "$numberLong": "1668470400000" } },
                "endDate": { "$date": { "$numberLong": "1670630400000" } },
                "surveyType": "MC",
                "questions": [
                    {
                        "questionNumber": { "$numberInt": "1" },
                        "questionText": "How are you?",
                        "questionOptions": [],
                        "_id": { "$oid": "63733cec0b9ff6fee4ed2bdc" }
                    }
                ],
                "userId": { "$oid": "636ede98c28da25cc52e4291" },
                "created": { "$date": { "$numberLong": "1668496620456" } },
                "update": { "$date": { "$numberLong": "1668496620456" } },
                "__v": { "$numberInt": "0" }
            }
        ],
        users: [
            {
                id: 1,
                "_id": { "$oid": "636ede98c28da25cc52e4291" },
                "username": "anonymous",
                "email": "anonymous@example.com",
                "displayName": "Anonymous"
            }
        ]
    }
}