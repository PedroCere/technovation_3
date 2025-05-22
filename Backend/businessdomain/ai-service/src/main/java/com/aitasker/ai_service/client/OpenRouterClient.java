package com.aitasker.ai_service.client;

import com.aitasker.ai_service.dto.*;
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
import java.util.stream.Collectors;

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
        String prompt = """
                You will receive a list of tasks. For each task, assign an importanceScore between 0.0 and 1.0.
                Return ONLY a valid JSON array like this:
                [{"title": "Task title", "importanceScore": 0.92}, ...]
                Do NOT include any explanation, comments or text before or after the JSON.

                Tasks:
                %s
                """.formatted(
                tasks.stream()
                        .map(task -> "- Title: " + task.getTitle() +
                                "\n  Description: " + task.getDescription() +
                                "\n  Due Date: " + task.getDueDate() +
                                "\n  Priority: " + task.getPriority())
                        .collect(Collectors.joining("\n\n"))
        );

        HttpEntity<Map<String, Object>> request = buildRequest(prompt, 0.2);
        ResponseEntity<String> response = restTemplate.postForEntity(baseUrl, request, String.class);

        try {
            JsonNode root = objectMapper.readTree(response.getBody());
            String rawContent = root.get("choices").get(0).get("message").get("content").asText();
            return objectMapper.readValue(rawContent, new TypeReference<List<ScoredTaskDTO>>() {});
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse AI response", e);
        }
    }

    public List<ScheduledTaskDTO> scheduleTasks(ScheduleRequestDTO request) {
        String prompt = """
                You will receive a list of tasks, a set of free time blocks, and user habits.
                Your job is to assign each task a recommended time block.

                RETURN ONLY a valid JSON array with this format:
                [
                  { "taskTitle": "Do X", "day": "2025-05-22", "start": "09:00", "end": "10:00" },
                  ...
                ]

                DO NOT include any explanation, notes, or extra text. Output ONLY the JSON array.

                Tasks:
                %s

                Free Time:
                %s

                Habits:
                %s
                """.formatted(
                request.getTasks().stream()
                        .map(task -> "- Title: " + task.getTitle() +
                                "\n  Description: " + task.getDescription() +
                                "\n  Due Date: " + task.getDueDate() +
                                "\n  Priority: " + task.getPriority())
                        .collect(Collectors.joining("\n\n")),
                request.getFreeTime().stream()
                        .map(slot -> slot.getDay() + " " + slot.getStart() + " - " + slot.getEnd())
                        .collect(Collectors.joining("\n")),
                request.getHabits().toString()
        );

        HttpEntity<Map<String, Object>> entity = buildRequest(prompt, 0.2);
        ResponseEntity<String> response = restTemplate.postForEntity(baseUrl, entity, String.class);

        try {
            JsonNode root = objectMapper.readTree(response.getBody());
            String content = root.get("choices").get(0).get("message").get("content").asText();
            return objectMapper.readValue(content, new TypeReference<List<ScheduledTaskDTO>>() {});
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse schedule response", e);
        }
    }

    public String getAntiProcrastinationAdvice(ProcrastinationAdviceRequestDTO request) {
        String prompt = """
                You are a productivity coach. Based on the user's current free time and daily habits,
                give ONE short, clear, and actionable tip to help them avoid procrastination today.

                DO NOT include any greetings, explanations, or extra comments. 
                Return ONLY the advice in plain text.

                Habits:
                %s

                Free Time Blocks:
                %s
                """.formatted(
                request.getHabits().toString(),
                request.getFreeTime().stream()
                        .map(slot -> slot.getDay() + " " + slot.getStart() + " - " + slot.getEnd())
                        .collect(Collectors.joining("\n"))
        );

        HttpEntity<Map<String, Object>> entity = buildRequest(prompt, 0.7);
        ResponseEntity<String> response = restTemplate.postForEntity(baseUrl, entity, String.class);

        try {
            JsonNode root = objectMapper.readTree(response.getBody());
            return root.get("choices").get(0).get("message").get("content").asText();
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse advice from AI", e);
        }
    }

    public String getOptimizationAdvice(OptimizationAdviceRequestDTO request) {
        String prompt = """
                You are an AI productivity assistant. Given the user's current list of pending tasks, 
                suggest ONE practical and focused piece of advice to help them optimize their work today.

                DO NOT include lists, explanations, or comments. Return ONLY the advice in plain text.

                Task list:
                %s
                """.formatted(
                request.getTasks().stream()
                        .map(task -> "- Title: " + task.getTitle() +
                                "\n  Description: " + task.getDescription() +
                                "\n  Due Date: " + task.getDueDate() +
                                "\n  Priority: " + task.getPriority())
                        .collect(Collectors.joining("\n\n"))
        );

        HttpEntity<Map<String, Object>> entity = buildRequest(prompt, 0.7);
        ResponseEntity<String> response = restTemplate.postForEntity(baseUrl, entity, String.class);

        try {
            JsonNode root = objectMapper.readTree(response.getBody());
            return root.get("choices").get(0).get("message").get("content").asText();
        } catch (Exception e) {
            throw new RuntimeException("Failed to parse optimization advice from AI", e);
        }
    }

    private HttpEntity<Map<String, Object>> buildRequest(String prompt, double temperature) {
        Map<String, Object> body = new HashMap<>();
        body.put("model", model);
        body.put("messages", List.of(Map.of("role", "user", "content", prompt)));
        body.put("temperature", temperature);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setBearerAuth(apiKey);
        headers.set("HTTP-Referer", "https://aitasker.app");
        headers.set("X-Title", "AItasker AI");

        return new HttpEntity<>(body, headers);
    }


}
