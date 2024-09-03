# Log Monitoring 

This project involves a bash script designed to monitor a log file `systems.log` in real-time. The script's primary function is to detect recent errors and alert the user. 

## The Power of Automation in Production

- **Increased Efficiency**:
  - Automating scripts, reduces the need for **manual intervention**. By continuously monitoring logs, ensuring 
  potential issues are detected and addressed in real-time. It can even be intergrated on platfroms like **Slack** to notify your team instantly.

- **Faster Response Times**:
  -  Automated scripts can instantly detect errors, allowing teams to respond to problems faster, **reducing downtime**, and **improving system reliability**.

- **Consistency and Reliability**:
  - Unlike manual processes, which are prone to human error, automated scripts perform tasks **consistently and accurately** every time. This reliability is crucial in maintaining the health of production systems.

- **Scalability**:
  - Automation allows systems to **scale** more easily. For example, as the volume of logs grows, an automated script like can handle the increased load without additional overhead, ensuring that no errors go unnoticed.


## Test Case 

I've added a new log to `systems.log` file to test the script. The script successfully identified various scenarios such as recent errors, non-error messages, and older errors - as highlited 


![](/Scripting/test.png)

### Key Highlights:

- **Recent Error Detected**: 
  - **Log Entry**: `2024-09-01 17:32:58 This is a ERROR`
  - **Script Output**: `ALERT: Error detected in the logs!`
  - The script accurately detects errors that occur within the last 10 minutes and triggers an alert.

- **Non-Error Line**:
  - **Log Entry**: `2024-09-01 17:33:32 This is just a regular log message`
  - **Script Output**: `No ERROR found in this line`
  - The script correctly identifies lines without "ERROR" and acknowledges them without triggering an alert.

- **Older Error Detected**:
  - **Log Entry**: `2024-09-01 17:19:00 This is a ERROR but 20mins ago`
  - **Script Output**: `No recent error found in last 10 mins`
  - The script recognises errors that are older than 10 minutes and avoids unnecessary alerts.





## Script Overview
The script is designed to monitor a log file (systems.log) in real-time, detect any lines containing the word "ERROR," and check if the error occurred within the last 10 minutes. Depending on these conditions, it outputs relevant messages or alerts.

1. **Setting Up the Log File Path** - This line defines the path to the log file that the script will monitor. The variable log_file stores the file path, making it easy to reference throughout the script.

```bash 
log_file="systems.log" # The log file to be monitored
```


2. **Monitoring the Log in real-time** - `tail -F $log_file`: This command continuously follows (-F) the systems.log file, watching for any new lines added to it.
- `while read line; do`: This loop reads each new line from the log file one by one and processes it.

```bash 
# continuously monitoring the log file for recent errors
monitor_logs() {
    #  tail -F command to follow the log file in real-time
    tail -F $log_file | while read line; do
```

3. **Processing each log entry** - For each line read from the log file, the script prints "Processing line: " followed by the actual content of the line. This helps track which lines are being processed.

```bash 
        echo "Processing line: $line"

```


4. **Detecting errors** - `grep -q "ERROR"`: This command checks if the word "ERROR" exists in the line. The `-q `option suppresses the output of grep, so it only returns a success/failure code.
- So if "ERROR" is found, the script prints "ERROR detected: " followed by the line’s content.
```bash 
        # Check if the line contains the word "ERROR"
        if echo "$line" | grep -q "ERROR"; then
            echo "ERROR detected: $line" 
```


5. **Extracting the timestamp** - `awk '{print $1 " " $2}'`: This command extracts the first two fields from the log line (typically the date and time), which are assumed to be the timestamp.

```bash 
           # timestamp from the log entry
            log_time=$(echo "$line" | awk '{print $1 " " $2}')
            echo "Extracted timestamp: $log_time"  # Show the extracted timestamp
```
6. **Comparing timestamps** - The script compares these two timestamps:
- If the log entry's timestamp is more recent than 10 minutes ago, it triggers an alert: "ALERT: Error detected in the logs!"
- If the error is older, it prints: "No recent error found in last 10 mins."

```bash 
            # Compare the extracted timestamp with the current time minus 10 minutes
            if [[ $(date -d "$log_time" +%s) -gt $(date --date="10 minutes ago" +%s) ]]; then
                echo "ALERT: Error detected in the logs!" 
            else
                echo "No recent error found in last 10 mins"  
            fi
```
7. **Non-Error Lines** - If "ERROR" is not found in the line, the script outputs "No ERROR found in this line"
```bash 
        else
            echo "No ERROR found in this line"  # extra statement for no ERRORs
        fi

```


 
## Previous Logs
This section presents test cases to demonstrate how the script processes different log entries. The following are logs recorded on Aug 17th. These examples show typical outputs generated by the script:

![](/Scripting/Aug-17-outputs.png)



If you want to see a python version of this script click **[HERE](https://github.com/zyusuf88/DevOps-Challenge/blob/main/Scripting/log-script.py)**
