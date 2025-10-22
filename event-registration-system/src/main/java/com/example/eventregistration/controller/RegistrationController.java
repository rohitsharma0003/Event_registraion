 package com.example.eventregistration.controller;

import com.example.eventregistration.model.Event;
import com.example.eventregistration.model.Registration;
import com.example.eventregistration.service.EventService;
import com.example.eventregistration.service.RegistrationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/registrations")
public class RegistrationController {

    @Autowired
    private RegistrationService registrationService;

    @Autowired
    private EventService eventService;

    @GetMapping
    public String listRegistrations(Model model) {
        model.addAttribute("registrations", registrationService.getAllRegistrations());
        return "registrations";
    }

    @GetMapping("/new")
    public String showCreateForm(Model model) {
        model.addAttribute("registration", new Registration());
        model.addAttribute("events", eventService.getAllEvents());
        return "registration-form";
    }

    @PostMapping
    public String saveRegistration(@Valid @ModelAttribute("registration") Registration registration, BindingResult result, Model model) {
        if (result.hasErrors()) {
            model.addAttribute("events", eventService.getAllEvents());
            return "registration-form";
        }
        registrationService.saveRegistration(registration);
        return "redirect:/registrations";
    }

    @GetMapping("/edit/{id}")
    public String showEditForm(@PathVariable Long id, Model model) {
        Registration registration = registrationService.getRegistrationById(id).orElseThrow(() -> new IllegalArgumentException("Invalid registration Id:" + id));
        model.addAttribute("registration", registration);
        model.addAttribute("events", eventService.getAllEvents());
        return "registration-form";
    }

    @PostMapping("/update/{id}")
    public String updateRegistration(@PathVariable Long id, @Valid @ModelAttribute("registration") Registration registration, BindingResult result, Model model) {
        if (result.hasErrors()) {
            model.addAttribute("events", eventService.getAllEvents());
            return "registration-form";
        }
        registration.setId(id);
        registrationService.saveRegistration(registration);
        return "redirect:/registrations";
    }

    @GetMapping("/delete/{id}")
    public String deleteRegistration(@PathVariable Long id) {
        registrationService.deleteRegistration(id);
        return "redirect:/registrations";
    }
}
