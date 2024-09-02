#!/bin/bash

log_file="systems.log" 


monitor_logs() {
    #  tail -F command to follow the log file in real-time
    tail -F $log_file | while read line; do
        echo "Processing line: $line" 
        if echo "$line" | grep -q "ERROR"; then
            echo "ERROR detected: $line" 
            
         
            log_time=$(echo "$line" | awk '{print $1 " " $2}')
            echo "Extracted timestamp: $log_time"  

    
            if [[ $(date -d "$log_time" +%s) -gt $(date --date="10 minutes ago" +%s) ]]; then
                echo "ALERT: Error detected in the logs!" 
            else
                echo "No recent error found in last 10 mins"  
            fi
        else
            echo "No ERROR found in this line"  # extra statement for no ERRORs
        fi
    done
}

monitor_logs

