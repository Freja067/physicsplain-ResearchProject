import subprocess
import time

def measure_execution_time():
    """Measures the time taken to start the server."""
    start = time.time()
    process = subprocess.Popen(["node", "server.js"], stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    
    try:
        # Allow the server some time to start up
        time.sleep(2)  # Adjust this value based on your server's expected startup time
        process.terminate()  # Terminate the server after measuring startup time
        stdout, stderr = process.communicate()
        print("STDOUT:", stdout)
        print("STDERR:", stderr)
    except Exception as e:
        process.kill()
        return None

    end = time.time()
    return (end - start) * 1000  # Return execution time in milliseconds

def run_experiment(repetitions):
    """Runs the server startup experiment multiple times and calculates statistics."""
    results = []
    
    for i in range(repetitions):
        print(f"Running experiment {i + 1}...")
        execution_time = measure_execution_time()
        if execution_time is not None:
            results.append(execution_time)
            print(f"Experiment {i + 1}: {execution_time:.2f} ms")
        else:
            print(f"Experiment {i + 1}: Failed to measure execution time.")
    
    # Calculate statistics
    if results:
        avg_time = sum(results) / len(results)
        print("\nResults Summary:")
        print(f"Total Experiments: {repetitions}")
        print(f"Successful Runs: {len(results)}")
        print(f"Average Execution Time: {avg_time:.2f} ms")
        print(f"All Execution Times: {results}")
        return results, avg_time
    else:
        print("No successful measurements were made.")
        return [], None

# Run the experiment
if __name__ == "__main__":
    repetitions = 10  # Number of times to run the experiment
    results, avg_time = run_experiment(repetitions)

    if results:
        # Generate visualization (Optional)
        try:
            import matplotlib.pyplot as plt
            
            plt.figure(figsize=(10, 5))
            plt.plot(range(1, len(results) + 1), results, marker='o', label='Execution Times')
            plt.axhline(y=avg_time, color='r', linestyle='--', label=f'Average Time ({avg_time:.2f} ms)')
            plt.title('Server Startup Execution Times')
            plt.xlabel('Experiment Run')
            plt.ylabel('Execution Time (ms)')
            plt.legend()
            plt.grid()
            plt.show()
        except ImportError:
            print("Matplotlib is not installed. Skipping visualization.")
