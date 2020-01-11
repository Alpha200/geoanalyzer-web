# Geoanalyzer-Web

Simple analyzation tool for [Traccar](https://www.traccar.org/)

# Features

* Simple analyzation of recorded location data
* Clusters a day into stays and trips

# Installation

You are supposed to deploy this frontend together with the backend via docker on a single subdomain.
This repository contains a example [docker compose configuration](docker-compose.yml) which is meant to be used
in combination with [Traefik 2](https://containo.us/traefik/).

You are supposed to mount your backend configuration (`config.yaml`) into the backend container. E.g.:

```yaml
---
traccar:
  base_uri: https://traccar.example.com
```

# Usage

Log into your account with your traccar credentials and select the day which you want to analyze.
