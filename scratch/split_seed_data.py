import json
import os
import re

def slugify(text):
    s = text.lower()
    s = re.sub(r'[^a-z0-9]+', '-', s)
    return s.strip('-')

def main():
    json_path = r'e:\PROJECT_CGP360\CARE HOMEOPATHIC CLINIC\CARE HOMEOPATHIC CLINIC\scratch\remaining_specialities.json'
    
    # Try reading with utf-16 (PowerShell redirection default)
    try:
        with open(json_path, 'r', encoding='utf-16') as f:
            new_specs = json.load(f)
    except Exception:
        with open(json_path, 'r', encoding='utf-8') as f:
            new_specs = json.load(f)
    
    target_dir = r'e:\PROJECT_CGP360\CARE HOMEOPATHIC CLINIC\CARE HOMEOPATHIC CLINIC\src\data\seed'
    os.makedirs(target_dir, exist_ok=True)
    
    # For each new speciality, create a JS file
    for spec in new_specs:
        raw_name = spec["name"].strip()
        safe_name = re.sub(r'^([^\x00-\x7F]|[\uD83C-\uDBFF][\uDC00-\uDFFF])\s*', '', raw_name).strip()
        filename = slugify(safe_name) + ".js"
        filepath = os.path.join(target_dir, filename)
        
        with open(filepath, 'w', encoding='utf-8') as f:
            var_name = slugify(safe_name).replace('-', '_')
            f.write(f"export const {var_name} = ")
            f.write(json.dumps(spec, indent=2))
            f.write("\n")
            
    # Generate an index.js to export everything
    index_path = os.path.join(target_dir, "index.js")
    with open(index_path, 'w', encoding='utf-8') as f:
        for spec in new_specs:
            raw_name = spec["name"].strip()
            safe_name = re.sub(r'^([^\x00-\x7F]|[\uD83C-\uDBFF][\uDC00-\uDFFF])\s*', '', raw_name).strip()
            var_name = slugify(safe_name).replace('-', '_')
            f.write(f"import {{ {var_name} }} from './{slugify(safe_name)}.js'\n")
        
        f.write("\nexport const newSpecialities = [\n")
        for spec in new_specs:
            raw_name = spec["name"].strip()
            safe_name = re.sub(r'^([^\x00-\x7F]|[\uD83C-\uDBFF][\uDC00-\uDFFF])\s*', '', raw_name).strip()
            var_name = slugify(safe_name).replace('-', '_')
            f.write(f"  {var_name},\n")
        f.write("]\n")

if __name__ == "__main__":
    main()
