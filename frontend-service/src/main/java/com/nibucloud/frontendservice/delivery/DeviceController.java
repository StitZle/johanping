package com.nibucloud.frontendservice.delivery;

import com.nibucloud.frontendservice.domain.model.device.Device;
import com.nibucloud.frontendservice.domain.model.device.DeviceDTO;
import com.nibucloud.frontendservice.domain.model.device.DeviceNotFoundException;
import com.nibucloud.frontendservice.domain.model.device.DeviceService;
import org.bson.types.ObjectId;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("devices")
public class DeviceController {

    private final DeviceService deviceService;

    public DeviceController(DeviceService deviceService) {
        this.deviceService = deviceService;
    }

    @PostMapping
    public ResponseEntity<Device> createDevice(@RequestBody DeviceDTO deviceDTO){
        Device device = deviceService.createDevice(deviceDTO);
        return new ResponseEntity<>(device, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<Iterable<Device>> getDevices(){
        Iterable<Device> devices = deviceService.getAllDevices();
        return new ResponseEntity<>(devices, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    private ResponseEntity<Device> deleteDevice(@PathVariable ObjectId id) throws DeviceNotFoundException {
        Device device = deviceService.deleteDevice(id);
        return new ResponseEntity<>(device, HttpStatus.OK);
    }

}
