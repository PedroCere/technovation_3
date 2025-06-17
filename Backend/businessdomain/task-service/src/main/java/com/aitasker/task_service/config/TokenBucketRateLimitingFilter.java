package com.aitasker.task_service.config;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpFilter;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.Instant;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class TokenBucketRateLimitingFilter extends HttpFilter {

    private static class TokenBucket {
        private final int capacity;
        private final int refillTokens;
        private final long refillPeriodMillis;

        private int tokens;
        private long lastRefillTimestamp;

        public TokenBucket(int capacity, int refillTokens, long refillPeriodMillis) {
            this.capacity = capacity;
            this.refillTokens = refillTokens;
            this.refillPeriodMillis = refillPeriodMillis;
            this.tokens = capacity;
            this.lastRefillTimestamp = Instant.now().toEpochMilli();
        }

        synchronized boolean tryConsume() {
            refill();
            if (tokens > 0) {
                tokens--;
                return true;
            }
            return false;
        }

        private void refill() {
            long now = Instant.now().toEpochMilli();
            long elapsed = now - lastRefillTimestamp;
            if (elapsed > refillPeriodMillis) {
                int refillCount = (int)(elapsed / refillPeriodMillis);
                tokens = Math.min(capacity, tokens + refillCount * refillTokens);
                lastRefillTimestamp += refillCount * refillPeriodMillis;
            }
        }
    }

    private final Map<String, TokenBucket> buckets = new ConcurrentHashMap<>();

    // Configuration: 10 requests per 1 second
    private static final int CAPACITY = 10;
    private static final int REFILL_TOKENS = 10;
    private static final long REFILL_PERIOD_MILLIS = 1000;

    @Override
    protected void doFilter(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws IOException, ServletException {

        String clientIp = getClientIP(request);
        TokenBucket tokenBucket = buckets.computeIfAbsent(clientIp,
                ip -> new TokenBucket(CAPACITY, REFILL_TOKENS, REFILL_PERIOD_MILLIS));

        if (tokenBucket.tryConsume()) {
            chain.doFilter(request, response);
        } else {
            response.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
            response.getWriter().write("Too many requests - Rate limit exceeded");
        }
    }

    private String getClientIP(HttpServletRequest request) {
        String xfHeader = request.getHeader("X-Forwarded-For");
        if (xfHeader == null) {
            return request.getRemoteAddr();
        }
        return xfHeader.split(",")[0];
    }
}
