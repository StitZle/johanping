package com.nibucloud.frontendservice;

import com.fasterxml.jackson.databind.Module;
import com.nibucloud.frontendservice.config.ObjectIdModule;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.config.EnableMongoAuditing;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@EnableMongoAuditing
@SpringBootApplication
public class FrontendServiceApplication {

    @Bean
    public Module objectIdModule() {
        return ObjectIdModule.module();
    }

    public static void main(String[] args) {
        SpringApplication.run(FrontendServiceApplication.class, args);
    }

}
