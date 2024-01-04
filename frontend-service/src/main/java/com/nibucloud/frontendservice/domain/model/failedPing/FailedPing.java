package com.nibucloud.frontendservice.domain.model.failedPing;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.Instant;

@Document("failed-pings")
public class FailedPing {

    @Id
    private ObjectId id;

    private ObjectId deviceId;

    private Instant failedPingTime;

    public FailedPing() {
    }

    public FailedPing(ObjectId id, ObjectId deviceId, Instant failedPingTime) {
        this.id = id;
        this.deviceId = deviceId;
        this.failedPingTime = failedPingTime;
    }

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public ObjectId getDeviceId() {
        return deviceId;
    }

    public void setDeviceId(ObjectId deviceId) {
        this.deviceId = deviceId;
    }

    public Instant getFailedPingTime() {
        return failedPingTime;
    }

    public void setFailedPingTime(Instant failedPingTime) {
        this.failedPingTime = failedPingTime;
    }
}
