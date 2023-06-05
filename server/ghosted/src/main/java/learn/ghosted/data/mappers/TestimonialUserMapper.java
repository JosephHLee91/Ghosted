package learn.ghosted.data.mappers;

import learn.ghosted.models.Testimonial;
import learn.ghosted.models.TestimonialUser;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class TestimonialUserMapper implements RowMapper<TestimonialUser> {
  @Override
  public TestimonialUser mapRow(ResultSet resultSet, int i) throws SQLException {
    TestimonialUser testimonialUser = new TestimonialUser();
    testimonialUser.setTestimonial_id(resultSet.getInt("testimonial_id"));
    testimonialUser.setTestimonial_review(resultSet.getString("testimonial_review"));
    testimonialUser.setTestimonial_rating(resultSet.getInt("testimonial_rating"));
    testimonialUser.setUser_id(resultSet.getInt("user_id"));
    testimonialUser.setFirst_name(resultSet.getString("first_name"));
    testimonialUser.setLast_name(resultSet.getString("last_name"));
    return testimonialUser;
  }
}
