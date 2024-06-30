/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

const express = require('express');
const bodyParser = require('body-parser');
const awsServerlessExpressMiddleware = require('aws-serverless-express/middleware');
const AWS = require('aws-sdk');
const uuid = require('uuid');

// declare a new express app
const app = express();
const dynamoDb = new AWS.DynamoDB.DocumentClient();
const tableName = process.env.STORAGE_SERVICEREQUEST_NAME;
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    next();
});

app.get('/services', async (req, res) => {
    const params = {
        TableName: tableName,
    };

    try {
        const data = await dynamoDb.scan(params).promise();
        const items = data.Items;
        const sortedItems = items.sort((a, b) => new Date(b.lastUpdatedAt) - new Date(a.lastUpdatedAt));
        res.status(200).json({
            items: sortedItems,
        });
    } catch (error) {
        res.status(500).json({ error: 'Could not fetch service requests' });
    }
});

app.post('/services', async (req, res) => {
    // Parse the body if it is a string
    const requestBody = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const { requestName, requestDescription, creationDate, severity, resolutionDate, reporterName, contactInformation, location } = requestBody;
    const id = uuid.v4();
    const params = {
        TableName: tableName,
        Item: {
            id,
            requestName,
            requestDescription,
            creationDate,
            severity,
            resolutionDate,
            reporterName,
            contactInformation,
            location,
            lastUpdatedAt: new Date().toISOString(),
        },
    };
    try {
        await dynamoDb.put(params).promise();
        res.status(201).json({ message: 'Service request created', id });
    } catch (error) {
        res.status(500).json({ error: 'Could not create service request' });
    }
});

app.put('/services/:id', async (req, res) => {
    const { id } = req.params;
    const requestBody = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const { requestName, requestDescription, severity, resolutionDate, reporterName, contactInformation, location } = requestBody;
    const params = {
        TableName: tableName,
        Key: {
            id,
        },
        UpdateExpression:
            'set requestName = :requestName, requestDescription = :requestDescription, severity = :severity, resolutionDate = :resolutionDate, reporterName = :reporterName, contactInformation = :contactInformation, #location = :location, lastUpdatedAt = :lastUpdatedAt',
        ExpressionAttributeNames: {
            '#location': 'location',
        },
        ExpressionAttributeValues: {
            ':requestName': requestName,
            ':requestDescription': requestDescription,
            ':severity': severity,
            ':resolutionDate': resolutionDate,
            ':reporterName': reporterName,
            ':contactInformation': contactInformation,
            ':location': location,
            ':lastUpdatedAt': new Date().toISOString(),
        },
        ReturnValues: 'UPDATED_NEW',
    };
    try {
        const result = await dynamoDb.update(params).promise();
        res.status(200).json({ message: 'Service request updated', result });
    } catch (error) {
        console.log({ error });
        res.status(500).json({ error: 'Could not update service request' });
    }
});

app.delete('/services/:id', async (req, res) => {
    const { id } = req.params;
    const params = {
        TableName: tableName,
        Key: {
            id,
        },
    };

    try {
        await dynamoDb.delete(params).promise();
        res.status(200).json({ message: 'Service request deleted' });
    } catch (error) {
        console.log({ error });
        res.status(500).json({ error: 'Could not delete service request' });
    }
});

app.listen(3000, function () {});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
