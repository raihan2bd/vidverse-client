<a name="readme-top"></a>
<h1 align='center'>Vidverse</h1>


# 📗 Table of Contents

- [📗 Table of Contents](#-table-of-contents)
- [ Vidverse ](#-about-project-)
  - [🛠 Built With ](#-built-with-)
    - [Tech Stack ](#tech-stack-)
    - [Key Features ](#key-features-)
  - [💻 Getting Started ](#-getting-started-)
    - [Prerequisites](#prerequisites)
    - [Setup](#setup)
    - [Install](#install)
    - [Database](#database)
    - [Usage](#usage)
    - [Build](#build)
    - [Deployment](#deployment)
  - [👥 Authors ](#-authors-)
  - [🔭 Future Features ](#-future-features-)
  - [🤝 Contributing ](#-contributing-)
  - [⭐️ Show your support ](#️-show-your-support-)
  - [🙏 Acknowledgments ](#-acknowledgments-)
  - [📝 License ](#-license-)


# Vidverse <a name="about-project"></a>
Introducing Vidverse – a dynamic, full-stack web application crafted with Golang (Go), Next.js, TypeScript, PostgreSQL, and a host of other cutting-edge technologies. Vidverse offers users a seamless experience to watch, like, comment, and engage with an eclectic array of content, and users can also authenticate using (credentials and social platforms).

Creators have the power to effortlessly share their latest videos and manage their content, while subscribers revel in curated feeds, saved favorites, and personalized watch histories. User can also see their notifications.

This is the front-end version. If you want to see the front-end part please visit [here](https://github.com/raihan2bd/vidverse)

## 🛠 Built With <a name="built-with"></a>
### Tech Stack <a name="tech-stack"></a>

<details open>
  <summary>Front End</summary>
  <ul>
    <li>Nextjs</li>
    <li>React</li>
    <li>TypeScript</li>
    <li>Html</li>
    <li>CSS</li>
    <li>Tailwind CSS</li>
  </ul>
</details>
<details open>
  <summary>Back End</summary>
  <ul>
    <li>Golang</li>
    <li>PostgreSQL</li>
    <li>Gin</li>
    <li>Gorm</li>
    <li>Web Socket</li>
    <li>Firebase</li>
  </ul>
</details>


## 🚀 Live Demo <a name="live-demo"></a>

- Project Screen Shots

![Vidverse](https://raw.githubusercontent.com/raihan2bd/vidverse-client/dev/screenshots/Screenshot%20from%202024-05-17%2023-38-57.png)

![Vidverse](https://github.com/raihan2bd/vidverse-client/blob/dev/screenshots/Screenshot%20from%202024-05-17%2023-39-11.png)

![Vidverse](https://github.com/raihan2bd/vidverse-client/blob/dev/screenshots/Screenshot%20from%202024-05-17%2023-39-43.png)

![Vidverse](https://github.com/raihan2bd/vidverse-client/blob/dev/screenshots/Screenshot%20from%202024-05-17%2023-30-38.png)

![Vidverse](https://github.com/raihan2bd/vidverse-client/blob/dev/screenshots/Screenshot%20from%202024-05-17%2023-31-35.png)

![Vidverse](https://github.com/raihan2bd/vidverse-client/blob/dev/screenshots/Screenshot%20from%202024-05-17%2023-32-10.png)

![Vidverse](https://github.com/raihan2bd/vidverse-client/blob/dev/screenshots/Screenshot%20from%202024-05-17%2023-36-46.png)

![Vidverse](https://github.com/raihan2bd/vidverse-client/blob/dev/screenshots/Screenshot%20from%202024-05-17%2023-35-37.png)

![Vidverse](https://github.com/raihan2bd/vidverse-client/blob/dev/screenshots/Screenshot%20from%202024-05-17%2023-37-04.png)

![Vidverse](https://github.com/raihan2bd/vidverse-client/blob/dev/screenshots/Screenshot%20from%202024-05-17%2023-38-01.png)


<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Key Features <a name="key-features"></a>

- Users can authenticate using their credentials or through various social platforms, ensuring a flexible and convenient login experience.
- Creators can effortlessly share their latest videos and manage their content with ease, fostering a vibrant community of content producers.
- Subscribers enjoy curated feeds, saved favorites, and personalized watch histories, enhancing their viewing experience.
- Users receive notifications, ensuring they stay updated on the latest activities and interactions within the Vidverse community.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 💻 Getting Started <a name="getting-started"></a> 

To get a local copy up and running, follow these steps.

### Prerequisites

To run this project you need:
- First of all, To run the front end you need to run the [back end](https://github.com/raihan2bd/vidverse) on your local machine.
- Then Make sure you have installed [NodeJs](https://nodejs.org).
- Then make sure you have installed [TypeScript](https://www.typescriptlang.org/)
### Setup

- Then you need to clone the project on your local machine⬇️
``` bash
git clone https://github.com/raihan2bd/vidverse-client
```
- After that you need to rename the `.env.example` file to `.env` then make sure you update the env file credentials to your credentials. For examples ⬇️
```
NEXT_API_URL=Your backend API URL for server side
NEXT_PUBLIC_API_URL=Your backend API URL for client side
NEXTAUTH_SECRET= Your secret key for NextAuth
NEXTAUTH_URL= Your frontend URL
NEXT_PUBLIC_SOCKET_API=Your backend API URL for Socket

# env variables for firebase
NEXT_PUBLIC_FIREBASE_API_KEY= Your firebase API key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN= Your firebase auth domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID= Your firebase project id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET= Your firebase storage bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID= Your firebase messaging sender id
NEXT_PUBLIC_FIREBASE_APP_ID= Your firebase app id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID= Your firebase measurement id
```
### Install

- To install all the npm packages navigate to the folder address on your terminal and enter the below command ⬇️
``` bash
npm install
```

### Usage

To run the development server, execute the following command:

```sh
npm run dev
```

### Deployment

For deployment, you can use [Render](https://vercel.com/)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## 👥 Author <a name="author"></a>

👤 **Abu Raihan**

- GitHub: [@raihan2bd](https://github.com/raihan2bd)
- Twitter: [@raihan2bd](https://twitter.com/raihan2bd)
- LinkedIn: [raihan2bd](https://linkedin.com/in/raihan2bd)


👤 **Nurgul Kereikhan**

- GitHub: [@githubhandle](https://github.com/NurkaAmre)
- Twitter: [@twitterhandle](https://twitter.com/AmreNurgul)
- LinkedIn: [LinkedIn](https://www.linkedin.com/in/amre-nurgul/)

  
<p align="right">(<a href="#readme-top">back to top</a>)</p>


## 🔭 Future Features <a name="future-features"></a>

- [ ] **Implement improvements to provide users with an even smoother and more enjoyable experience.**
- [ ] **Transition the application to a microservices architecture for improved scalability and maintainability.**
- [ ] **Add a new feature called `Shorts` to the platform, enabling users to create and share short-form video content.**
- [ ] **Incorporate FFmpeg to enhance video streaming capabilities similar to YouTube, and leverage AWS for hosting these files to ensure seamless playback and scalability.**

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## 🤝 Contributing <a name="contributing"></a>

Contributions, issues, and feature requests are welcome!

Feel free to check the [issues page](https://github.com/raihan2bd/vidverse-client/issues).

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## ⭐️ Show your support <a name="support"></a>

If you like this project, please leave a ⭐️

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## 🙏 Acknowledgments <a name="acknowledgements"></a>

We extend our heartfelt gratitude to [Microverse](https://microverse.org) and [Trevor Sawler](https://www.gocode.ca/) for their invaluable assistance in mastering the tech stack utilized in this project. Additionally, we express our sincere appreciation to [Cloudinary](https://cloudinary.com/) for generously providing us with free cloud space.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


## 📝 License <a name="license"></a>

This project is [MIT](./LICENSE) licensed.

<p align="right">(<a href="#readme-top">back to top</a>)</p>


