package com.example.demo.controller;

import org.springframework.ai.chat.model.ChatModel;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AiController {

    private final ChatModel chatModel;

    // Spring inietterà automaticamente il modello configurato nelle properties
    public AiController(ChatModel chatModel) {
        this.chatModel = chatModel;
    }

    @GetMapping("/ask")
    public String askAi(@RequestParam(value = "message") String message) {
        try {
            // Chiamata sincrona verso OpenRouter
            return chatModel.call(message);
        } catch (Exception e) {
            return "Errore durante la chiamata: " + e.getMessage();
        }
    }
}
