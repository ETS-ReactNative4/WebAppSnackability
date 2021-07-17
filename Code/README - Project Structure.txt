# Snackability Web App

Project Structure

- backend                       Contains the backend API portion of the snackability web app
    - node_modules              Contains all the node modules for the backend  

- frontend                      Contains the frontend react native application portion of the snackability web app
    - node_modules              Contains all the node modules for the frontend
    - src                       Contains the source code for the frontend react native application 
        - components            Contains all the components
        - images                Contains all the images for the frontend including individual pictures and logos

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