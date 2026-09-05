import re
import urllib.request
import ssl
ssl._create_default_https_context = ssl._create_unverified_context
import os
import json

html_file = '/Users/kiendoan/.gemini/antigravity/brain/b7511672-f338-4fc9-bd68-d9f26f31cfd1/.system_generated/steps/49/content.md'
output_dir = 'public/sites/eql/root/images'
os.makedirs(output_dir, exist_ok=True)

with open(html_file, 'r') as f:
    html = f.read()

# Find all image sources
# regex to match src="..." and srcset="..."
img_urls = set()
for match in re.findall(r'src="([^"]+)"', html):
    img_urls.add(match)

for match in re.findall(r'srcset="([^"]+)"', html, re.IGNORECASE):
    # srcset can have multiple urls separated by commas
    parts = match.split(',')
    for part in parts:
        url = part.strip().split(' ')[0]
        if url:
            img_urls.add(url)
            
# Also background-images if any (though we might not find them this way)

base_url = 'https://eql-apparel.com'

downloaded = []

for url in img_urls:
    if url.startswith('data:'): continue
    
    full_url = url
    if url.startswith('/'):
        full_url = base_url + url
    elif not url.startswith('http'):
        continue
        
    filename = url.split('/')[-1].split('?')[0]
    if not filename: filename = 'image.jpg'
    
    # Save path
    filepath = os.path.join(output_dir, filename)
    
    try:
        req = urllib.request.Request(full_url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response, open(filepath, 'wb') as out_file:
            out_file.write(response.read())
        downloaded.append(filename)
        print(f"Downloaded: {filename}")
    except Exception as e:
        print(f"Failed to download {full_url}: {e}")

print(f"Total downloaded: {len(downloaded)}")
