import psutil
import subprocess
import time

def measure_memory_usage(process_name, duration=120, interval=5):
    """Measures memory usage of a specific process."""
    memory_data = []

    # Capture memory usage over time
    for _ in range(duration // interval):
        # Find the process by name
        for proc in psutil.process_iter(['name', 'memory_info']):
            if proc.info['name'] == process_name:
                memory_data.append(proc.info['memory_info'].rss / 1024 / 1024)  # Convert bytes to MB
                break
        time.sleep(interval)

    return memory_data

def run_server_and_monitor():
    """Runs the Node.js server and monitors its memory usage."""
    process = subprocess.Popen(["node", "server.js"], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)

    try:
        print("Waiting for the server to initialize...")
        time.sleep(10)  # Allow the server to fully start
        
        print("Starting memory monitoring...")
        memory_usage = measure_memory_usage('node', duration=120, interval=5)
        
        print("Memory Usage Data:", memory_usage)
        print("Average Memory Usage: {:.2f} MB".format(sum(memory_usage) / len(memory_usage)))
    finally:
        process.terminate()  # Stop the server process

# Run the experiment
if __name__ == "__main__":
    run_server_and_monitor()
