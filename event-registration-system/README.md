# Event Registration System

A comprehensive Spring Boot web application for managing events and user registrations. This end-to-end project includes full CRUD operations, persistent data storage, and a responsive web interface.

## Features

### Event Management
- **Create Events**: Add new events with name, description, location, date/time, and capacity
- **View Events**: Browse all available events in a clean, organized list
- **Edit Events**: Modify existing event details
- **Delete Events**: Remove events from the system

### Registration Management
- **Register for Events**: Users can register for events with their name and email
- **View Registrations**: See all registrations for each event
- **Manage Registrations**: Edit or delete user registrations

### Data Persistence
- **File-based H2 Database**: Data persists between application restarts
- **JPA/Hibernate**: Robust ORM for data management
- **H2 Console**: Built-in database console for development and debugging

## Technology Stack

- **Backend**: Spring Boot 3.1.0, Spring MVC, Spring Data JPA
- **Database**: H2 Database (file-based persistence)
- **Frontend**: Thymeleaf templates, Bootstrap 5, Custom CSS
- **Build Tool**: Maven
- **Java Version**: 17+

## Project Structure

```
event-registration-system/
├── src/main/java/com/example/eventregistration/
│   ├── controller/
│   │   ├── EventController.java
│   │   └── RegistrationController.java
│   ├── model/
│   │   ├── Event.java
│   │   └── Registration.java
│   ├── repository/
│   │   ├── EventRepository.java
│   │   └── RegistrationRepository.java
│   ├── service/
│   │   ├── EventService.java
│   │   └── RegistrationService.java
│   └── EventRegistrationApplication.java
├── src/main/resources/
│   ├── templates/
│   │   ├── index.html
│   │   ├── events.html
│   │   ├── event-form.html
│   │   ├── registrations.html
│   │   └── registration-form.html
│   ├── static/
│   │   ├── css/style.css
│   │   └── js/script.js
│   └── application.properties
├── pom.xml
├── TODO.md
└── README.md
```

## Setup and Installation

### Prerequisites
- Java 17 or higher
- Maven 3.6+

### Running the Application

1. **Clone or navigate to the project directory**:
   ```bash
   cd event-registration-system
   ```

2. **Build the project**:
   ```bash
   mvn clean install
   ```

3. **Run the application**:
   ```bash
   mvn spring-boot:run
   ```

4. **Access the application**:
   - Main application: http://localhost:8080
   - H2 Database Console: http://localhost:8080/h2-console
     - JDBC URL: `jdbc:h2:file:./data/eventdb`
     - Username: `sa`
     - Password: `password`

## API Endpoints

### Events
- `GET /events` - List all events
- `GET /events/new` - Show create event form
- `POST /events` - Create new event
- `GET /events/edit/{id}` - Show edit event form
- `POST /events/update/{id}` - Update event
- `GET /events/delete/{id}` - Delete event

### Registrations
- `GET /registrations` - List all registrations
- `GET /registrations/new` - Show create registration form
- `POST /registrations` - Create new registration
- `GET /registrations/edit/{id}` - Show edit registration form
- `POST /registrations/update/{id}` - Update registration
- `GET /registrations/delete/{id}` - Delete registration

## Styling and UI

The application features a modern, responsive design using:

- **Bootstrap 5**: For responsive grid system, components, and utilities
- **Custom CSS** (`static/css/style.css`): Additional styling for enhanced visual appeal
- **Thymeleaf Templates**: Server-side rendering with dynamic content
- **Navigation**: Clean navbar with links to main sections
- **Forms**: Validated forms with proper error handling
- **Tables**: Organized data display for events and registrations

### Key Styling Features
- Responsive design that works on desktop and mobile
- Consistent color scheme with primary blue theme
- Card-based layouts for better content organization
- Form validation with visual feedback
- Hover effects and transitions for interactive elements

## Database Schema

### Event Table
- `id` (BIGINT, Primary Key)
- `name` (VARCHAR)
- `description` (VARCHAR)
- `location` (VARCHAR)
- `date` (TIMESTAMP)
- `capacity` (INTEGER)

### Registration Table
- `id` (BIGINT, Primary Key)
- `name` (VARCHAR)
- `email` (VARCHAR)
- `event_id` (BIGINT, Foreign Key)

## Development Notes

- The application uses Spring Boot's auto-configuration for simplicity
- H2 database files are stored in `./data/eventdb` relative to the application root
- Templates use Thymeleaf for dynamic content rendering
- Validation is implemented using Bean Validation (JSR-303)
- The application runs on port 8080 by default

## Testing

The application has been tested for:
- Successful startup and database connection
- CRUD operations for events and registrations
- Form validation and error handling
- Responsive design across different screen sizes
- Data persistence between application restarts

## Future Enhancements

Potential improvements could include:
- User authentication and authorization
- Email notifications for registrations
- Event categories and filtering
- Pagination for large datasets
- REST API endpoints for external integrations
- Advanced search and sorting capabilities
