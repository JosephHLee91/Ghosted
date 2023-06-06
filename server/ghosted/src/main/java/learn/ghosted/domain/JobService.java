package learn.ghosted.domain;

import learn.ghosted.data.JobRepository;
import learn.ghosted.models.Job;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class JobService {
    private final JobRepository repository;

    public JobService(JobRepository repository) {
        this.repository = repository;
    }
    public List<Job> findAll() {
        return repository.findAll();
    }

    public List<Job> findByUserId(int appUserId) {
        return repository.findByUserId(appUserId);
    }

    public Job findById(int agentId) {
        return repository.findById(agentId);
    }

    public Result<Job> add(Job job) {
        Result<Job> result = validate(job);
        if (!result.isSuccess()) {
            return result;
        }

        if (job.getJobId() != 0) {
            result.addMessage("jobId cannot be set for `add` operation", ResultType.INVALID);
            return result;
        }

        job = repository.add(job);
        result.setPayload(job);
        return result;
    }

    public Result<Job> update(Job job) {
        Result<Job> result = validate(job);
        if (!result.isSuccess()) {
            return result;
        }

        if (job.getJobId() <= 0) {
            result.addMessage("jobId must be set for `update` operation", ResultType.INVALID);
            return result;
        }

        if (!repository.update(job)) {
            String msg = String.format("jobId: %s, not found", job.getJobId());
            result.addMessage(msg, ResultType.NOT_FOUND);
        }

        return result;
    }

    public boolean deleteById(int jobId) {
        return repository.deleteById(jobId);
    }

    private Result<Job> validate(Job job) {
        Result<Job> result = new Result<>();
        if (job == null) {
            result.addMessage("job cannot be null", ResultType.INVALID);
            return result;
        }

        if (Validations.isNullOrBlank(job.getTitle())) {
            result.addMessage("title is required", ResultType.INVALID);
        }

        if (Validations.isNullOrBlank(job.getCompany())) {
            result.addMessage("company is required", ResultType.INVALID);
        }
        if (Validations.isNullOrBlank(job.getLink())) {
            result.addMessage("link is required", ResultType.INVALID);
        }

        return result;
    }
}
