package com.nibucloud.frontendservice.domain.model.failedPing;

import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

@Service
public class FailedPingService {

    private final FailedPingRepository failedPingRepository;

    public FailedPingService(FailedPingRepository failedPingRepository) {
        this.failedPingRepository = failedPingRepository;
    }

    public Iterable<FailedPing> getFailedPingsForDevice(ObjectId deviceId){
        return failedPingRepository.findAllByDeviceId(deviceId);
    }
}
