## This project uses below env variables that we need to configure. 

We need to create .env file at root of the project and add below variables. 

REACT_APP_GITHUB_API_KEY = // YOUR OWN PERSONAL GIT ACCESS TOKEN 
REACT_APP_REPO_NAME = javascript
REACT_APP_REPO_OWNER = airbnb
REACT_APP_GRAPHQL_BASE_URL = https://api.github.com/graphql


## How to create git personal token ? 
Please visit below link to know how to create the personal access token. 
https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/managing-your-personal-access-tokens

Once done assign that token value to REACT_APP_GITHUB_API_KEY variable in env. 


## Start the app 
First we need to run below command to install dependencies 

npm install 

After installation is done, run below command to start the application 

npm start 

After this command, the application will be launched in default browser. 
