# URL Shortener – Frontend Test Submission

This project is the frontend implementation for the Afford Medical Technologies URL Shortener assessment.

## 🛠 Tech Stack

- **React.js** (via Create React App)
- **Material UI** for styling and components
- **JavaScript (ES6+)**
- **Custom logger utility**

## 🚀 How to Run the Project

1. **Clone this repository**:
   git clone https://github.com/your-username/frontend-test-submission.git
   cd frontend-test-submission

2. Install dependencies:
   npm install

3. Set up environment variable:
   Create a .env file in the root folder and add:
   REACT_APP_ACCESS_TOKEN=my access token

Start the development server:


📄 Features
Input up to 5 URLs at once

Supports:

Custom shortcodes

Optional validity (in minutes, defaults to 30)

Displays:

Shortened URL

Expiry time

Original URL

Validates that the long URL starts with http:// or https://

Logs key actions using a custom logger

🔗 API Endpoint Used
This app makes a POST request to:


http://20.244.56.144/url
with the payload format:
{
  "url": "https://example.com",
  "validity": 30,
  "shortcode": "custom-code"
}