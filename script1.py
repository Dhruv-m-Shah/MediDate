initial_file = open("logs/test1.txt")
raw_data = initial_file.read().split("\n")
initial_len = len(raw_data)

while True:
    new_file = open("logs/test1.txt")
    new_raw_data = new_file.read().split("\n")
    new_len = len(new_raw_data)
    if new_len != initial_len:
        print(new_raw_data[-2])
    initial_len = new_len
