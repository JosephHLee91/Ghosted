package learn.ghosted.data.mappers;

import learn.ghosted.models.Job;
import learn.ghosted.models.Status;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class JobMapper implements RowMapper<Job> {

    @Override
    public Job mapRow(ResultSet rs, int rowNum) throws SQLException {
        Job job = new Job();
        job.setJobId(rs.getInt("job_id"));
        job.setTitle(rs.getString("job_title"));
        job.setCompany(rs.getString("job_company"));
        if (rs.getDate("job_date_applied") != null) {
            job.setDateApplied(rs.getDate("job_date_applied").toLocalDate());
        }
        job.setLink(rs.getString("job_link"));

        Status status = Status.valueOf(rs.getString("job_status"));
        job.setStatus(status);

        job.setLocation(rs.getString("job_location"));
        return job;
    }


}
