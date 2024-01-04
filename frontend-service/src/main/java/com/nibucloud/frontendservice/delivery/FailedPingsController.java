package com.nibucloud.frontendservice.delivery;

import com.nibucloud.frontendservice.domain.model.failedPing.FailedPing;
import com.nibucloud.frontendservice.domain.model.failedPing.FailedPingService;
import org.bson.types.ObjectId;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("failed-pings")
public class FailedPingsController {

    private final FailedPingService failedPingService;

    public FailedPingsController(FailedPingService failedPingService) {
        this.failedPingService = failedPingService;
    }

    @GetMapping("/{deviceId}")
    public ResponseEntity<Iterable<FailedPing>> getAllPingsForDevice(@PathVariable ObjectId deviceId){
        Iterable<FailedPing> failedPings = failedPingService.getFailedPingsForDevice(deviceId);
        return new ResponseEntity<>(failedPings, HttpStatus.OK);
    }

}
