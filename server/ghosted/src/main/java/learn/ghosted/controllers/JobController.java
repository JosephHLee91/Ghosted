package learn.ghosted.controllers;

import learn.ghosted.domain.JobService;
import learn.ghosted.domain.Result;
import learn.ghosted.models.Job;
import learn.ghosted.models.Testimonial;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/api/job")
public class JobController {
    private final JobService service;

    public JobController(JobService service) {
        this.service = service;
    }
    @GetMapping
    public List<Job> findAll() {
        return service.findAll();
    }
    @GetMapping("/user/{appUserId}")
    public ResponseEntity<List> findByUserId(@PathVariable int appUserId) {

        List<Job> jobs = service.findByUserId(appUserId);

        if (jobs == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(jobs);
    }

    @GetMapping("/{jobId}")
    public ResponseEntity<Object> findById(@PathVariable int jobId) {
        Job job = service.findById(jobId);
        if (job == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(job, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Object> add(@RequestBody Job job) {
        Result<Job> result = service.add(job);
        if (result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }

    @PutMapping("/{jobId}")
    public ResponseEntity<Object> update(@PathVariable int jobId, @RequestBody Job job) {
        if (jobId != job.getJobId()) {
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }

        Result<Job> result = service.update(job);
        if (result.isSuccess()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }

        return ErrorResponse.build(result);
    }

    @DeleteMapping("/{jobId}")
    public ResponseEntity<Void> deleteById(@PathVariable int jobId) {
        if (service.deleteById(jobId)) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
