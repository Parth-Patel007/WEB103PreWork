# WEB103 Prework - ✨ Creatorverse

Submitted by: Parth Patel

About this web app: **✨ Creatorverse is a content creator directory application that allows users to discover, view, add, edit, and delete content creators. Built with React and Supabase, it provides a modern interface for managing a collection of content creators with their channel information, descriptions, and images.**

Time spent:  5  hours

## Required Features

The following **required** functionality is completed:

- [x] **A logical component structure in React is used to create the frontend of the app**
- [x] **At least five content creators are displayed on the homepage of the app**
- [x] **Each content creator item includes their name, a link to their channel/page, and a short description of their content**
- [x] **API calls use the async/await design pattern via Axios or fetch()**
- [x] **Clicking on a content creator item takes the user to their details page, which includes their name, url, and description**
- [x] **Each content creator has their own unique URL**
- [x] **The user can edit a content creator to change their name, url, or description**
- [x] **The user can delete a content creator**
- [x] **The user can add a new content creator by entering a name, url, or description and then it is displayed on the homepage**

The following **optional** features are implemented:

- [ ] Picocss is used to style HTML elements
- [x] **The content creator items are displayed in a creative format, like cards instead of a list**
- [x] **An image of each content creator is shown on their content creator card**

The following **additional** features are implemented:

* [x] **React Router implementation for client-side routing with unique URLs for each page**
* [x] **Environment variable configuration for secure API key management**
* [x] **Modern UI with dark theme and smooth animations**

## Video Walkthrough

Here's a walkthrough of implemented required features:

<img src='Demo.mp4' title='Video Walkthrough' width='' alt='Video Walkthrough' />


## Project Structure

```
src/
├── components/
│   └── Card.jsx          # Content creator card component
├── pages/
│   ├── ShowCreators.jsx  # Home page - displays all creators
│   ├── ViewCreator.jsx   # Single creator detail page
│   ├── EditCreator.jsx  # Edit creator form
│   └── AddCreator.jsx   # Add new creator form
├── client.js             # Supabase client configuration
├── App.jsx               # Main app component with routing
├── App.css               # Application styles
└── main.jsx              # Application entry point
```

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Technologies Used

- **React** - Frontend framework
- **React Router** - Client-side routing
- **Supabase** - Backend database and API
- **Vite** - Build tool and development server

## Notes

**Challenges Encountered:**
- Setting up React Router with proper route configuration
- Implementing proper error handling for all Supabase operations
- Ensuring environment variables are properly configured for security
- Creating a responsive design that works across different screen sizes

**Additional Context:**
- The app uses Supabase for all database operations (CRUD)
- Environment variables are used to securely store API credentials
- The app includes comprehensive error handling and user feedback
- All forms include validation to ensure data integrity

## License

Copyright [2025] [Parth Patel]

Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at

> http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
