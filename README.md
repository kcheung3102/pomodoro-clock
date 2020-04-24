## Pomodoro Task Timer

[Live Project](https://kcheung3102-pomodoroclock.netlify.app)

A react productivity application that lets users break down work and break intervals
![image](https://user-images.githubusercontent.com/44646134/80221168-e6ec4a80-8612-11ea-98e1-f2712a1d1b45.png)


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- NPM
```
npm install npm@latest -g
```

### Installing

1. Clone the repo

```
git clone https://github.com/kcheung3102/pomodoro-clock.git
```

2. Run npm install inside project root directory
```
npm install
```
3. Start the Server
```
npm start
```
4. Enjoy!

## Problems and Thought Process
Before I started to code the project I listed out the necessary components that my program would need to find the solution for. During this challenge, I focused mainly on the front end because the application was alot of UI interactions.

* Needed Logic/Components:
     
     -User Input before timer could be started
     
     -Starting and Stopping the timer
     
     -Timer
     
     -Task Form for user input
     
     -Task list for listing user input
     
     -Mode for switching from session to break after the timer is up
     
     -Alerts the user when timer is up

## Features List
* Start/Stop Timer

* Able to add and delete tasks

* Rings a bell and displays notifications when the session and break time is over

* User can change the session length and break length

## Built With
* [React](https://reactjs.org/)- Front End Library 

* [Material Ui](https://material-ui.com/) - React UI Framework

## Credits
* Sound Effects from [Sound Bible](http://soundbible.com)
* Custom Hook by [Francais](https://overreacted.io/making-setinterval-declarative-with-react-hooks/)
