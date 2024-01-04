package com.nibucloud.frontendservice.domain.model.device;

import com.nibucloud.frontendservice.domain.model.failedPing.FailedPingRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DeviceService {

    private final FailedPingRepository failedPingRepository;

    private final DeviceRepository deviceRepository;

    public DeviceService(DeviceRepository deviceRepository, FailedPingRepository failedPingRepository) {
        this.deviceRepository = deviceRepository;
        this.failedPingRepository = failedPingRepository;
    }

    public Device createDevice(DeviceDTO deviceDTO){
        Device device = new Device();
        device.setName(deviceDTO.name());
        device.setAddress(deviceDTO.address());

        return deviceRepository.save(device);
    }

    public Device getDevice(ObjectId deviceId) throws DeviceNotFoundException {
        return deviceRepository.findById(deviceId).orElseThrow(() -> new DeviceNotFoundException(deviceId));
    }

    public Iterable<Device> getAllDevices(){
        return deviceRepository.findAll();
    }

    public Device deleteDevice(ObjectId deviceId) throws DeviceNotFoundException {
        Device device = deviceRepository.findById(deviceId).orElseThrow(() -> new DeviceNotFoundException(deviceId));
        failedPingRepository.deleteFailedPingByDeviceId(deviceId);
        deviceRepository.deleteById(deviceId);
        return device;
    }

}
