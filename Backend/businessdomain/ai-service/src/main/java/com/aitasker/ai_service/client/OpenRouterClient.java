package com.aitasker.ai_service.client;

import com.aitasker.ai_service.dto.ScheduleRequestDTO;
import com.aitasker.ai_service.dto.ScheduledTaskDTO;
import com.aitasker.ai_service.dto.ScoredTaskDTO;
import com.aitasker.ai_service.model.Task;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import com.fasterxml.jackson.core.type.TypeReference;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
@RequiredArgsConstructor
public class OpenRouterClient {

    @Value("${openrouter.api-key}")
    private String apiKey;

    @Value("${openrouter.base-url}")
    private String baseUrl;

    @Value("${openrouter.model}")
    private String model;

    private final ObjectMapper objectMapper = new ObjectMapper();
    private final RestTemplate restTemplate = new RestTemplate();

    public List<ScoredTaskDTO> requestTaskPrioritization(List<Task> tasks) {
        StringBuilder prompt = new StringBuilder(
                "You will receive a list of tasks. For each task, assign an importanceScore between 0.0 and 1.0.\n" +
                        "Return ONLY a valid JSON array like this:\n" +
                        "[{\"title\": \"Task title\", \"importanceScore\": 0.92}, ...]\n" +
                        "Do NOT include any explanation, comments or text before or after the JSON.\n\n"
        );

        for (Task task : tasks) {
            prompt.append("- Title: ").append(task.getTitle()).append("\n")
                    .append("  Description: ").append(task.getDescription()).append("\n")
                    .append("  Due Date: ").append(task.getDueDate()).append("\n")
                    .append("  Priority: ").append(task.getPriority()).append("\n\n");
        }

        Map<String, Object> body = new HashMap<>();
        body.put("model", model);
        body.put("messages", List.of(
                Map.of("role", "user", "content", prompt.toString())
        ));
        body.put("temperature", 0.2);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);
        headers.set("HTTP-Referer", "https://aitasker.app");
        headers.set("X-Title", "AItasker AI");

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(body, headers);
        ResponseEntity<String> response = restTemplate.postForEntity(baseUrl, request, String.class);

        try {
            JsonNode root = objectMapper.readTree(response.getBody());
            String rawContent = root.get("choices").get(0).get("message").get("content").asText();

            // Ahora parseamos el contenido como lista de DTOs
            return objectMapper.readValue(rawContent, new TypeReference<List<ScoredTaskDTO>>() {});
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse AI response", e);
        }
    }

    public List<ScheduledTaskDTO> scheduleTasks(ScheduleRequestDTO request) {
        StringBuilder prompt = new StringBuilder(
                "You will receive a list of tasks, the user's free time, and habit indicators.\n" +
                        "Return ONLY a JSON array of recommended schedule blocks like this:\n" +
                        "[{\"taskTitle\": \"Task 1\", \"day\": \"2025-05-20\", \"start\": \"09:00\", \"end\": \"10:00\"}, ...]\n" +
                        "Do NOT include explanations, just the JSON.\n\n"
        );

        prompt.append("Tasks:\n");
        for (Task task : request.getTasks()) {
            prompt.append("- Title: ").append(task.getTitle()).append("\n")
                    .append("  Description: ").append(task.getDescription()).append("\n")
                    .append("  Due Date: ").append(task.getDueDate()).append("\n")
                    .append("  Priority: ").append(task.getPriority()).append("\n\n");
        }

        prompt.append("Free Time:\n");
        for (ScheduleRequestDTO.TimeSlot slot : request.getFreeTime()) {
            prompt.append("- ").append(slot.getDay()).append(" ")
                    .append(slot.getStart()).append(" - ").append(slot.getEnd()).append("\n");
        }

        prompt.append("Habits:\n").append(request.getHabits().toString()).append("\n");

        Map<String, Object> body = new HashMap<>();
        body.put("model", model);
        body.put("messages", List.of(
                Map.of("role", "user", "content", prompt.toString())
        ));
        body.put("temperature", 0.2);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);
        headers.set("HTTP-Referer", "https://aitasker.app");
        headers.set("X-Title", "AItasker AI");

        HttpEntity<Map<String, Object>> entity = new HttpEntity<>(body, headers);
        ResponseEntity<String> response = restTemplate.postForEntity(baseUrl, entity, String.class);

        try {
            JsonNode root = objectMapper.readTree(response.getBody());
            String content = root.get("choices").get(0).get("message").get("content").asText();

            return objectMapper.readValue(content, new TypeReference<List<ScheduledTaskDTO>>() {});
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse schedule response", e);
        }
    }

}
