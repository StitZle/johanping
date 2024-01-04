package com.nibucloud.frontendservice.domain.model.device;

import org.bson.types.ObjectId;

public class DeviceNotFoundException extends Exception{
    public DeviceNotFoundException(ObjectId deviceId){
        super(String.format("device with id %s not found!", deviceId));
    }
}
