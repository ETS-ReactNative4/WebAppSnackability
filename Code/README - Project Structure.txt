# Snackability Web App

Project Structure

- webappsnackability
    - Code
        - backend                     -> Contains the backend API portion of the snackability web app.            
            - controllers             -> Controllers directory for the javascript files.
                - usda.controller.js  -> Configuration for USDA API.
            - excelfiles              -> Directory to save the csv or data files for the snacks.
                - first_ing_list.csv  -> CSV File that contains all the information about all ingredients that are considered as first.
                - processed_food.csv  -> CSV File that contains all the information for the processed food ingredients.
            - middlewares             -> Middlewares folders.
                - decodeToken.js      -> Javascript file that contains the decoding code for the login user.
            - node_modules            -> Contains all the node modules for the backend. 
            - routes                  -> Contains javascript files for the routes.
                 - score.routes.js    -> Routes for the Score.
                 - usda.routes.js     -> Routes for the USDA.
            - .env.delopment          -> This file should be copied into the backend in order to run it.
            - .env.production         -> This file should be copied into the backend in order to run it.
            - .gitignore              -> Keep track of file that should not be uploaded to GitHub.
            - package-lock.json       -> Contains information about the packages have been installed in the backend.
            - package.json            -> Contains information about what packages have been installed in the backend.
            - README.md               -> Intructions about how to Run the backend. 
            - server.js               -> Routes Manager for the backend.
            - serviceAccount.json     -> Configuration for Firebase and Google API.
        - frontend                    -> Contains the frontend react native application portion of the snackability web app.
            - node_modules            -> Contains all the node modules for the frontend.
            - public                  -> Contains the icon for snackability tab on the browser.
            - Source                  -> Contains the source code for the frontend react native application.
                - Components              -> Contains all the components.
                    - Home                -> Home Screen of the Snackability app.
                    - NavBar              -> Navigation Bar that allows us to move among tabs from anywhere in the page. 
                    - Result              -> Return snack based on the image of the QR code from a snack. 
                    - Scanner             -> Scanner component that lets us use the webcam to scan snacks. 
                    - Settings            -> Logout, settings and other properties of the web application. 
                    - SignIn              -> Sign in component in order to log in to the app.
                    - Snack-Graph         -> Snackability graph that has the average of the last 5 days of snacks consumed.        
                    - Snack-USDA-Details  -> Details of each snack selected from the USDA.
                    - Snack-USDA-List     -> List of snacks generated from the USDA.
                - Images                  -> Contains all the images for the frontend including individual pictures and logos.
                - routes                  -> Contains javascript files for the routes.
                 - private-route.component.js    -> Javascript file that contains the private route.
                 - public-routes.component.js    -> Javascript file that contains the public route.
                - services                -> Contains the Javascript Axios Folder.
                    - score.service.js    -> Javascript Axios code file function related to the score.
                    - snack.service.js    -> Javascript Axios code file function related to the snack.
                - Styles (CSS)            -> Contains all CSS for the frontend components.
                    - AppModule           -> Modules for application. 
                    - Graph               -> Style for the snack graph.
                    - Home                -> Styles for the home page. 
                    - Index               -> Index css. 
                    - Scanner             -> Scanner window that pops up to scan snack.
                    - Settings            -> Settings for the logout, properties and other attributes of the web application.
                    - Snack-Details       -> Details for a snack css. 
                    - StylesModule        -> General module styles. 
                - utils               -> Contains important javascript files.
                    - auth.js         -> Javascript file that contains the firebase intialization code.
                    - debounce.js     -> Javascript file that contains the debounce code.
                    - feedback.json   -> Javascript file that contains the embedded messages when the score is calculated.
                - App.js              -> Javascript file that has the navbar and frontend routes.
                - index.js            -> React and Axios Default file when creating React project.
            - .env                    -> This file should be copied into the frontend in order to run it.
            - .gitignore              -> Keep track of file that should not be uploaded to GitHub.
            - package-lock.json       -> Contains information about the packages have been installed in the frontend.
            - package.json            -> Contains information about what packages have been installed in the frontend.
            - README.md               -> Intructions about how to Run the frontend.
        - README-ProjectStructure.txt -> This Document.
    - Documentation                   -> Contains documentation for users and developers including installation instructions.
        - images                      -> Contains the images used in Documentation.
        - instructions.md             -> Intructions about how to Run the project.
    - .gitignore                      -> Keep track of file that should not be uploaded to GitHub.
    - Readme.md                       -> Has a description about the project.




### SnackGraph Component
Component name: snack-graph.component.js
Dependencies: Code/frontend/styles/graph.css
Latest Update: 07/17/2021

This component is responsible for creating a graph of type bar to display snacks consumed by a certain user for the past five days. 

Data can be find and modified in {setChartData} and options that properly render the visual aspects of the graph on {options}. Moreover, the inside functions works by getting input
from Firebase, formating the date to YYYY-MM-DD, getting the past 5 dates that an user consumed a snack and pushing it into the data for the graph. 

Y axis is the average amount of snack-points consumed per day.
X axis is the date of when snacks were consumed.