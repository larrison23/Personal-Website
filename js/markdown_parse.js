    import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';
        
    mermaid.initialize({
        startOnLoad: false,
        theme: 'dark',

        themeVariables: {
            fontFamily: 'IBM Plex Mono, system-ui, sans-serif',
            fontSize: '16px',
            primaryColor: '#333333',
            primaryTextColor: '#ffffff'
        },

        flowchart: {
            nodeSpacing: 60,
            rankSpacing: 60,
            padding: 15
        }
    });
    
    const projectContainers = document.querySelectorAll('.project-content');

    projectContainers.forEach(container => {
        const markdownFile = container.getAttribute('data-file');

        fetch(markdownFile)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Could not load ${mardownFile}. Check the path.`);
                } 
                return response.text();
            })
            .then(async text => {
                container.innerHTML = marked.parse(text);
                hljs.highlightAll();

                const mermaidBlocks = container.querySelectorAll('.language-mermaid');

                if (mermaidBlocks.length > 0) {
                    await mermaid.run({
                        nodes:Array.from(mermaidBlocks)
                    });
                }
            })
            .catch(error => {
                container.innerHTML = `<p>Error loading project data.</p>`;
                console.error('Fetch error for', markdownFile, ':', error);
            });
    });