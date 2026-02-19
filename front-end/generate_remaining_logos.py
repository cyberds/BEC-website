from PIL import Image, ImageDraw, ImageFont
import os

def create_logo(text, filename, bg_color=(0, 0, 0, 0), text_color=(255, 255, 255), size=(300, 100), font_size=40):
    img = Image.new('RGBA', size, bg_color)
    d = ImageDraw.Draw(img)
    
    try:
        font = ImageFont.truetype("arial.ttf", font_size)
    except IOError:
        font = ImageFont.load_default()

    try:
        left, top, right, bottom = d.textbbox((0, 0), text, font=font)
        text_width = right - left
        text_height = bottom - top
    except AttributeError:
        text_width, text_height = d.textsize(text, font=font)
        
    position = ((size[0] - text_width) / 2, (size[1] - text_height) / 2)
    
    d.text(position, text, fill=text_color, font=font)
    img.save(filename)
    print(f"Created {filename}")

output_dir = r"c:\Users\CyberOps\Desktop\BEC-website\front-end\public\logos"
if not os.path.exists(output_dir):
    os.makedirs(output_dir)

# Mega Chicken (Red)
create_logo("Mega Chicken", os.path.join(output_dir, "megachicken.png"), text_color=(239, 68, 68)) 

# The Place (Orange)
create_logo("The Place", os.path.join(output_dir, "theplace.png"), text_color=(249, 115, 22))

# Sweet Sensation (Pink)
create_logo("Sweet Sensation", os.path.join(output_dir, "sweet_sensation.png"), text_color=(236, 72, 153))

# Tastee Fried Chicken (Red)
create_logo("Tastee Fried\nChicken", os.path.join(output_dir, "tastee.png"), text_color=(248, 113, 113))

# Yakoyo (Orange)
create_logo("Yakoyo", os.path.join(output_dir, "yakoyo.png"), text_color=(251, 146, 60))

# Debonairs (Green)
create_logo("Debonairs", os.path.join(output_dir, "debonairs.png"), text_color=(34, 197, 94))

print("Fallback logos generated.")
