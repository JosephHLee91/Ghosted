package learn.ghosted.data.mappers;

import learn.ghosted.models.Resource;
import learn.ghosted.models.ResourceType;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class ResourceMapper implements RowMapper<Resource> {

    @Override
    public Resource mapRow(ResultSet rs, int rowNum) throws SQLException {
        Resource resource = new Resource();
        resource.setResourceId(rs.getInt("resource_id"));
        resource.setTitle(rs.getString("resource_title"));
        resource.setLink(rs.getString("resource_link"));

        ResourceType resourcetype = ResourceType.valueOf(rs.getString("resource_type"));

        resource.setResourceType(resourcetype);
        resource.setUserId(rs.getInt("user_id"));
        return resource;
    }
}
