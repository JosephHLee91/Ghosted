package learn.ghosted.domain;

import learn.ghosted.data.JobRepository;
import learn.ghosted.models.AppUser;
import learn.ghosted.models.Job;
import learn.ghosted.models.Status;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.time.LocalDate;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@SpringBootTest
public class JobServiceTest {
    @Autowired
    JobService service;

    @MockBean
    JobRepository jobRepository;

    @Test
    void shouldAdd() {
        Job job = makeJob();
        Job mockOut = makeJob();
        mockOut.setJobId(1);

        when(jobRepository.add(job)).thenReturn(mockOut);

        Result<Job> actual = service.add(job);
        assertEquals(ResultType.SUCCESS, actual.getType());

    }
    @Test
    void shouldUpdate() {
        Job job = makeJob();
        job.setJobId(1);

        when(jobRepository.update(job)).thenReturn(true);

        Result<Job> actual = service.update(job);
        assertEquals(ResultType.SUCCESS, actual.getType());

    }
    @Test
    void shouldNotUpdateMissing() {

    }
    Job makeJob() {
        Job job = new Job();
        job.setTitle("Java Developer");
        job.setCompany("Duff");
        job.setDateApplied(LocalDate.of(2023,02,02));
        job.setLink("ziprecruiter.com");
        job.setStatus(Status.GHOSTED);
        job.setLocation("Remote");

        AppUser appUser = new AppUser();
        appUser.setAppUserId(1);

        job.setAppUser(appUser);

        return job;
    }
}
