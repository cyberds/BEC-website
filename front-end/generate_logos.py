from PIL import Image, ImageDraw, ImageFont
import os

def create_logo(text, filename, bg_color=(0, 0, 0, 0), text_color=(255, 255, 255), size=(200, 60)):
    img = Image.new('RGBA', size, bg_color)
    d = ImageDraw.Draw(img)
    
    # Try to use a default font, otherwise load a specific one if possible (skipping for simplicity)
    # Using default font might be too small, so let's try to find a system font or just draw big text
    try:
        font = ImageFont.truetype("arial.ttf", 36)
    except IOError:
        font = ImageFont.load_default()

    # Calculate text position to center it
    try:
        left, top, right, bottom = d.textbbox((0, 0), text, font=font)
        text_width = right - left
        text_height = bottom - top
    except AttributeError:
        # Fallback for older Pillow versions
        text_width, text_height = d.textsize(text, font=font)
        
    position = ((size[0] - text_width) / 2, (size[1] - text_height) / 2)
    
    d.text(position, text, fill=text_color, font=font)
    img.save(filename)
    print(f"Created {filename}")

output_dir = r"c:\Users\CyberOps\Desktop\BEC-website\front-end\public\logos"
if not os.path.exists(output_dir):
    os.makedirs(output_dir)

# Emmviron (Green)
create_logo("Emmviron", os.path.join(output_dir, "emmviron.png"), text_color=(16, 185, 129)) # Green-500

# Aiden (Blue)
create_logo("Aiden", os.path.join(output_dir, "aiden.png"), text_color=(59, 130, 246)) # Blue-500

# JoyceSuperKitchen (Yellow/Red)
create_logo("Joyce", os.path.join(output_dir, "joyce.png"), text_color=(245, 158, 11)) # Amber-500

print("All logos generated.")
