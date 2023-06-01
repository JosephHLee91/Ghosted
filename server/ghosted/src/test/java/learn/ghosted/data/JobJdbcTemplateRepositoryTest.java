package learn.ghosted.data;

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
final static int NEXT_ID =4;
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

        // can't predict order
        // if delete is first, we're down to 7
        // if add is first, we may go as high as 10
        assertTrue(jobs.size() >= 7 && jobs.size() <= 10);
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
        job = makeJob();
        job.setDateApplied(null);
        actual = repository.add(job);
        assertNotNull(actual);
        assertEquals(NEXT_ID + 1, actual.getJobId());
    }

    @Test
    void update() {
    }

    @Test
    void deleteById() {
    }
    private Job makeJob() {
        Job job = new Job();
        job.setTitle("Test Title");
        job.setLocation("Location");
        job.setCompany("Dev-10");
        job.setLink("Indeed.com");
        job.setDateApplied(LocalDate.of(2023, 1, 15));
        job.setStatus(Status.ACCEPTED);
        return job;
    }
}