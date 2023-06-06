package learn.ghosted.controllers;

import learn.ghosted.domain.ResourceService;
import learn.ghosted.domain.Result;
import learn.ghosted.domain.ResultType;
import learn.ghosted.models.Resource;
import learn.ghosted.models.ResourceUser;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/api/resources")
public class ResourceController {

    private final ResourceService service;

    public ResourceController(ResourceService service) {
        this.service = service;
    }

    @GetMapping
    public List<Resource> findAll() {
        return service.findAll();
    }

    @GetMapping("/resourceUsers")
    public List<ResourceUser> findAllWithUser() {
        return service.findAllWithUser();
    }

    @GetMapping("/{resourceId}")
    public ResponseEntity<Object> findById(@PathVariable int resourceId) {
        Resource resource = service.findById(resourceId);
        if (resource == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(resource, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Object> add(@RequestBody Resource resource) {
        Result<Resource> result = service.add(resource);
        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }

    @PutMapping
    public ResponseEntity<Object> update(@PathVariable int resourceId, @RequestBody Resource resource) {
        if (resourceId != resource.getResourceId()) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        Result<Resource> result = service.update(resource);
        if (result.isSuccess()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return ErrorResponse.build(result);
    }

    @DeleteMapping("/{resourceId}")
    public ResponseEntity<Void> deleteById(@PathVariable int resourceId) {
        Result result = service.deleteById(resourceId);
        if (result.getType() == ResultType.NOT_FOUND) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
