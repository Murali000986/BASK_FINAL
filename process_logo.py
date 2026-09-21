from rembg import remove
from PIL import Image
import os

input_path = r'c:\Users\murali\Desktop\BASK_!\frontend\public\logo.png'
output_path = r'c:\Users\murali\Desktop\BASK_!\frontend\public\logo_fixed.png'

print("Opening image...")
inp = Image.open(input_path).convert('RGBA')

# The original logo has a white background. rembg usually handles this, 
# but let's make sure it runs correctly.
print("Removing background...")
out = remove(inp)

print(f"Saving to {output_path}...")
out.save(output_path)
print("Done!")
