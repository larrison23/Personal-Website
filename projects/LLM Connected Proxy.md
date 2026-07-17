## Overview

Co-developed a custom HTTPS proxy that leverages a Large Language Model to edit web page content on the fly, creating a personalized browsing experience. The initial implementation focused on an automated spoiler-blurring tool for sports scores, but the architecture supports modular feature expansion.

### Tech Stack

- **Languages & Frameworks:** C, Flask, LLM, Beautiful Soup
- **Infrastructure & Deployment:** GitHub (CI/CD)
- **APIs & Integrations:** LLMProxy API (created by Tufts PhD students)

## Challenge

Intercepting and modifying HTTPS traffic requires a secure Man-in-the-Middle (MITM) architecture. Managing Transport Layer Security (TLS/SSL) certificates dynamically between the browser and the end server proved highly complex. Additionally, executing HTML parsing and LLM interactions directly in C was inefficient due to a lack of robust native text-processing libraries.

## The Solution

- **Dual-Connection Architecture:** Engineered the C proxy to independently mediate two secure connections: acting as the server to the user's browser, and as the client to the destination web server. The proxy dynamically generated and signed certificates to maintain secure handshakes on both ends.
- **Microservice Offloading:** To bypass C's parsing limitations, we offloaded the text extraction to a secondary Flask microservice.
- **Intelligent DOM Manipulation:** The Flask server utilized BeautifulSoup to strip text elements, passed them to the LLMProxy with specific blurring prompts, and injected the censored content back into the HTML stream before returning it to the proxy.

## Impact

Successfully intercepted and modified static and semi-static web pages (e.g., Wikipedia, text-heavy blogs). During testing, we encountered concurrency bottlenecks when handling heavily dynamic sites generating dozens of asynchronous requests (videos, complex DOMs). To resolve this for future iterations, we architected a concurrent model utilizing process forking, designing a system to route all asynchronous connections tied to a single session ID through a unified, dedicated proxy instance.
