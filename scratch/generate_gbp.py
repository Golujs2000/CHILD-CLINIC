import re

def generate_gbp_services(input_file, output_file):
    with open(input_file, 'r', encoding='utf-8') as f:
        lines = f.readlines()

    clinic_name = "Child Clinic (Dr. Anshuman)"
    location = "Saharsa, Bihar"
    region = "Kosi region"
    
    output = []
    output.append(f"================================================================")
    output.append(f"  {clinic_name.upper()} — FULL GBP SERVICES LIST")
    output.append(f"  Near Dr I D Singh, Naya Bazar, {location} | Call: 8544037256")
    output.append(f"================================================================")
    output.append("\n")

    current_category = "General Health"
    
    for line in lines:
        line = line.strip()
        if not line:
            continue
            
        # Detect Category
        category_match = re.search(r'^[^\w]*\s*(.+)$', line) # Handles emojis at start
        if any(emoji in line for emoji in ["🩺", "🌿", "💧", "🫁", "🧠", "💪", "👩‍⚕️", "👨‍⚕️", "🩸", "🦷", "👶", "🧬", "🧪", "🦠", "🌡️", "❤️", "👁️", "👂", "🍽️", "🧴"]):
            current_category = line.split(' ', 1)[-1] if ' ' in line else line
            output.append("\n" + "━" * 60)
            output.append(f"  CATEGORY: {current_category.upper()}")
            output.append("━" * 60 + "\n")
            continue
        
        # Item
        item_name = line
        hindi_name = ""
        if "(" in line:
            parts = line.split("(", 1)
            item_name = parts[0].strip()
            hindi_name = parts[1].replace(")", "").strip()
        
        service_name = item_name
        description = (
            f"Expert {item_name} {f'({hindi_name}) ' if hindi_name else ''}treatment at {clinic_name}, {location}. "
            f"Providing specialized care for {current_category.lower()} in the {region}. "
            f"Best child and family doctor near me in Bihar. Trusted medical services in Naya Bazar."
        )
        
        output.append(f"SERVICE NAME: {service_name}")
        output.append(f"DESCRIPTION:")
        output.append(description)
        output.append("\n---\n")

    with open(output_file, 'w', encoding='utf-8') as f:
        f.write("\n".join(output))

if __name__ == "__main__":
    generate_gbp_services(
        r'c:\Users\Admin\OneDrive\Desktop\CHILD CLINIC\CHILD CLINIC\treatment list.txt',
        r'c:\Users\Admin\OneDrive\Desktop\CHILD CLINIC\CHILD CLINIC\google-business-services-full-list.txt'
    )
