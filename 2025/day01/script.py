with open("input", 'r') as path:
    rotations = path.read().strip().split("\n")

position = 50
count = 0

for rotation in rotations:
    direction = rotation[0]
    distance = int(rotation[1:])

    if direction == "L":
        position = (position - distance) % 100
    else:
        position = (position + distance) % 100

    if position == 0:
        count += 1

print(count)
