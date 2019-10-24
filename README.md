This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## NCAAF Tables to CSV

This app was a quick project to convert tabular College Football odds and spreads data to Comma Separated Values for analysis with a spreadsheet. Though I could have done this in vanilla JavaScript, I used React to get my feet wet using the *fairly* new React Hooks api.

Right now, it is wired to clean up tabular data from 3 different sites: DonBest.com, SportsLine.com and CompughterRatings.com. The user copies the table and pastes it into a form field which spits out the cleaned up comma separated text. The obvious downside is that the end user has to find those tables on those pages, so my next step will be to refactor it from a client-side to a server-side app that can grab each of those tables with an api call made at the click of a button.

