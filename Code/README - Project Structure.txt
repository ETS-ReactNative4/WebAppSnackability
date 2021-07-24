# Snackability Web App

Project Structure

- backend                       Contains the backend API portion of the snackability web app
    - node_modules              Contains all the node modules for the backend  

- frontend                      Contains the frontend react native application portion of the snackability web app
    - Node_mMdules              Contains all the node modules for the frontend
    - Source                    Contains the source code for the frontend react native application           
    - Components                Contains all the components
          - Home                -> Home Screen of the Snackability app.
          - NavBar              -> Navigation Bar that allows us to move among tabs from anywhere in the page. 
          - Result              -> Return snack based on the image of the QR code from a snack. 
          - Scanner             -> Scanner component that lets us use the webcam to scan snacks. 
          - Settings            -> Logout, settings and other properties of the web application. 
          - SignIn              -> Sign in component in order to log in to the app.
          - Snack-Graph         -> Snackability graph that has the average of the last 5 days of snacks consumed.        
          - Snack-USDA-Details  -> Details of each snack selected from the USDA
          - Snack-USDA-List     -> List of snacks generated from the USDA.
    - Styles (CSS)
          - AppModule           -> Modules for application. 
          - Graph               -> Style for the snack graph.
          - Home                -> Styles for the home page. 
          - Index               -> Index css. 
          - Scanner             -> Scanner window that pops up to scan snack.
          - Settings            -> Settings for the logout, properties and other attributes of the web application.
          - Snack-Details       -> Details for a snack css. 
          - StylesModule        -> General module styles. 
    - Images                    Contains all the images for the frontend including individual pictures and logos

- Documentation                 Contains documentation for users and developers including installation instructions
    - images                    Contains the images used in Documentation




### SnackGraph Component
Component name: snack-graph.component.js
Dependencies: Code/frontend/styles/graph.css
Latest Update: 07/17/2021

This component is responsible for creating a graph of type bar to display snacks consumed by a certain user for the past five days. 

Data can be find and modified in {setChartData} and options that properly render the visual aspects of the graph on {options}. Moreover, the inside functions works by getting input
from Firebase, formating the date to YYYY-MM-DD, getting the past 5 dates that an user consumed a snack and pushing it into the data for the graph. 

Y axis is the average amount of snack-points consumed per day.
X axis is the date of when snacks were consumed.