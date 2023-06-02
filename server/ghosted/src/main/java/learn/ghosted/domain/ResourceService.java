package learn.ghosted.domain;

import learn.ghosted.data.ResourceRepository;
import learn.ghosted.models.Resource;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ResourceService {
    private final ResourceRepository repository;

    public ResourceService(ResourceRepository repository) {
        this.repository = repository;
    }

    public List<Resource> findAll() {
        return repository.findAll();
    }

    public Resource findById(int resourceId) {
        return repository.findById(resourceId);
    }

    public Result<Resource> add(Resource resource) {
        Result<Resource> result = validate(resource);
        if (!result.isSuccess()) {
            return result;
        }

        if (resource.getResourceId() != 0) {
            result.addMessage("resourceId cannot be set for `add` operation", ResultType.INVALID);
            return result;
        }

        resource = repository.add(resource);
        result.setPayload(resource);
        return result;
    }

    public Result<Resource> update(Resource resource) {
        Result<Resource> result = validate(resource);
        if (!result.isSuccess()) {
            return result;
        }

        if (!repository.update(resource)) {
            String msg = String.format("resourceId: %s, not found", resource.getResourceId());
            result.addMessage(msg, ResultType.NOT_FOUND);
        }

        return result;
    }

    public Result<Resource> deleteById(int resourceId) {
        Result<Resource> result = new Result<>();

        if (!repository.deleteById(resourceId)) {
            String msg = String.format("resourceId: %s, not found", resourceId);
            result.addMessage(msg, ResultType.NOT_FOUND);
        }

        return result;
    }

    private Result<Resource> validate(Resource resource) {
        Result<Resource> result = new Result<>();
        if (resource == null) {
            result.addMessage("Resource cannot be null", ResultType.INVALID);
            return result;
        }

        if (resource.getTitle() == null || resource.getTitle().isBlank()) {
            result.addMessage("Title is required", ResultType.INVALID);
        }

        if (resource.getResourceType() == null) {
            result.addMessage("Type is required", ResultType.INVALID);
        }

        if (resource.getLink() == null || resource.getLink().isBlank()) {
            result.addMessage("Link is required", ResultType.INVALID);
        }

        if (resource.getUserId() == 0) {
            result.addMessage("User Id is required", ResultType.INVALID);
        } else if (repository.findById(resource.getUserId()) == null) {
            result.addMessage("User must be registered", ResultType.INVALID);
        }

        return result;
    }
}
