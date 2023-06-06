package learn.ghosted.data.mappers;

import learn.ghosted.models.ResourceType;
import learn.ghosted.models.ResourceUser;
import org.springframework.jdbc.core.RowMapper;


import java.sql.ResultSet;
import java.sql.SQLException;

public class ResourceUserMapper implements RowMapper<ResourceUser> {
    @Override
    public ResourceUser mapRow(ResultSet rs, int rowNum) throws SQLException {
        ResourceUser resourceUser = new ResourceUser();
        resourceUser.setResourceId(rs.getInt("resource_id"));
        resourceUser.setTitle(rs.getString("resource_title"));
        resourceUser.setLink(rs.getString("resource_link"));

        ResourceType resourcetype = ResourceType.valueOf(rs.getString("resource_type"));

        resourceUser.setResourceType(resourcetype);
        resourceUser.setUserId(rs.getInt("user_id"));
        resourceUser.setFirst_name(rs.getString("first_name"));
        resourceUser.setLast_name(rs.getString("last_name"));
        return resourceUser;
    }
}
