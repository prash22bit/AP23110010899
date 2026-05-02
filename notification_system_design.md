# Notification System Design

## Stage 1

### Problem
Users lose track of important notifications due to high volume. Need a Priority Inbox that always shows top 'n' most important unread notifications first.

### Approach: Score-Based Ranking

Each notification is assigned a priority score using: score = weight*10^12 + timestamp_ms

weightmap:
placement:3
result:2
event:1

we use min-heap to maintain top 'n' notifications based on score. When a new notification arrives, we calculate its score and compare it with the lowest score in the heap. If the new score is higher, we replace the lowest score notification with the new one.


## Stage 2
Architecture
front end: react.js
css: material ui
backend: no backend needed, we can use local storage..
