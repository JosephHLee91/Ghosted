package learn.ghosted.data;

import learn.ghosted.models.Testimonial;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

@SpringBootTest
public class TestimonialJdbcTemplateRepositoryTest {
  final static int NEXT_TESTIMONIAL_ID = 4;

  @Autowired
  TestimonialJdbcTemplateRepository repository;

  @Autowired
  KnownGoodState knownGoodState;

  @BeforeEach
  void setup() {
    knownGoodState.set();
  }

  @Test
  void shouldAdd() {
    Testimonial testimonial = makeTestimonial();
    Testimonial actual = repository.add(testimonial);
    assertNotNull(actual);
    assertEquals(NEXT_TESTIMONIAL_ID, actual.getTestimonial_id());
    assertEquals("Great site! Loving how I can organize my applications!", actual.getTestimonial_review());
    assertEquals(5, actual.getTestimonial_rating());
    assertEquals(1, actual.getUser_id());
  }

  @Test
  void shouldFindById() {
    Testimonial actual = repository.findById(1);
    assertNotNull(actual);
    assertEquals(1, actual.getTestimonial_id());
    assertEquals("This website is great, I got a Job!", actual.getTestimonial_review());
    assertEquals(5, actual.getTestimonial_rating());
    assertEquals(1, actual.getUser_id());
  }

  @Test
  void shouldFindAll() {
    List<Testimonial> actual = repository.findAll();
    assertNotNull(actual);
    assertEquals(4, actual.size());
  }

  @Test
  void shouldFindByUserId() {
    List<Testimonial> actual = repository.findByUserId(1);
    assertNotNull(actual);
    assertEquals(3, actual.size());
  }

  Testimonial makeTestimonial() {
    Testimonial testimonial = new Testimonial();
    testimonial.setTestimonial_review("Great site! Loving how I can organize my applications!");
    testimonial.setTestimonial_rating(5);
    testimonial.setUser_id(1);
    return testimonial;
  }
}
