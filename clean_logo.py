from PIL import Image
import numpy as np

# Load the image
img = Image.open('src/assets/logo.png')
img_array = np.array(img)

# Convert to RGBA if not already
if img.mode != 'RGBA':
    img = img.convert('RGBA')
    img_array = np.array(img)

# Make light gray/white background transparent
# Define the background color range (light gray)
lower = np.array([200, 200, 200, 255])
upper = np.array([255, 255, 255, 255])

# Create mask for background
mask = np.all((img_array >= lower) & (img_array <= upper), axis=2)

# Make background transparent
img_array[mask] = [0, 0, 0, 0]

# Convert back to PIL Image
result = Image.fromarray(img_array)

# Crop to content
bbox = result.getbbox()
if bbox:
    result = result.crop(bbox)
    # Add some padding
    width, height = result.size
    padding = 20
    new_size = (width + padding * 2, height + padding * 2)
    new_img = Image.new('RGBA', new_size, (0, 0, 0, 0))
    new_img.paste(result, (padding, padding), result)
    result = new_img

# Save
result.save('src/assets/logo.png')
print("Logo cleaned successfully!")
