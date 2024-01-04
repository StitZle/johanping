package com.nibucloud.frontendservice.domain.model.device;

import org.bson.types.ObjectId;
import org.springframework.data.repository.CrudRepository;

public interface DeviceRepository extends CrudRepository<Device, ObjectId> {
}
