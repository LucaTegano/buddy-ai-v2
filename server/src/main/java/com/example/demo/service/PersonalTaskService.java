package com.example.demo.service;

import com.example.demo.dto.PersonalTaskDto;
import com.example.demo.model.PersonalTask;
import com.example.demo.model.User;
import com.example.demo.repository.PersonalTaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PersonalTaskService {

    @Autowired
    private PersonalTaskRepository personalTaskRepository;

    @Autowired
    private UserService userService;

    public List<PersonalTaskDto> getAllTasksForUser(String username) {
        User owner = userService.getUserByUsername(username);
        return personalTaskRepository.findByOwner_Id(owner.getId())
                .stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public PersonalTaskDto createTask(PersonalTask taskRequest, String username) {
        User owner = userService.getUserByUsername(username);
        taskRequest.setOwner(owner);
        PersonalTask savedTask = personalTaskRepository.save(taskRequest);
        return convertToDto(savedTask);
    }

    public PersonalTaskDto updateTask(Long taskId, PersonalTask taskRequest, String username) {
        PersonalTask task = getTaskAndVerifyOwner(taskId, username);
        task.setText(taskRequest.getText());
        task.setCompleted(taskRequest.isCompleted());
        PersonalTask updatedTask = personalTaskRepository.save(task);
        return convertToDto(updatedTask);
    }

    public void deleteTask(Long taskId, String username) {
        PersonalTask taskToDelete = getTaskAndVerifyOwner(taskId, username);
        personalTaskRepository.delete(taskToDelete);
    }

    private PersonalTask getTaskAndVerifyOwner(Long taskId, String username) {
        User owner = userService.getUserByUsername(username);
        PersonalTask task = personalTaskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + taskId));
        if (!task.getOwner().getId().equals(owner.getId())) {
            throw new RuntimeException("User not authorized for this task");
        }

        return task;
    }

    private PersonalTaskDto convertToDto(PersonalTask task) {
        return PersonalTaskDto.builder()
                .id(task.getId())
                .text(task.getText())
                .completed(task.isCompleted())
                .build();
    }
}