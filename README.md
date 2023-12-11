<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Thanks again! Now go create something AMAZING! :D
***
***
***
*** To avoid retyping too much info. Do a search and replace for the following:
*** martinivnv, AuxClash, email, project_title, project_description
-->



<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->



<!-- PROJECT LOGO -->
<br />
<p align="center">
  <a href="https://github.com/martinivnv/AuxClash">
    <img width="200" alt="logo" src="https://github.com/martinivnv/AuxClash/assets/43828876/35af3e1a-2bf5-4677-aac6-bbe9eab52a11">
  </a>


  <h3 align="center">AuxClash - Social Spotify Playlist Creator</h3>

  <p align="center">
    Aux Clash is a social music experience designed for music enthusiasts who want a fun and interactive way to create playlists with their friends.
    <br />
    <a href="https://github.com/martinivnv/AuxClash"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://auxclash.netlify.app/">View Demo</a>
    ·
    <a href="https://github.com/martinivnv/AuxClash/issues">Report Bug</a>
    ·
    <a href="https://github.com/martinivnv/AuxClash/issues">Request Feature</a>
  </p>
</p>

:warning: **AuxClash is currently awaiting approval from the team at Spotify!** :warning:

Since AuxClash is built using Spotify's API, users must be manually added to connect their Spotify account to try out AuxClash. Shoot me a message to get your account manually added to test out the app!

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Table of Contents</h2></summary>
  <ol>
    <li>
      <a href="#demo-images">Demo Images</a>
    </li>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

## Demo Images
<p align="center">
<img width="375" alt="Aux-Clash 11" src="https://github.com/martinivnv/AuxClash/assets/43828876/ac75c5df-9f87-4e4b-a19f-33a6f815508a">
  <p align="center">
      Figure 1: Home screen on mobile
    </p>
</p>
<p align="center">
<img width="953" alt="Aux-Clash 11" src="https://github.com/martinivnv/AuxClash/assets/43828876/e6e9abf0-df86-4f43-bcc9-c5e75e5817eb">
 <p align="center">
      Figure 2: Home screen on desktop
    </p>
</p>
<p align="center">
<img width="953" alt="Aux-Clash 11" src="https://github.com/martinivnv/AuxClash/assets/43828876/d7a7c2a1-e5ad-4244-8bc1-2bbb5d70c0f3">
 <p align="center">
      Figure 3: Lobby screen
    </p>
</p>
<p align="center">
<img width="953" alt="Aux-Clash 11" src="https://github.com/martinivnv/AuxClash/assets/43828876/2d3b101f-48bb-4826-a6f7-e48b64e405cd">
 <p align="center">
      Figure 4: Prompt screen
    </p>
</p>
<p align="center">
<img width="953" alt="Aux-Clash 11" src="https://github.com/martinivnv/AuxClash/assets/43828876/85ae3507-24a5-4836-9d58-e0d0222bd375">
 <p align="center">
      Figure 5: Listen to submissions screen
    </p>
</p>
<p align="center">
<img width="375" alt="Aux-Clash 11" src="https://github.com/martinivnv/AuxClash/assets/43828876/054e628c-e20c-4962-965a-75256cfe1d4a">
 <p align="center">
      Figure 6: Vote screen on mobile
    </p>
</p>
<p align="center">
<img width="953" alt="Aux-Clash 11" src="https://github.com/martinivnv/AuxClash/assets/43828876/cffb2ef5-f736-4769-9419-99e288466487">
 <p align="center">
      Figure 7: Scoreboard screen
    </p>
</p>
<p align="center">
<img width="953" alt="Aux-Clash 11" src="https://github.com/martinivnv/AuxClash/assets/43828876/54eb02df-26c2-4153-9151-dec8f468cbbf">
 <p align="center">
      Figure 8: End screen
    </p>
</p>
<p align="center">
<img width="953" alt="Aux-Clash 11" src="https://github.com/martinivnv/AuxClash/assets/43828876/5cc2eb9c-fbda-4330-a0a4-9b38907dbe90">
 <p align="center">
      Figure 9: Newly created playlist based on submissions
    </p>
</p>

<!-- ABOUT THE PROJECT -->
## About The Project

Aux Clash is designed for music enthusiasts who want a fun and interactive way to create playlists with their friends. It's not a game but a social music experience. We've made it easy for users to aux battle by responding to prompts, submitting songs within a time limit, and voting on the best picks. The end result is a collaborative playlist, and a user is crowned the Aux Monarch.

To integrate with Spotify, the host signs in to their Spotify account to initiate a lobby, where participants can join using a unique code. We leverage Spotify's capabilities to play submitted songs, and the compiled playlist can be saved to the host's Spotify account. It's worth noting that Spotify Premium is required to play songs in their entirety, but the trial version works for shorter snippets.

### Built With

* JavaScript
* Express.js (with web sockets)
* React.js
* Node.js
* TailwindCSS

<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/martinivnv/AuxClash.git
   ```
2. Install NPM packages for clientside
   ```sh
   cd client
   npm install
   ```
3. Run clientside
   ```sh
   cd client
   npm start
   ```
4. Install NPM packages for serverside
   ```sh
   cd server
   npm install
   ```
5. Run serverside
   ```sh
   cd server
   npm run dev
   ```

<!-- USAGE EXAMPLES -->
## Usage

Try it out: [https://auxclash.netlify.app/](https://auxclash.netlify.app/)

<!-- ROADMAP -->
## Roadmap

See the [open issues](https://github.com/martinivnv/AuxClash/issues) for a list of proposed features (and known issues).



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE` for more information.



<!-- CONTACT -->
## Contact

Martin Ivanov - martinivnv2002@gmail.com

Project Link: [https://github.com/martinivnv/AuxClash](https://github.com/martinivnv/AuxClash)

Live Link: [https://auxclash.netlify.app/](https://auxclash.netlify.app/)
