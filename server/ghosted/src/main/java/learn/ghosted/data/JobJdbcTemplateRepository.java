package learn.ghosted.data;

import learn.ghosted.data.mappers.AppUserMapper;
import learn.ghosted.data.mappers.JobMapper;
import learn.ghosted.models.AppUser;
import learn.ghosted.models.Job;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.List;

@Repository
public class JobJdbcTemplateRepository implements JobRepository {

    private final JdbcTemplate jdbcTemplate;

    public JobJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }
    @Override
    public List<Job> findAll() {
        final String sql = "select job_id, job_title, job_company, job_date_applied, job_link, job_status, job_location "
                + "from job_applied limit 1000;";
        return jdbcTemplate.query(sql, new JobMapper());
    }
    @Override
    @Transactional
    public Job findById(int jobId) {

        final String sql = "select job_id, job_title, job_company, job_date_applied, job_link, job_status, job_location "
                + "from job_applied "
                + "where job_id = ?;";

        Job job = jdbcTemplate.query(sql, new JobMapper(), jobId).stream()
                .findFirst().orElse(null);

        return job;
    }
    @Override
    public Job add(Job job) {

        final String sql = "insert into job_applied (job_title, job_company, job_date_applied, job_link, job_status, job_location, user_id) "
                + " values (?,?,?,?,?,?,?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, job.getTitle());
            ps.setString(2, job.getCompany());
            ps.setDate(3, job.getDateApplied() == null ? null :Date.valueOf(job.getDateApplied()));
            ps.setString(4, job.getLink());
            ps.setString(5, job.getStatus().toString());
            ps.setString(6, job.getLocation());
            ps.setInt(7, job.getAppUser().getAppUserId());
            return ps;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }

        job.setJobId(keyHolder.getKey().intValue());
        return job;
    }
    @Override
    public boolean update(Job job) {

        final String sql = "update job_applied set "
                + "job_title = ?, "
                + "job_company = ?, "
                + "job_date_applied = ?, "
                + "job_link = ?, "
                + "job_status = ?, "
                + "job_location = ? "
                + "where job_id = ?;";

        return jdbcTemplate.update(sql,
                job.getTitle(),
                job.getCompany(),
                job.getDateApplied(),
                job.getLink(),
                job.getStatus().toString(),
                job.getLocation(),
                job.getJobId()) > 0;
    }
    @Override
    @Transactional
    public boolean deleteById(int jobId) {
        return jdbcTemplate.update("delete from job_applied where job_id = ?;", jobId) > 0;
    }
//    private void addAppUser (Job job) {
//        final String sql = "select user_id "
//                + "from user "
//                + "where job_id = ?";
//
//        var user = jdbcTemplate.query(sql, new AppUserMapper(), job.getJobId()).stream().findFirst().orElse(null);
//
//        job.setAppUser(user);

//        AppUser appUser = new AppUser();
//        appUser.setAppUserId(1);
//
//        job.setAppUser(appUser);
//        return job;


}
