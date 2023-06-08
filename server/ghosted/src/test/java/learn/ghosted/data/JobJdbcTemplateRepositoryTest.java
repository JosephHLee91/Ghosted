package learn.ghosted.data;

import learn.ghosted.models.AppUser;
import learn.ghosted.models.Job;
import learn.ghosted.models.Status;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class JobJdbcTemplateRepositoryTest {
final static int NEXT_ID = 3;
@Autowired
JobJdbcTemplateRepository repository;

@Autowired
KnownGoodState knownGoodState;
    @BeforeEach
    void setUp() {
        knownGoodState.set();
    }

    @Test
    void findAll() {
        List<Job> jobs = repository.findAll();
        assertNotNull(jobs);

        assertTrue(jobs.size() >= 1 && jobs.size() <= 10);
    }

    @Test
    void findById() {
    }

    @Test
    void add() {
        Job job = makeJob();
        Job actual = repository.add(job);
        assertNotNull(actual);
        assertEquals(NEXT_ID, actual.getJobId());

        // null dob
//        job = makeJob();
//        job.setDateApplied(null);
//        actual = repository.add(job);
//        assertNotNull(actual);
//        assertEquals(NEXT_ID + 1, actual.getJobId());
    }

    @Test
    void update() {
        Job job = makeJob();
        job.setJobId(2);
        job.setStatus(Status.DECLINED);
        assertTrue(repository.update(job));

        job.setJobId(13);
        assertFalse(repository.update(job));
    }

    @Test
    void deleteById() {
        assertTrue(repository.deleteById(2));
        assertFalse(repository.deleteById(2));
    }
    private Job makeJob() {
        Job job = new Job();
        job.setTitle("Test Title");
        job.setLocation("Location");
        job.setCompany("Dev-10");
        job.setLink("Indeed.com");
        job.setDateApplied(LocalDate.of(2023, 1, 15));
        job.setStatus(Status.ACCEPTED);
        job.setAppUserId(2);
        return job;
    }
}