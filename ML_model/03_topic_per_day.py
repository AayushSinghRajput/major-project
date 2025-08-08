import json
import math

# Load TOC
with open("precise_biology_structure.json", "r", encoding="utf-8") as f:
    toc_data = json.load(f)

# Flatten all topics serially
all_topics = []
for chapter, topics in toc_data["chapters"].items():
    for topic in topics:
        all_topics.append({
            "chapter": chapter,
            "topic": topic
        })

# Set number of days
TOTAL_DAYS = 20
topics_per_day = math.ceil(len(all_topics) / TOTAL_DAYS)

# Create schedule
schedule = []
for i in range(0, len(all_topics), topics_per_day):
    daily_topics = all_topics[i:i+topics_per_day]
    schedule.append(daily_topics)

# Print schedule
for i, day in enumerate(schedule, 1):
    print(f"\n📅 Day {i}:")
    for t in day:
        print(f"  - {t['chapter']} → {t['topic']}")

# ✅ Save schedule with day number
final_schedule = []
for i, day in enumerate(schedule, 1):
    final_schedule.append({
        "day": i,
        "topics": day
    })

with open("study_schedule.json", "w", encoding="utf-8") as f:
    json.dump(final_schedule, f, indent=4, ensure_ascii=False)

print("\n✅ Schedule saved to study_schedule.json with day numbers.")
