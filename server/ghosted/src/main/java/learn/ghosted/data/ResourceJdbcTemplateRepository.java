package learn.ghosted.data;

import learn.ghosted.data.mappers.ResourceMapper;
import learn.ghosted.models.Resource;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class ResourceJdbcTemplateRepository implements ResourceRepository {

    private final JdbcTemplate jdbcTemplate;

    public ResourceJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Resource> findAll() {
        final String sql = "SELECT resource_id, resource_title, resource_link, resource_type, user_id "
                    + "from resource;";
        return jdbcTemplate.query(sql, new ResourceMapper());
    }

    @Override
    public Resource findById(int resourceId) {
        final String sql = "SELECT resource_id, resource_title, resource_link, resource_type, user_id "
                + "from resource "
                + "where resource_id = ?;";
        Resource resource =  jdbcTemplate.query(sql, new ResourceMapper(), resourceId).stream()
                .findFirst()
                .orElse(null);

        return resource;
    }

    @Override
    public Resource add(Resource resource) {
        final String sql = "insert into resource (resource_title, resource_link, resource_type, user_id) "
                + " values (?, ?, ?, ?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, resource.getTitle());
            ps.setString(2, resource.getLink());
            ps.setString(3, resource.getResourceType().toString());
            ps.setInt(4, resource.getUserId());
            return ps;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }

        resource.setResourceId(keyHolder.getKey().intValue());
        return resource;
    }

    @Override
    public boolean update(Resource resource) {
        final String sql = "update `resource` set "
                + "resource_title = ?, "
                + "resource_link = ?, "
                + "resource_type = ?, "
                + "user_id = ? "
                + "where resource_id = ?;";

        return jdbcTemplate.update(sql,
                resource.getTitle(),
                resource.getLink(),
                resource.getResourceType().toString(),
                resource.getUserId(),
                resource.getResourceId()) > 0;
    }

    @Override
    public boolean deleteById(int resourceId) {
        return jdbcTemplate.update(
                "delete from resource where resource_id = ?;",
                resourceId) > 0;
    }

}
