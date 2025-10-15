# Stage 1: Build the application with Maven
FROM maven:3.8.4-openjdk-17 AS build

# Set the working directory
WORKDIR /app

# Copy the pom.xml and source code to the container
COPY pom.xml /app/
COPY src /app/src

# Build the application and skip tests
RUN mvn clean package -DskipTests

# Stage 2: Run the application using OpenJDK
FROM openjdk:17-jdk-slim

# Set the working directory
WORKDIR /app

# Copy the built jar file from the build stage (adjust the jar name to the correct one)
#the container name is "lnf"
COPY --from=build /app/target/lnf-proj.jar /app/lnf-proj.jar

# Expose the port the application runs on
EXPOSE 8080

# Command to run the Spring Boot application
ENTRYPOINT ["java", "-jar", "/app/lnf-proj.jar"]
