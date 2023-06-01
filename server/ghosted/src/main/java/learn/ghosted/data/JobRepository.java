package learn.ghosted.data;

import learn.ghosted.models.Job;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface JobRepository {
    List<Job> findAll();

    @Transactional
    Job findById(int jobId);

    Job add(Job job);

    boolean update(Job job);

    @Transactional
    boolean deleteById(int jobId);
}
