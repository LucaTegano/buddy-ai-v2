package com.example.demo.service.ai;

import org.springframework.ai.chat.model.ChatModel;
import org.springframework.stereotype.Service;

@Service
public class OpenRouterService {

    private final ChatModel chatModel;

    public OpenRouterService(ChatModel chatModel) {
        this.chatModel = chatModel;
    }

    public String ask(String prompt) {
        try {
            return chatModel.call(prompt);
        } catch (Exception e) {
            System.err.println("Error calling AI: " + e.getMessage());
            return "AI service is currently experiencing errors: " + e.getMessage();
        }
    }
}
