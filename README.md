[![Build Status](https://travis-ci.org/danielotieno/way-farer-api.svg?branch=develop)](https://travis-ci.org/danielotieno/way-farer-api)
[![Maintainability](https://api.codeclimate.com/v1/badges/89c988eb1fc6305e7577/maintainability)](https://codeclimate.com/github/danielotieno/way-farer-api/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/89c988eb1fc6305e7577/test_coverage)](https://codeclimate.com/github/danielotieno/way-farer-api/test_coverage)


# Welcome to WayFare Booking Service API

WayFarer is a public bus transportation booking service.

An API that will provide a fucntionality for WayFarer Admins to be able to
create and manage trips.

App is available at [wayfarer](https://wayfarer-api-app.herokuapp.com/docs/)

## Application features

Appart from normal authentication the app will provide the following
functionality

- Creating Trips
- Booking a Trip

An Admin user can perform the following:

- Create a trip.
- Cancel a trip.
- See all trips.
- See a specific trip.
- See all bookings.

A normal user can perform the following:

- See all trips.
- See a specific trip.
- Book a seat on a trip.
- See his/her bookings.
- Delete a booking

The following endpoints should be available to use once the API is complete:

| EndPoint                            | Functionality         |
| ----------------------------------- | --------------------- |
| POST /api/v2/auth/signup            | Create user account   |
| POST /api/v2/auth/signin            | Login a user          |
|                                     |                       |
| POST /api/v2/trips                  | Create a trip.        |
| GET /api/v2/trips/<:trip-id>        | Get a specific trip.  |
| GET /api/v2/trips                   | Get all trips         |
| PATCH /trips/<:trip-id>/cancel      | Cancel a trip         |
|                                     |                       |
| POST /api/v2/bookings               | Book a seat on a trip |
| GET /api/v2/bookings                | View all bookings.    |
| DEL /api/v2//bookings/<:booking-id> | Delete a booking.     |
|                                     |                       |

### Technologies used to build the application

[Expressjs](https://expressjs.com/) Framework

[Jestjs](https://jestjs.io/) Testing Framework

#### Getting started with the application

[download](https://nodejs.org/en/download/) and install nodejs.

[install](https://yarnpkg.com/en/docs/install) Yarn version for your operating system.

Clone the repo [here](https://github.com/danielotieno/way-farer-api) to your local machine

Create a `.env` file. Copy the contents of `.env.sample` file and paste them in your `.env` file.

Install dependencies

`yarn install`

Then run the command below to run test

`yarn run test`

Then run the command below to start the application in development mode

`yarn start:dev`

### Switch to the master branch for stable/working features

`git checkout master`

The application is under constant development. The `develop` branch has the latest changes added into the app
