## Overview

Co-developed a custom HTTPS proxy that intercepts web traffic and uses a Large Language Model to edit web page content on the fly. Built using C, Flask, and Beautiful Soup, the initial implementation focused on an automated spoiler-blurring tool for sports scores. However, the underlying architecture is strictly modular, allowing new content-filtering plugins to be easily dropped in.

### Tech Stack

- **Languages & Frameworks:** C, Flask, LLM, Beautiful Soup
- **Infrastructure & Deployment:** GitHub (CI/CD)
- **APIs & Integrations:** LLMProxy API (created by Tufts PhD students)

```mermaid
flowchart TD
	Browser["Browser"] <-->|"HTTPS"| Proxy["Main Proxy Server (C)"]
	
	Proxy <-->|"HTTPS"| Server["Web Server"]
	
	Proxy <-->|"Local HTTP"| FlaskApp["Flask Server (Python)"]
	FlaskApp <-->|"Internal API"| LLMProxy["LLM Proxy"]
	LLMProxy <--> |"HTTPS"|Modify("External LLMs (OpenAI, Anthropic, etc.)")
```

## Challenge

Building the proxy required a secure Man-in-the-Middle (MITM) architecture that could dynamically manage TLS certificates on the fly. We initially looked at doing everything in C, but quickly realized that native C lacks the robust libraries needed for heavy HTML parsing and LLM API routing. By decoupling the system, we let C handle the high-speed network routing while Python handles the complex text manipulation. Using this architecture we were able to intercept and modify static and semi-static web pages (e.g., Wikipedia, text-heavy blogs). During testing, however, we encountered concurrency bottlenecks when handling heavily dynamic sites generating dozens of asynchronous requests (videos, complex DOMs). To resolve this for future iterations, we discuessed a concurrent model utilizing process forking, designing a system to route all asynchronous connections tied to a single session ID through a unified, dedicated proxy instance.

### The Solution

- **Dual-Connection Architecture:** Engineered the C proxy to independently mediate two secure connections: acting as the server to the user's browser, and as the client to the destination web server. The proxy dynamically generated and signed certificates to maintain secure handshakes on both ends.
- **Microservice Offloading:** To bypass C's parsing limitations, we offloaded the text extraction to a secondary Flask microservice.
- **Intelligent DOM Manipulation:** The Flask server utilized BeautifulSoup to strip text elements, passed them to the LLMProxy with specific blurring prompts, and injected the censored content back into the HTML stream before returning it to the proxy.

### Main Proxy

**Python Webpage Parsing:**

```python
@app.route("/", methods=["POST"])
def process_packet():
    """
    Intercepts HTTP packets, identifies spoiler candidates via Regex fast-pass, 
    and verifies context via LLM abstraction layer before mutating the DOM.
    """
    headers, html_body = parse_raw_http(request.data)
    soup = BeautifulSoup(html_body, 'html.parser')

    # 1. Fast-Pass: Regex pre-filtering to avoid high-latency LLM calls
    keyword_re = compile_search_patterns(KEYWORDS)
    candidates = extract_suspicious_nodes(soup, keyword_re)

    if candidates:
        # 2. Verification: Batch query the LLM Proxy to confirm context
        candidate_texts = [item['clean_text'] for item in candidates]
        spoiler_flags = ask_llm(candidates=candidate_texts, query=KEYWORDS)

        # 3. DOM Mutation: Apply CSS blurring to verified spoiler nodes
        for node_data, is_spoiler in zip(candidates, spoiler_flags):
            if is_spoiler:
                target_node = node_data['node']
                target_node["class"] = target_node.get("class", []) + ["spoiler-blur"]

        inject_client_assets(soup) # Appends UI controls & CSS

    return reconstruct_http(headers, str(soup))
```

