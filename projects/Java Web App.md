## Overview

Developed a custom web server framework in Java, conceptually mirroring the Model-View-Controller (MVC) architecture of Ruby on Rails. Utilizing JServer as the foundation, I built a dynamic, stateful book repository application. The framework intelligently routes incoming HTTP requests to dedicated Java controllers, seamlessly managing SQLite database transactions and rendering dynamic HTML views to the client.

### Tech Stack

- **Languages & Frameworks:** Java, HTML, SQL
- **Infrastructure & Deployment:** JServer, Gradle
- **APIs & Integrations:** SQLite

## Challenge

The primary engineering hurdle was bridging the object-relational impedance mismatch—translating relational database paradigms into object-oriented Java syntax. Furthermore, the system required maintaining a strict separation of concerns while simultaneously orchestrating three distinct languages (Java, SQL, HTML) within a single request cycle.

## The Solution

- **Strict MVC Architecture:** Decoupled the application into isolated layers. Built a custom HTTP routing parser to handle incoming requests, a dynamic HTML rendering engine for the View layer, and a dedicated SQL-driven Model layer.
- **Custom ORM Implementation:** Engineered a data-binding layer that automatically mapped raw SQL database entries into manageable Java objects, cleanly abstracting the database queries away from the core business logic.
- **Hardened Security:** Implemented PreparedStatement objects across all database interactions. This enforced strict input sanitization, neutralizing potential SQL injection vulnerabilities and ensuring the database remained secure against malicious queries.

## Impact

Delivered a stable, interactive book management system that allows users to seamlessly query and update the database via a web browser. By enforcing strict architectural boundaries between the Java logic, SQL queries, and HTML rendering, the project resulted in a highly modular framework capable of securely scaling to support more complex, data-heavy web applications.