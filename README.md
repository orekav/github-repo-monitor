# github-repo-monitor
[![Build Status](https://travis-ci.com/orekav/github-repo-monitor.svg?token=Rpm1faeZQwHDpCnAf8Xt&branch=main)](https://travis-ci.com/orekav/github-repo-monitor)
[![Coverage Status](https://coveralls.io/repos/github/orekav/github-repo-monitor/badge.svg?t=GTmcbZ)](https://coveralls.io/github/orekav/github-repo-monitor)

## Prerequisites:
* Docker
* Docker-Compose

## Run tests
> docker-compose -f docker-compose.yml -f docker-compose.test.yml up --build

## Start application
> docker-compose -f docker-compose.yml -f docker-compose.production.yml up --build

The API will start on port 8080
### Endpoints
* /organization/:organizationName
* /repositories/:organizationName
* /repositories/:organizationName/:repositoryName

### Frontend
> http://localhost

You can add a GitHub username and password to be able to do more request
In docker-compose.production.yml add:
* GITHUB_USERNAME=your_username
* GITHUB_PASSWORD=your_password