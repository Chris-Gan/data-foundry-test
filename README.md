# AWS Amplify Front-end Application 🚀

## Description

This project is a full-stack application with the backend built using AWS Amplify, which includes Lambda functions, S3 storage (to store favicon and preferred font type), DynamoDB, RESTful API, Cognito, and IAM. However, since it is a frontend challenge, the focus is more on frontend technologies while ensuring a basic setup of the backend using Amplify. The application features a login page, fetches and displays static content from an S3 bucket, and includes a mini portal where users can submit inputs. These inputs are saved to DynamoDB and displayed on the UI.

## 🛠 Requested Deliverables

1. **Set up AWS Amplify**
   - Amplify is setup with Cognito, Lambda function, API Gateway, S3, Dynamo DB
   - Web hosting is done via Amplify & CI/ CD implemented after a Github repo integration
3. **User Authentication**
   - Achieved directly using <em>**aws-amplify/auth**</em>
   - Users can login, sign uo, log off & receive validation email,
4. **Fetch and Display Files from S3**
   - **Preferred font family & webpage favicon** are stored in S3 and fetch while loading the application
5. **Create a Mini Web Portal on the UI with DynamoDB Integration**
   - **DynamoDB Integration**: Webpage is created and integrated to the Dynamo DB using Lambda function, REST API (from AWS API Gateway)
   - **Display Submitted Data**: Saved data from DynamoDB is retrieved and displayed properly in a table structure
   - **Form Validation**: Ensures all required fields are filled out using Yup.
   - **Unique Case Number**: Generated using a UUID generator inside the Lambda function.

## ✨Personal Enhancements

In addition to the original functionality, extra features are added in to further complete the project:

- **Update Existing Request**: Users can update fields of existing service requests.
- **Delete Existing Request**: Users can delete service requests.
- **Dark/Light Theme Toggling**: Users can switch between dark and light themes.
- **Sorting, Filtering, Column Selection, File Export**: Purely from the frontend for better data management and visualization.


## Main Frontend Technologies

- React
- TypeScript
- Yup
- Formik
- Material-UI
- Redux Toolkit
- React Query



## 🏃‍♂️Running Locally

1. **Clone the Repository**:
  ```bash
   git clone https://github.com/Chris-Gan/data-foundry-test.git
   cd data-foundry-test
  ```
2. **Install Dependencies**:
  ```bash
  npm install
  ```
3. **Start the Application**:
  ```bash
  npm start
  ```

## 🌍 Live Demo
- You can check out the live demo of the application at [here](https://master.d25z4iec0g453l.amplifyapp.com/)
- Feel free to register yourself an user to login. However, you may login using the credentials I had attached inside the email

Enjoy!
