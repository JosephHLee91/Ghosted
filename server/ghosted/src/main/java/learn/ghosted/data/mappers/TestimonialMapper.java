package learn.ghosted.data.mappers;

import learn.ghosted.models.Testimonial;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class TestimonialMapper implements RowMapper<Testimonial> {
  @Override
  public Testimonial mapRow(ResultSet resultSet, int i) throws SQLException {
    Testimonial testimonial = new Testimonial();
    testimonial.setTestimonial_id(resultSet.getInt("testimonial_id"));
    testimonial.setTestimonial_review(resultSet.getString("testimonial_review"));
    testimonial.setTestimonial_rating(resultSet.getInt("testimonial_rating"));
    testimonial.setUser_id(resultSet.getInt("user_id"));
    return testimonial;
  }
}
