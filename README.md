# tremckinley Weather — Fullstack (Frontend)

A small static weather demo project containing a simple frontend (HTML/CSS/JS) and test data.
This app was built as a part of a fullstack course with Codecademy. While meeting the practice project requirements, the UX/UI does leave some to be desired.

**Requirements**
```
GIVEN a weather dashboard with form inputs

WHEN I search for a city  
THEN I am presented with current and future conditions for that city and that city is added to the search history

WHEN I view current weather conditions for that city  
THEN I see the city name, date, weather icon, temperature, humidity, and wind speed

WHEN I view future weather conditions for that city  
THEN I see a 5-day forecast including date, icon, temperature, wind speed, and humidity

WHEN I click on a city in the search history  
THEN I am again presented with current and future conditions for that city
```

**Quick overview**

- **Project:** Simple weather UI + local test data
- **Main file:** `index.html`
- **Assets:** `assets/` (contains `script.js`, `style.css`, `test-data.json`)

**Project Structure**

- `index.html` : App entry point (static HTML)
- `assets/style.css` : Styles for the UI
- `assets/script.js` : Client-side JavaScript to fetch/display weather
- `assets/test-data.json` : Local sample data used for development

**Development notes**

- The app is static — no backend required for the demo.
- `assets/test-data.json` can be used by the frontend while offline or for testing API behavior.
- If you change `script.js`, reload the page to see updates.

**Author**

- Tremaine McKinley (tremckinley)
