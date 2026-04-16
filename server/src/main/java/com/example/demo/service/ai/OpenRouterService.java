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
        System.out.println("OpenRouterService.ask called with prompt length: " + prompt.length());
        try {
            System.out.println("Executing chatModel.call...");
            String response = chatModel.call(prompt);
            System.out.println("chatModel.call returned response of length: " + (response != null ? response.length() : "null"));
            return response;
        } catch (Exception e) {
            System.err.println("Error calling AI in OpenRouterService: " + e.getMessage());
            e.printStackTrace();
            return "AI service is currently experiencing errors: " + e.getMessage();
        }
    }
}
