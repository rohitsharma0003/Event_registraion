package com.example.eventregistration.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;

@Entity
public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "Event name is required")
    private String name;

    @NotBlank(message = "Description is required")
    private String description;

    @NotNull(message = "Date is required")
    private LocalDateTime date;

    @NotBlank(message = "Location is required")
    private String location;

    private int capacity;

    // Constructors
    public Event() {}

    public Event(String name, String description, LocalDateTime date, String location, int capacity) {
        this.name = name;
        this.description = description;
        this.date = date;
        this.location = location;
        this.capacity = capacity;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getDate() {
        return date;
    }

    public void setDate(LocalDateTime date) {
        this.date = date;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }
}
