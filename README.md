# Request-tracker
A simple web app for submitting and managing requests (bugs, feature ideas, feedback, partnership inquiries, etc). Built for the PhotoMed software engineering attachment assessment.

## What it does.
- Submit a request with mane, email, type, priority, and a message for description purposes.
- See all submitted requests in a ist, newest first
- Change a request's status (New, in review, resolved, rejected) from a dropdown on each card
- Filter the list by request type or status, and search by name/email
- Data is served in the browser's 'LocalStorage' so requests survive a page refresh

## Tech stack used

Plain HTML, CSS, and JavaScript. No frameworks, no build step, no external dependencies. I the vanilla approach since its the one i could explain end to end and work with for the short time with less struggle.

## Running
it is locally run hence no installation needed.
1. Clone the repository
2. Open 'index.html' directly in a browser, **or** run a tiny local server (recommended, avoids some browser quirks with local files)
3. Visit the printed local URL.

## What I completed
- Form with all required fields (name, email, type, priority, message)
- Requests appear in a list immediately after submission
- Status can be changed per request
- At least one working filter (type, status and search by name/email)
- Data persists across refresh via Localstorage

# Limitations/ what i did not complete
- No backend or database, everything lives in one browser's LocalStorage, so requests don't sync across devices or browsers.
- no authentication, anyone with the page can see and edit all requests.
- No edit/delete on individual requests yet.

## Challanges i ran into
Figuring out event delegation for the dynamically created status dropdowns and deciding how to structure the filter logic.
combining the search, type and status without ending up in a tangle of nested if/else statements.

## What I'd improve with more time.
- Move storage to a small backend so data isn't tied to one browser
- Add edit/delete actions on requests
- Add simple form validation messages instead of relying on browser defaults
- Add basic tests for the filter logic

## AI tool use
I used claude to help me debug the code to the placed where i had difficulty in. I also used it to get how to store the data locally.

