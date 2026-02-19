from PIL import Image, ImageDraw, ImageFont
import os

def create_logo(text, filename, bg_color=(0, 0, 0, 0), text_color=(255, 255, 255), size=(300, 100), font_size=40):
    if os.path.exists(filename):
        print(f"Skipping {filename} (already exists)")
        return
        
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

# Fallback generation for possibly failed downloads
# Chicken Republic (Red)
create_logo("Chicken Republic", os.path.join(output_dir, "chicken_republic.png"), text_color=(220, 38, 38))

# Kilimanjaro (Green)
create_logo("Kilimanjaro", os.path.join(output_dir, "kilimanjaro.png"), text_color=(22, 163, 74))

# Cold Stone (Red)
create_logo("Cold Stone", os.path.join(output_dir, "coldstone.png"), text_color=(239, 68, 68))

# Tantalizers (Yellow)
create_logo("Tantalizers", os.path.join(output_dir, "tantalizers.png"), text_color=(234, 179, 8))

print("Fallback checks complete.")
