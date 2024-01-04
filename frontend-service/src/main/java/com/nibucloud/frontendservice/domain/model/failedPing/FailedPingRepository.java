package com.nibucloud.frontendservice.domain.model.failedPing;

import org.bson.types.ObjectId;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface FailedPingRepository extends CrudRepository<FailedPing, ObjectId> {

    Iterable<FailedPing> findAllByDeviceId(ObjectId deviceId);
    List<FailedPing> deleteFailedPingByDeviceId(ObjectId deviceId);

}
