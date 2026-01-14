# Use a lightweight Python image as the base
FROM python:3.12-slim

# Set working directory in container
WORKDIR /app

# Copy project files to container
COPY index.html styles.css favicon.svg form-handler.js ./

# Expose port 8080 (required by Cloud Run)
EXPOSE 8080

# Start a simple HTTP server on port 8080
CMD ["python", "-m", "http.server", "8080", "--directory", "/app"]
