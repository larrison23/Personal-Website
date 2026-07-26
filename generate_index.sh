#!/bin/bash

# Define the folder where your blog markdown files live
BLOG_DIR="content/blog"
# Define the output JSON file
OUTPUT_FILE="assets/js/blog_index.txt"

echo "[" > $OUTPUT_FILE
first=true

# Loop through all markdown files and add them to the JSON array
for file in "$BLOG_DIR"/*.md; do
    if [ -f "$file" ]; then
        filename=$(basename "$file")
        # Remove the .md extension to use as a clean title
        title="${filename%.md}" 

        if [ "$first" = true ]; then
            first=false
        else
            echo "," >> $OUTPUT_FILE
        fi
        
        echo "  {\"title\": \"$title\", \"file\": \"$filename\"}" >> $OUTPUT_FILE
    fi
done

echo "]" >> $OUTPUT_FILE

chmod 644 $OUTPUT_FILE

echo "Blog index generated at $OUTPUT_FILE"