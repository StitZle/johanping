package com.nibucloud.frontendservice.domain.model.device;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Document("devices")
public class Device {

    private ObjectId id;

    private String name;

    private String address;

   private Instant lastSuccessfulPing;

   private int failedPingCounter = 0;

    public Device() {
    }

    public Device(ObjectId id, String name, String address, Instant lastSuccessfulPing, int failedPingCounter) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.lastSuccessfulPing = lastSuccessfulPing;
        this.failedPingCounter = failedPingCounter;
    }

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public Instant getLastSuccessfulPing() {
        return lastSuccessfulPing;
    }

    public void setLastSuccessfulPing(Instant lastSuccessfulPing) {
        this.lastSuccessfulPing = lastSuccessfulPing;
    }

    public int getFailedPingCounter() {
        return failedPingCounter;
    }

    public void setFailedPingCounter(int failedPingCounter) {
        this.failedPingCounter = failedPingCounter;
    }
}
