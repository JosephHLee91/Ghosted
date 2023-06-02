package learn.ghosted.data;

import learn.ghosted.data.mappers.TestimonialMapper;
import learn.ghosted.models.Testimonial;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class TestimonialJdbcTemplateRepository implements TestimonialRepository {
  private final JdbcTemplate jdbcTemplate;

  public TestimonialJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
    this.jdbcTemplate = jdbcTemplate;
  }

  @Override
  public Testimonial findById(int testimonial_id) {
    final String sql = "select testimonial_id, testimonial_review, testimonial_rating, user_id "
      + "from testimonial "
      + "where testimonial_id = ?;";

    return jdbcTemplate.query(sql, new TestimonialMapper(), testimonial_id).stream()
            .findFirst()
            .orElse(null);
  }

  @Override
  public List<Testimonial> findAll() {
    final String sql = "select testimonial_id, testimonial_review, testimonial_rating, user_id "
      + "from testimonial;";

    return jdbcTemplate.query(sql, new TestimonialMapper());
  }

  @Override
  public List<Testimonial> findByUserId(int user_id) {
    final String sql = "select testimonial_id, testimonial_review, testimonial_rating, user_id "
            + "from testimonial "
            + "where user_id = ?;";

    return jdbcTemplate.query(sql, new TestimonialMapper(), user_id);
  }

  @Override
  public Testimonial add(Testimonial testimonial) {
    final String sql = "insert into testimonial (testimonial_review, testimonial_rating, user_id)"
            + "values (?, ?, ?);";

    KeyHolder keyHolder = new GeneratedKeyHolder();
    int rowsAffected = jdbcTemplate.update(conn -> {
      PreparedStatement ps = conn.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
      ps.setString(1, testimonial.getTestimonial_review());
      ps.setInt(2, testimonial.getTestimonial_rating());
      ps.setInt(3, testimonial.getUser_id());
      return ps;
    }, keyHolder);

    if (rowsAffected <=0) {
      return null;
    }

    testimonial.setTestimonial_id(keyHolder.getKey().intValue());
    return testimonial;
  }
}
