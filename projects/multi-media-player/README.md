# Multimedia Player (Audio & Video)

## Overview
This project is my first HTML multimedia player. It demonstrates the use of the `<audio>` and `<video>` elements along with their supporting attributes and child elements. The goal of this project is to understand how to properly structure media content, provide accessibility support, and include fallback content for unsupported browsers.

This project was completed as part of the freeCodeCamp Responsive Web Design curriculum and is intended to be kept as a reference for future projects.

## Features

### Audio Player
- HTML `<audio>` element with playback controls
- `<source>` element with a valid audio MIME type
- `aria-label` for accessibility
- Fallback text for browsers that do not support audio

### Video Player
- HTML `<video>` element with playback controls
- Fixed width using the `width` attribute
- `<source>` element with a valid video MIME type
- Subtitle support using the `<track>` element
- Accessible labeling with `aria-label`
- Fallback text with a direct download link

### Transcript Section
- Separate semantic `<section>` element
- `<h2>` heading labeled **Transcript**
- `<p>` element containing a short transcript or summary of the video content

## HTML Patterns Used

### Audio Element Example
'''html
<audio controls aria-label="Song Title audio player">
  <source src="AUDIO_URL" type="audio/mpeg">
  <p>Your browser does not support the audio element.</p>
</audio>

### Video Element Examples
'''html
<video controls width="640" aria-label="Song Title video player">
  <source src="VIDEO_URL" type="video/mp4">

  <track
    src="SUBTITLES_URL.vtt"
    kind="subtitles"
    srclang="en"
    label="English"
  >

  <p>
    Your browser does not support this video element.
    <a href="VIDEO_URL">Download the video file</a>.
  </p>
</video>
