# Analyzing the voting records of GA members of Congress
## Nic, Luminda, Aaron, Grant, Angel, Sam

## 

Our project explored the voting records of Georgia's elected representatives (Senators and house members). We gathered the voting records of each representative from the current year's Congress. A map of Georgia's different congressional districts and a web page with an interactive menu were created. When a congressional member is selected, it will display metrics such as how many bills they have passed, to what degree they vote along party lines, the category of bills they have proposed, and so on and so forth. We also displayed some general demographic data for Georgia's voting population. For this project we used python with a juptyter notbook to access and makes calls to the ProPublica api. Once we had the data within python we used SQLalchemy to store all of our poltician/voting record data in a SQLite database. We then created a Flask app to be able to make API calls from Javascript in order to visualize our data on the web. We used D3, Leaflet, and Plotly within Javascript to create our visualizations. 

## Questions

1. How do we retrieve congressional data.
2. How do we store our data in a way to be able to access it via javascript.
3. How do we create dynamic visulaizations to give the user insight on representative voting.

Url: https://lumindak.github.io/Project-Analyzing-voting-records/
