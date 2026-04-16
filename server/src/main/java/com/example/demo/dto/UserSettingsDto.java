package com.example.demo.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserSettingsDto {
    private String personality;
    private String customInstructions;
    private boolean customizationEnabled;
    private String theme;
    private String language;
}
