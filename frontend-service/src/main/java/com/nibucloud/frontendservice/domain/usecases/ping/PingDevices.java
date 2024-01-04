package com.nibucloud.frontendservice.domain.usecases.ping;

import com.nibucloud.frontendservice.domain.model.device.Device;
import com.nibucloud.frontendservice.domain.model.device.DeviceRepository;
import com.nibucloud.frontendservice.domain.model.failedPing.FailedPing;
import com.nibucloud.frontendservice.domain.model.failedPing.FailedPingRepository;
import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.InetAddress;
import java.net.UnknownHostException;
import java.time.Instant;

@Component
public class PingDevices {

    private static final Logger logger = LoggerFactory.getLogger(PingDevices.class);

    @Value("${ping.timeout}")
    private int timeout;

    private final DeviceRepository deviceRepository;
    private final FailedPingRepository failedPingRepository;

    public PingDevices(DeviceRepository deviceRepository, FailedPingRepository failedPingRepository) {
        this.deviceRepository = deviceRepository;
        this.failedPingRepository = failedPingRepository;
    }


    @Scheduled(cron = "0 */10 * * * *")
    private void pingDevices() {
        logger.info("start pinging devices");
        Iterable<Device> devices = deviceRepository.findAll();
        for (Device device : devices) {
            ping(device);
        }
    }


    private void ping(Device device) {

        boolean reachable = false;

        try {
            InetAddress address = InetAddress.getByName(device.getAddress());
            reachable = address.isReachable(timeout);
        } catch (UnknownHostException e) {
            logger.info("device {} with id-address {} has an unknown host", device.getId(), device.getAddress(), e);
        } catch (IOException e) {
            logger.info("configured timeout should not be negative!", e);
        }

        if (reachable) {
            device.setLastSuccessfulPing(Instant.now());
            device.setFailedPingCounter(0);
        }else {
            logger.info("device {} with id-address {} is not reachable", device.getId(), device.getAddress());
            device.setFailedPingCounter(device.getFailedPingCounter() + 1);

            FailedPing failedPing = new FailedPing();
            failedPing.setDeviceId(device.getId());
            failedPing.setFailedPingTime(Instant.now());

            failedPingRepository.save(failedPing);
        }
        deviceRepository.save(device);
    }
}
