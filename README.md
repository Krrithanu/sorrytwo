# Just a Little Letter ♡

A guided, no-scroll apology website using plain HTML, CSS, and JavaScript. The six pages advance with a single button. The artwork files in `images/` are cropped from the visual references you provided.

## Preview locally
Open `index.html` in your browser. For the smoothest local preview, run a small static server (for example, VS Code Live Server).

## Deploy to GitHub + Vercel
Upload `index.html`, `style.css`, `script.js`, and the `images/` folder to the repository root. Import the repository in Vercel and select **Other** as the framework preset. No build command is needed; use `.` as the output directory if prompted.

To change the text, edit the `pages` array in `script.js`. The full letter is in `index.html`.

## Add the ending media
After the letter, the ending plays `our-video.mp4` from the project root. When playback ends, a four-photo slideshow begins. Add your photos to `images/` as `pic1.jpg`, `pic2.jpg`, `pic3.jpg`, and `pic4.jpg`. The slideshow also has previous/next controls and can be skipped if the video is unavailable.
