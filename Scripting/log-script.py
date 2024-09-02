from datetime import datetime, timedelta

log_file = "systems.log"  

def monitor_logs():
    with open(log_file, "r") as file:
        file.seek(0, 2)  
        while True:
            line = file.readline().strip()  
            if line:  
                print(f"Processing line: {line}")

                if "ERROR" in line:
                    print(f"ERROR detected: {line}")

                    # Extract the timestamp from the log entry
                    log_time_str = " ".join(line.split()[:2])
                    log_time = datetime.strptime(log_time_str, "%Y-%m-%d %H:%M:%S")

            
                    if log_time > datetime.now() - timedelta(minutes=10):
                        print("ALERT: Error detected in the logs!")
                    else:
                        print("No recent error found in last 10 mins")
                else:
                    print("No ERROR found in this line")

if __name__ == "__main__":
    monitor_logs()
