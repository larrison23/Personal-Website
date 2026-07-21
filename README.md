# Harrison Sweet - Personal Website

This repository contains the source code for my personal website and project portfolio. 

[Website](https://www.eecs.tufts.edu/~rsweet02)

## Tech Stack
* **Frontend:** HTML5, Custom CSS
* **Parsing:** marked.js, markdown_parse.js
* **Hosting:** Tufts EECS Linux Servers

## Local Development

To run the website locally for testing and development, start a Python HTTP server in the root directory:

```bash
python -m http.server 8000
```

Once the server is running, navigate to http://localhost:8000 in your web browser.

## Deployment

```bash
rsync -avz --exclude '.git/' --exclude '.DS_Store' ./ username@linux.eecs.tufts.edu:~/public_html/ 
```


## File Permissions

Files: Should be readable by everyone but only writable by the owner
```bash
chmod 644 <filename>
```

Directories: Should be executable and readable by everyone.
```bash
chmod 755 <directoryname>
```

## Contact
* **LinkedIn:** [Harrison Sweet](https://www.linkedin.com/in/harrison-sweet-53102a1b5/)
* **Email:** harrison.sweet@hey.com
* **Resume:** [larrison23](/documents/SweetHarrisonCV.pdf)