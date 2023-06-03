package learn.ghosted.domain;

import learn.ghosted.data.TestimonialRepository;
import learn.ghosted.models.Testimonial;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.when;

@SpringBootTest
class TestimonialServiceTest {
  @Autowired
  TestimonialService service;

  @MockBean
  TestimonialRepository repository;

  @Test
  void shouldAdd(){
    Testimonial testimonial = makeTestimonial();
    Testimonial mockOut = makeTestimonial();
    mockOut.setTestimonial_id(1);

    when(repository.add(testimonial)).thenReturn(mockOut);

    Result<Testimonial> actual = service.add(testimonial);
    assertEquals(ResultType.SUCCESS, actual.getType());
    assertEquals(mockOut, actual.getPayload());
  }

  @Test
  void shouldNotAddEmptyReview() {
    Testimonial testimonial = makeTestimonial();
    testimonial.setTestimonial_review("");
    Result<Testimonial> actual = service.add(testimonial);
    assertEquals(ResultType.INVALID, actual.getType());
  }

  @Test
  void shouldNotAddRatingBelowOne() {
    Testimonial testimonial = makeTestimonial();
    testimonial.setTestimonial_rating(0);
    Result<Testimonial> actual = service.add(testimonial);
    assertEquals(ResultType.INVALID, actual.getType());
  }

  @Test
  void shouldNotAddRatingAboveFive() {
    Testimonial testimonial = makeTestimonial();
    testimonial.setTestimonial_rating(6);
    Result<Testimonial> actual = service.add(testimonial);
    assertEquals(ResultType.INVALID, actual.getType());
  }

  Testimonial makeTestimonial() {
    Testimonial testimonial = new Testimonial();
    testimonial.setTestimonial_review("Great site! Loving how I can organize my applications!");
    testimonial.setTestimonial_rating(5);
    testimonial.setUser_id(1);
    return testimonial;
  }
}