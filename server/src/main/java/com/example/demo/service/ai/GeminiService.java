package com.example.demo.service.ai;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class GeminiService {

    public GeminiService(@Value("${google.api.key}") String apiKey) {
        // AI service disabled - dependency not available
    }

    public String askGemini(String prompt) {
        return "AI service is currently unavailable. Please try again later.";
    }
}
