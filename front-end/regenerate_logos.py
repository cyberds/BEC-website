from PIL import Image, ImageDraw, ImageFont
import os

def create_logo_with_padding(text, filename, bg_color=(255, 255, 255, 0), text_color=(0, 0, 0), size=(300, 100), font_size=40):
    # Create image with transparent background
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

# Force regenerate Kilimanjaro (Red/Green text)
# Kilimanjaro is often red text.
create_logo_with_padding("Kilimanjaro", os.path.join(output_dir, "kilimanjaro.png"), text_color=(220, 38, 38))

# Tantalizers (Yellow/Red)
create_logo_with_padding("Tantalizers", os.path.join(output_dir, "tantalizers.png"), text_color=(234, 179, 8))

# Chicken Republic (Red)
create_logo_with_padding("Chicken\nRepublic", os.path.join(output_dir, "chicken_republic.png"), text_color=(220, 38, 38))

# Sweet Sensation
create_logo_with_padding("Sweet\nSensation", os.path.join(output_dir, "sweet_sensation.png"), text_color=(236, 72, 153))

print("Logos regenerated.")
