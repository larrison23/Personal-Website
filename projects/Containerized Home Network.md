## Overview

Inspired by David Rose’s _Enchanted Objects_, I have been slowly transforming standard household items into a locally contained, interconnected smart environment. By maintaining control over the devices, I can have dynamic, automated control over room conditions, waking routines, and environmental monitoring.

### Tech Stack

- **Languages & Frameworks:** Python, Flask, HTML/CSS, JavaScript
- **Infrastructure & Deployment:** Raspberry Pi, Docker, Portainer, GitHub (CI/CD)
- **APIs & Integrations:** Homebridge REST APIs, Apple HomeKit

## Challenge

My first attempts to build a smart home using an Apple HomePod were curtailed by vendor lock-in, which restricted the types of devices that could be integrated. Further, adjusting my schedules (such as the early alarms for rowing) required manually editing the configuration settings within the backend application, making it difficult to change quickly and leading to some missed and way too early alarms.

## The Solution

- **System Architecture:** Deployed a local Homebridge server on a Raspberry Pi to act as a bridge between the HomePod and restricted, third-party devices (IR remotes, AC units, sound machines, soil monitors).
- **Custom Interface Development:** Built a lightweight Flask web application that interfaces directly with Homebridge REST APIs, providing a front-end dashboard to easily update and manage my settings dynamically.
- **Containerized Deployment:** Containerized the Flask application using Docker and managed it via Portainer on the Raspberry Pi.
- **Version Control:** Linked the deployment to a GitHub repository, enabling automated updates on the Raspberry Pi whenever new code is pushed to the main branch.

## Impact

Created an expandable, frictionless local network that can autonomously regulate room temperature, initiate gradual light-based wake-up routines, and minimize the daily operational overhead of managing those smart devices.