#!/usr/bin/env python3
"""
Script to remove white background from logos using rembg.
Usage: python remove_white_bg.py <input_image> <output_image>
"""

import sys
from pathlib import Path
from rembg import remove
from PIL import Image

def remove_white_background(input_path: str, output_path: str):
    """
    Remove white background from an image and save the result.

    Args:
        input_path: Path to input image
        output_path: Path to save output image (with transparent background)
    """
    try:
        # Open the input image
        print(f"Processing: {input_path}")
        with open(input_path, 'rb') as input_file:
            input_data = input_file.read()

        # Remove background
        output_data = remove(input_data)

        # Save the output image
        with open(output_path, 'wb') as output_file:
            output_file.write(output_data)

        print(f"✓ Saved: {output_path}")

    except FileNotFoundError:
        print(f"✗ Error: Input file '{input_path}' not found")
        sys.exit(1)
    except Exception as e:
        print(f"✗ Error processing image: {e}")
        sys.exit(1)

def main():
    if len(sys.argv) != 3:
        print("Usage: python remove_white_bg.py <input_image> <output_image>")
        print("\nExample:")
        print("  python remove_white_bg.py public/clients/logo.jpg public/clients/logo.png")
        sys.exit(1)

    input_path = sys.argv[1]
    output_path = sys.argv[2]

    # Ensure output has .png extension for transparency support
    if not output_path.lower().endswith('.png'):
        print("⚠ Warning: Output should be .png to support transparency")
        output_path = str(Path(output_path).with_suffix('.png'))
        print(f"  Changed to: {output_path}")

    remove_white_background(input_path, output_path)

if __name__ == "__main__":
    main()
