package com.example.demo.controller;

import com.example.demo.dto.PersonalTaskDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import com.example.demo.model.PersonalTask;
import com.example.demo.service.PersonalTaskService;

import java.util.List;

@RestController
@RequestMapping("/personal-tasks")
public class PersonalTaskController {

    @Autowired
    private PersonalTaskService personalTaskService;

    @GetMapping
    public List<PersonalTaskDto> getTasks(@AuthenticationPrincipal UserDetails userDetails) {
        return personalTaskService.getAllTasksForUser(userDetails.getUsername());
    }

    @PostMapping
    public PersonalTaskDto createTask(@RequestBody PersonalTask task, @AuthenticationPrincipal UserDetails userDetails) {
        return personalTaskService.createTask(task, userDetails.getUsername());
    }

    @PutMapping("/{id}")
    public PersonalTaskDto updateTask(@PathVariable Long id, @RequestBody PersonalTask taskDetails, @AuthenticationPrincipal UserDetails userDetails) {
        return personalTaskService.updateTask(id, taskDetails, userDetails.getUsername());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable Long id, @AuthenticationPrincipal UserDetails userDetails) {
        personalTaskService.deleteTask(id, userDetails.getUsername());
        return ResponseEntity.ok().build();
    }
}