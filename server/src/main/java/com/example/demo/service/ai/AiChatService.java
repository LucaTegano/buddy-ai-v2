package com.example.demo.service.ai;

import com.example.demo.dto.AiChatMessageDto;
import com.example.demo.model.AiChatMessage;
import com.example.demo.model.AiMessageRole;
import com.example.demo.model.Note;
import com.example.demo.model.User;
import com.example.demo.repository.AiChatMessageRepository;
import com.example.demo.repository.NoteRepository;
import com.example.demo.service.NoteService;
import com.example.demo.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AiChatService {

    private final NoteRepository noteRepository;
    private final AiChatMessageRepository aiChatMessageRepository;
    private final OpenRouterService openRouterService;
    private final UserService userService;
    private final NoteService noteService;

    public AiChatMessageDto sendMessage(Long noteId, String userMessageContent, String username) {
        User currentUser = userService.getUserByUsername(username);
        
        // 1. Save user message and build prompt in a transaction
        String fullPrompt = prepareChatAndGetPrompt(noteId, userMessageContent, currentUser);
        
        System.out.println("Calling OpenRouter with prompt length: " + fullPrompt.length());

        // 2. Call AI outside transaction to avoid holding DB connections
        String aiResponseContent = openRouterService.ask(fullPrompt);
        
        System.out.println("Received AI response length: " + (aiResponseContent != null ? aiResponseContent.length() : "null"));

        // 3. Save AI response in another transaction
        return saveAiResponse(noteId, aiResponseContent);
    }

    @Transactional
    public String prepareChatAndGetPrompt(Long noteId, String userMessageContent, User currentUser) {
        Note note = noteRepository.findByIdWithDetails(noteId)
                .orElseThrow(() -> new RuntimeException("Note not found with id: " + noteId));

        checkNoteAccess(note, currentUser);

        // Save User Message
        AiChatMessage userMessage = new AiChatMessage();
        userMessage.setNote(note);
        userMessage.setRole(AiMessageRole.USER);
        userMessage.setContent(userMessageContent);
        aiChatMessageRepository.save(userMessage);

        return buildPrompt(note, userMessageContent, currentUser);
    }

    @Transactional
    public AiChatMessageDto saveAiResponse(Long noteId, String aiResponseContent) {
        Note note = noteRepository.findByIdWithDetails(noteId)
                .orElseThrow(() -> new RuntimeException("Note not found with id: " + noteId));

        // Save AI response
        AiChatMessage aiMessage = new AiChatMessage();
        aiMessage.setNote(note);
        aiMessage.setRole(AiMessageRole.MODEL);
        aiMessage.setContent(aiResponseContent);
        AiChatMessage savedAiMessage = aiChatMessageRepository.save(aiMessage);

        // Update last activity
        note.setLastActivity(LocalDateTime.now());
        noteRepository.save(note);

        return new AiChatMessageDto(
                savedAiMessage.getId(),
                savedAiMessage.getRole(),
                savedAiMessage.getContent(),
                savedAiMessage.getCreatedAt());
    }

    @Transactional(readOnly = true)
    public List<AiChatMessageDto> getChatHistory(Long noteId, String username) {
        User currentUser = userService.getUserByUsername(username);
        Note note = noteRepository.findByIdWithDetails(noteId)
                .orElseThrow(() -> new RuntimeException("Note not found with id: " + noteId));

        checkNoteAccess(note, currentUser);

        List<AiChatMessage> messages = aiChatMessageRepository.findByNoteIdOrderByCreatedAtAsc(noteId);

        return messages.stream()
                .map(msg -> new AiChatMessageDto(msg.getId(), msg.getRole(), msg.getContent(), msg.getCreatedAt()))
                .collect(Collectors.toList());
    }

    private String buildPrompt(Note note, String newQuery, User user) {
        StringBuilder promptBuilder = new StringBuilder();

        promptBuilder.append("You are a helpful assistant integrated into a note-taking app. ");
        
        if (user.isCustomizationEnabled()) {
            if (user.getPersonality() != null && !user.getPersonality().equals("default")) {
                promptBuilder.append("Your personality should be: ").append(user.getPersonality()).append(". ");
            }
            if (user.getCustomInstructions() != null && !user.getCustomInstructions().isBlank()) {
                promptBuilder.append("Follow these custom instructions: ").append(user.getCustomInstructions()).append(". ");
            }
        }

        promptBuilder.append("The user is currently working on the note provided below. ");
        promptBuilder.append("Your primary context is this note. All your responses should be relevant to it. ");
        promptBuilder.append("Do not refer to the note as 'the provided note', just use its content as your knowledge base.\n\n");

        promptBuilder.append("--- NOTE START ---\n");
        promptBuilder.append("Title: ").append(note.getTitle()).append("\n\n");
        promptBuilder.append(note.getContent()).append("\n");
        promptBuilder.append("--- NOTE END ---\n\n");

        promptBuilder.append("--- CHAT HISTORY START ---\n");
        List<AiChatMessage> history = aiChatMessageRepository.findByNoteIdOrderByCreatedAtAsc(note.getId());
        for (AiChatMessage message : history) {
            promptBuilder.append(message.getRole().name()).append(": ").append(message.getContent()).append("\n");
        }
        promptBuilder.append("--- CHAT HISTORY END ---\n\n");

        promptBuilder.append("Based on the note and the chat history but you can also search online and use other resources, answer the last user message.");

        return promptBuilder.toString();
    }

    private void checkNoteAccess(Note note, User user) {
        // Correctly handle lazy loading by using ID comparison
        Long ownerId = note.getOwner().getId();
        Long userId = user.getId();
        
        boolean isOwner = ownerId.equals(userId);
        
        boolean isCollaborator = note.getCollaborators().stream()
                .anyMatch(c -> c.getId().equals(userId));

        if (!isOwner && !isCollaborator) {
            throw new AccessDeniedException("User does not have access to this note.");
        }
    }
}
