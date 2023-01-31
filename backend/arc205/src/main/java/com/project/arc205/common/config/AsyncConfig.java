package com.project.arc205.common.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

import java.util.concurrent.Executor;

@Configuration
@EnableAsync
public class AsyncConfig {
    @Bean
    public Executor taskExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(2);    //기본 스레드 수
        executor.setMaxPoolSize(30);     //최대 스레드 수
        executor.setQueueCapacity(100); //Queue size
        executor.setThreadNamePrefix("Executor-");
        executor.initialize();
        return executor;
    }
}